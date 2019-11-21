"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const association_1 = require("./association");
const sequelize_1 = require("./sequelize");
const connection_1 = require("./connection");
const column_1 = require("./column");
const fs = require("fs");
const hook_1 = require("./hook");
function AssociationLoader(option) {
    return function (constr) {
        return class extends constr {
            constructor(...args) {
                super(args);
                if (!option.dbConfig && !option.dbConfigFile) {
                    throw new Error(`Sequelize can not connect the db without config`);
                }
                if (option.dbConfigFile && !fs.existsSync(option.dbConfigFile)) {
                    throw new Error(`Can not found the connect config in ${option.dbConfigFile}, or directory file not exist!`);
                }
                this.connection = new connection_1.Connection(option.dbConfig || require(option.dbConfigFile));
                AssociationLoaderService.debug = option.debug || false;
                if (option.filePath) {
                    if (!fs.existsSync(option.filePath)) {
                        throw new Error(`sequelize path for ${option.filePath} not exist`);
                    }
                    AssociationLoaderService.injectAssociation(option.filePath, this.connection.sequelize);
                }
                AssociationLoaderService.injectHook();
            }
        };
    };
}
exports.AssociationLoader = AssociationLoader;
class AssociationLoaderService {
    static log(message) {
        if (this.debug) {
            console.log(`[Sequelize-ts-decorator] ${new Date().toLocaleString()} : ${message}...`);
        }
    }
    static getFileList(path) {
        return fs
            .readdirSync(path)
            .filter((val) => val.endsWith(".ts") || val.endsWith(".js"))
            .map(val => `${path}/${val}`);
    }
    static getSequelizeEntity(file) {
        const entityModule = require(file);
        for (let key in entityModule) {
            let MODULE = entityModule[key];
            if (MODULE instanceof Function &&
                Reflect.getMetadata(sequelize_1.ENTITY_NAME, MODULE)) {
                return MODULE;
            }
        }
        return null;
    }
    static injectAssociation(path, sequelize) {
        let filePaths = this.getFileList(path);
        let entitys = [];
        this.log("find entity now");
        for (let filePath of filePaths) {
            let entity = this.getSequelizeEntity(filePath);
            if (entity) {
                let option = Reflect.getMetadata(sequelize_1.MODEL_OPTION, entity);
                let fields = column_1.ColumnService.getColumnsFiledOption(entity);
                option.sequelize = sequelize;
                entity.init(fields, option);
                entity.seqeulize = sequelize;
                entitys.push(entity);
            }
        }
        this.log("mapping entity now");
        entitys.forEach(model => {
            let entityName = Reflect.getMetadata(sequelize_1.ENTITY_NAME, model);
            this.entityMap.set(entityName, model);
        });
        this.log("set up associations now");
        for (let entity of entitys) {
            for (let type of this.ASSOCIATION_INJECT_LIST) {
                let associations = Reflect.getMetadata(type, entity);
                if (associations && associations.length > 0) {
                    for (let association of associations) {
                        let { from, to, option } = association;
                        from[type.toString()](this.entityMap.get(to), option);
                    }
                }
            }
        }
    }
    static injectHook() {
        this.log("inject model hook");
        let HookTypes = Object.values(hook_1.HookService.hookTypes);
        for (let entity of this.entityMap.values()) {
            for (let hookType of HookTypes) {
                let hooksMap = Reflect.getMetadata(hookType, entity);
                if (!hooksMap || hooksMap.size === 0)
                    continue;
                hooksMap.forEach((val, key) => {
                    entity.addHook(hookType, key, val);
                });
            }
        }
    }
}
AssociationLoaderService.debug = false;
AssociationLoaderService.entityMap = new Map();
AssociationLoaderService.ASSOCIATION_INJECT_LIST = Object.values(association_1.Association.associations);
//# sourceMappingURL=associationLoader.js.map