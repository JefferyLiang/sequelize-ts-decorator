import "reflect-metadata";
import { Model, Options, ConnectionOptions, Sequelize } from "sequelize";
import { Association } from "./association";
import { ENTITY_NAME, MODEL_OPTION } from "./sequelize";
import { Connection } from "./connection";
import { ColumnService } from "./column";
import * as fs from "fs";
import { HookService } from "./hook";

export interface dbConfigOption extends ConnectionOptions {
  option: Options;
}

type SequelizeEntityLoaderOption = {
  debug?: boolean;
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
        AssociationLoaderService.debug = option.debug || false;
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
        // 注入钩子
        AssociationLoaderService.injectHook();
      }
    };
  };
}

class AssociationLoaderService {
  public static debug: boolean = false;
  private static entityMap: Map<string, Model> = new Map();

  // 允许注入关系类型
  private static ASSOCIATION_INJECT_LIST: string[] = Object.values(
    Association.associations
  );

  public static log(message: string) {
    if (this.debug) {
      console.log(
        `[Sequelize-ts-decorator] ${new Date().toLocaleString()} : ${message}...`
      );
    }
  }

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
    this.log("find entity now");
    for (let filePath of filePaths) {
      // 读取模型
      let entity = this.getSequelizeEntity(filePath);
      if (entity) {
        // 获取实例配置信息
        let option: any = Reflect.getMetadata(MODEL_OPTION, entity);
        // 获取实例字段信息
        let fields = ColumnService.getColumnsFiledOption(entity);
        option.sequelize = sequelize;
        // 初始化实例
        entity.init(fields, option);
        // 挂载sequelize在类中
        entity.seqeulize = sequelize;
        entitys.push(entity);
      }
    }
    this.log("mapping entity now");
    // set up the model entity map
    // 实例化模型放入模型map中
    entitys.forEach(model => {
      let entityName = Reflect.getMetadata(ENTITY_NAME, model);
      this.entityMap.set(entityName, model);
    });
    // set up the association
    this.log("set up associations now");
    for (let entity of entitys) {
      // 遍历外键关系
      for (let type of this.ASSOCIATION_INJECT_LIST) {
        // 获取外键关系配置
        let associations = Reflect.getMetadata(type, entity);
        if (associations && associations.length > 0) {
          for (let association of associations) {
            // 读取单个配置信息
            let { from, to, option } = association;
            // 配置关联
            from[type.toString()](this.entityMap.get(to), option);
          }
        }
      }
    }
  }

  public static injectHook() {
    this.log("inject model hook");
    let HookTypes: any[] = Object.values(HookService.hookTypes);
    for (let entity of this.entityMap.values()) {
      for (let hookType of HookTypes) {
        let hooksMap: Map<any, Function> = Reflect.getMetadata(
          hookType,
          entity
        );
        if (!hooksMap || hooksMap.size === 0) continue;
        hooksMap.forEach((val, key) => {
          entity.addHook(hookType, key, val);
        });
      }
    }
  }
}
