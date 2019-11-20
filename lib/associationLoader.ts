import "reflect-metadata";
import { Model, Options, ConnectionOptions, Sequelize } from "sequelize";
import { Association } from "./association";
import { ENTITY_NAME, MODEL_OPTION, InitOption } from "./sequelize";
import { Connection } from "./connection";
import * as fs from "fs";

export interface dbConfigOption extends ConnectionOptions {
  option: Options;
}

type SequelizeEntityLoaderOption = {
  filePath: string;
  dbConfigFile?: string;
  dbConfig?: dbConfigOption;
};

export function AssociationLoader(option: SequelizeEntityLoaderOption) {
  return function<T extends { new (...args: any[]): {} }>(constr: T) {
    return class extends constr {
      private connection: Connection;

      constructor(...args: any[]) {
        super(args);
        if (!option.dbConfig && !option.dbConfigFile) {
          throw new Error(`Sequelize can not connect the db without config`);
        }
        if (option.dbConfigFile && !fs.existsSync(option.dbConfigFile)) {
          throw new Error(
            `Can not found the connect config in ${option.dbConfigFile}, or directory file not exist!`
          );
        }
        this.connection = new Connection(
          option.dbConfig || require(option.dbConfigFile!)
        );
        // 读取Sequelize模型
        if (option.filePath) {
          if (!fs.existsSync(option.filePath)) {
            throw new Error(`sequelize path for ${option.filePath} not exist`);
          }
          AssociationLoaderService.injectAssociation(
            option.filePath,
            this.connection.sequelize
          );
        }
      }
    };
  };
}

class AssociationLoaderService {
  private static SEQUELIZE = Symbol("Seqeulize");
  // 允许注入关系类型
  private static ASSOCIATION_INJECT_LIST: Symbol[] = Object.values(
    Association.associations
  );

  public static getFileList(path: string): string[] {
    return fs
      .readdirSync(path)
      .filter((val: string) => val.endsWith(".ts") || val.endsWith(".js"))
      .map(val => `${path}/${val}`);
  }

  public static getSequelizeEntity(file: string) {
    const entityModule = require(file);
    for (let key in entityModule) {
      let MODULE = entityModule[key];
      if (
        MODULE instanceof Function &&
        Reflect.getMetadata(ENTITY_NAME, MODULE)
      ) {
        return MODULE;
      }
    }
    return null;
  }

  public static injectAssociation(path: string, sequelize: Sequelize) {
    let filePaths = this.getFileList(path);
    let entitys: Model[] = [];
    for (let filePath of filePaths) {
      let entity = this.getSequelizeEntity(filePath);
      if (entity) {
        let option: InitOption = Reflect.getMetadata(MODEL_OPTION, entity);
        option.sequelize = sequelize;
        entity.init(option.fields, option);
        // 挂载sequelize在类中
        entity.seqeulize = sequelize;
        // Reflect.defineMetadata(this.SEQUELIZE, sequelize, entity);
        entitys.push(entity);
      }
    }
    // set up the model entity map
    let entityMap = new Map();
    entitys.forEach(model => {
      let entityName = Reflect.getMetadata(ENTITY_NAME, model);
      entityMap.set(entityName, model);
    });
    // set up the association
    for (let entity of entitys) {
      for (let type of this.ASSOCIATION_INJECT_LIST) {
        let associations = Reflect.getMetadata(type, entity);
        if (associations && associations.length > 0) {
          for (let association of associations) {
            let { from, to, option } = association;
            from[type.toString()](entityMap.get(to), option);
          }
        }
      }
    }
  }
}
