"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Column(option) {
    return (target, key) => {
        let options = Reflect.getMetadata(ColumnService.getTypeKey(key), target.constructor);
        if (!options) {
            options = {
                type: option.type,
                allowNull: option.nullable || false,
                unique: option.unique || false,
                validate: option.validate || undefined
            };
            Reflect.defineMetadata(ColumnService.getTypeKey(key), options, target.constructor);
        }
        options.type = option.type;
        options.allowNull = option.nullable || false;
        options.unique = option.unique || false;
        options.validate = option.validate || undefined;
    };
}
exports.Column = Column;
function PrimaryKey(atuoIncrement = false) {
    return (target, key) => {
        let option = Reflect.getMetadata(ColumnService.getTypeKey(key), target.constructor);
        if (!option) {
            option = {};
            Reflect.defineMetadata(ColumnService.getTypeKey(key), option, target.constructor);
        }
        option.autoIncrement = atuoIncrement;
        option.primaryKey = true;
    };
}
exports.PrimaryKey = PrimaryKey;
function References(options, onDelete = "SET NULL", onUpdate = "NO ACTION") {
    return (target, key) => {
        let option = Reflect.getMetadata(ColumnService.getTypeKey(key), target.constructor);
        if (!option) {
            option = {};
            Reflect.defineMetadata(ColumnService.getTypeKey(key), option, target.constructor);
        }
        option.references = options;
        option.onDelete = onDelete;
        option.onUpdate = onUpdate;
    };
}
exports.References = References;
class ColumnService {
    static getTypeKey(key) {
        return `${this.COLUMN_KEY.toString()}_${key.toString()}`;
    }
    static getColumnsFiledOption(target) {
        const KEYS = Reflect.getMetadataKeys(target).filter((key) => key.toString().startsWith(ColumnService.COLUMN_KEY.toString()));
        const SUB_STR_LENGTH = ColumnService.COLUMN_KEY.toString().length + 1;
        let fields = {};
        KEYS.forEach(key => {
            let option = Reflect.getMetadata(key, target);
            let attributeName = key.slice(SUB_STR_LENGTH, key.length);
            fields[attributeName] = option;
        });
        return fields;
    }
}
exports.ColumnService = ColumnService;
ColumnService.COLUMN_KEY = Symbol("ATTRIBUTE");
ColumnService.TYPES = Symbol("TYPE");
//# sourceMappingURL=column.js.map