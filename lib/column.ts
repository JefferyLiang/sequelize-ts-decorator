import "reflect-metadata";
import {
  DataType,
  ModelAttributeColumnOptions,
  ModelAttributeColumnReferencesOptions,
  ModelValidateOptions,
  ModelAttributes,
  DataTypes
} from "sequelize";

export function Column(option: {
  type: DataType;
  nullable?: boolean;
  unique?: boolean | string | { name: string; msg: string };
  validate?: ModelValidateOptions;
}): PropertyDecorator {
  return (target, key) => {
    let options: ModelAttributeColumnOptions = Reflect.getMetadata(
      ColumnService.getColumnOptionKey(key),
      target.constructor
    );
    if (!options) {
      options = {
        type: option.type,
        allowNull: option.nullable || false,
        unique: option.unique || false,
        validate: option.validate || undefined
      };
      Reflect.defineMetadata(
        ColumnService.getColumnOptionKey(key),
        options,
        target.constructor
      );
    }
    options.type = option.type;
    options.allowNull = option.nullable || false;
    options.unique = option.unique || false;
    options.validate = option.validate || undefined;
  };
}

export function PrimaryKey(atuoIncrement: boolean = false): PropertyDecorator {
  return (target, key) => {
    let option: any = Reflect.getMetadata(
      ColumnService.getColumnOptionKey(key),
      target.constructor
    );
    if (!option) {
      option = {};
      Reflect.defineMetadata(
        ColumnService.getColumnOptionKey(key),
        option,
        target.constructor
      );
    }
    option.autoIncrement = atuoIncrement;
    option.primaryKey = true;
  };
}

export const Id = (): PropertyDecorator => {
  return (target, key) => {
    let option: any = Reflect.getMetadata(
      ColumnService.getColumnOptionKey(key),
      target.constructor
    );
    if (!option) {
      option = {};
      Reflect.defineMetadata(
        ColumnService.getColumnOptionKey(key),
        option,
        target.constructor
      );
    }
    option.type = DataTypes.INTEGER;
    option.allowNull = false;
    option.autoIncrement = true;
    option.primaryKey = true;
  };
};

type ReferencesOnTypes =
  | "CASCADE"
  | "RESTRICT"
  | "SET DEFAULT"
  | "SET NULL"
  | "NO ACTION";

export function References(
  options: ModelAttributeColumnReferencesOptions,
  onDelete: ReferencesOnTypes = "SET NULL",
  onUpdate: ReferencesOnTypes = "NO ACTION"
): PropertyDecorator {
  return (target, key) => {
    let option: any = Reflect.getMetadata(
      ColumnService.getColumnOptionKey(key),
      target.constructor
    );
    if (!option) {
      option = {};
      Reflect.defineMetadata(
        ColumnService.getColumnOptionKey(key),
        option,
        target.constructor
      );
    }
    option.references = options;
    option.onDelete = onDelete;
    option.onUpdate = onUpdate;
  };
}

export class ColumnService {
  public static COLUMN_KEY = Symbol("ATTRIBUTE");
  public static TYPES = Symbol("TYPE");

  public static getColumnOptionKey(key: string | Symbol): string {
    return `${this.COLUMN_KEY.toString()}_${key.toString()}`;
  }

  public static getColumnsFiledOption(target: Object): ModelAttributes {
    const KEYS = Reflect.getMetadataKeys(target).filter((key: string) =>
      key.toString().startsWith(ColumnService.COLUMN_KEY.toString())
    );
    const SUB_STR_LENGTH: number =
      ColumnService.COLUMN_KEY.toString().length + 1;
    let fields: ModelAttributes = {};
    KEYS.forEach(key => {
      let option: ModelAttributeColumnOptions = Reflect.getMetadata(
        key,
        target
      );
      let attributeName = key.slice(SUB_STR_LENGTH, key.length);
      fields[attributeName] = option;
    });
    return fields;
  }
}
