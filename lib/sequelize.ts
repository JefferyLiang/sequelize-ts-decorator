import "reflect-metadata";
import { Association } from "./association";
import {
  HasManyOptions,
  BelongsToOptions,
  BelongsToManyOptions,
  ModelOptions,
  Sequelize,
  HasOneOptions
} from "sequelize/types";

export const ENTITY_NAME = Symbol("entity");
export const MODEL_OPTION = Symbol("modelOption");

export interface InitOption extends ModelOptions {
  sequelize?: Sequelize;
}

export function Entity(name: string, option: InitOption): ClassDecorator {
  return target => {
    Reflect.defineMetadata(ENTITY_NAME, name, target);
    if (option) {
      Reflect.defineMetadata(MODEL_OPTION, option, target);
    }
  };
}

export const HasMany = Association.associationDecoratorBuilder<HasManyOptions>(
  Association.associations.HAS_MANY
);
export const BelongsTo = Association.associationDecoratorBuilder<
  BelongsToOptions
>(Association.associations.BELONGS_TO);
export const BelongsToMany = Association.associationDecoratorBuilder<
  BelongsToManyOptions
>(Association.associations.BELONGS_TO_MANY);

export const HasOne = Association.associationDecoratorBuilder<HasOneOptions>(
  Association.associations.HAS_ONE
);
