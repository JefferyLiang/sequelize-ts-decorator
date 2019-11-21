import {
  ModelOptions,
  ModelAttributes,
  Sequelize,
  HasManyOptions,
  BelongsToOptions,
  BelongsToManyOptions,
  ConnectionOptions,
  Options,
  DataType,
  ModelValidateOptions,
  ModelAttributeColumnReferencesOptions
} from "sequelize/types";

interface InitOption extends ModelOptions {
  // fields: ModelAttributes;
  sequelize?: Sequelize;
}

interface dbConfigOption extends ConnectionOptions {
  option: Options;
}

interface SequelizeEntityLoaderOption {
  debug?: boolean;
  filePath: string;
  dbConfigFile?: string;
  dbConfig?: dbConfigOption;
}

type AssociationOption<T> = {
  from?: any;
  to: string;
  option: T;
};

interface ColumnOption {
  type: DataType;
  nullable?: boolean;
  unique?: boolean | string | { name: string; msg: string };
  validate?: ModelValidateOptions;
}

type ReferencesOnTypes =
  | "CASCADE"
  | "RESTRICT"
  | "SET DEFAULT"
  | "SET NULL"
  | "NO ACTION";

declare namespace sequelizeTsDecorator {
  export function Entity(name: string, option: InitOption): ClassDecorator;
  export function HasMany(
    options: AssociationOption<HasManyOptions>[]
  ): ClassDecorator;
  export function BelongsTo(options: AssociationOption<BelongsToOptions>[]);
  export function BelongsToMany(
    options: AssociationOption<BelongsToManyOptions>[]
  );
  export function AssociationLoader(
    option: SequelizeEntityLoaderOption
  ): ClassDecorator;
  export function AfterFind(): MethodDecorator;
  export function Column(options: ColumnOption): PropertyDecorator;
  export function PrimaryKey(autoIncrement: boolean): PropertyDecorator;
  export function References(
    options: ModelAttributeColumnReferencesOptions,
    onDelete?: ReferencesOnTypes,
    onUpdate?: ReferencesOnTypes
  ): PropertyDecorator;
  export function Id(): PropertyDecorator;
}

export = sequelizeTsDecorator;
