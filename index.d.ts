import {
  ModelOptions,
  ModelAttributes,
  Sequelize,
  HasManyOptions,
  BelongsToOptions,
  BelongsToManyOptions,
  ConnectionOptions,
  Options
} from "sequelize";

interface InitOption extends ModelOptions {
  fields: ModelAttributes;
  sequelize?: Sequelize;
}

interface dbConfigOption extends ConnectionOptions {
  option: Options;
}

interface SequelizeEntityLoaderOption {
  filePath: string;
  dbConfigFile?: string;
  dbConfig?: dbConfigOption;
}

type AssociationOption<T> = {
  from?: any;
  to: string;
  option: T;
};

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
}

export = sequelizeTsDecorator;
