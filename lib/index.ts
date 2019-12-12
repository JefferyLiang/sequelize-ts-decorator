import * as sequelize from "./sequelize";
import * as loader from "./associationLoader";
import * as hook from "./hook";
import * as Columns from "./column";

export const Entity = sequelize.Entity;
// associations
export const HasMany = sequelize.HasMany;
export const BelongsTo = sequelize.BelongsTo;
export const BelongsToMany = sequelize.BelongsToMany;
// loader
export const AssociationLoader = loader.AssociationLoader;
// hooks
export const BeforeFind = hook.BeforeFindHook;
export const AfterFind = hook.AfterFindHook;
export const BeforeSave = hook.BeforeSaveHook;
export const AfterSave = hook.AfterSaveHook;
export const BeforeUpdate = hook.BeforeUpdateHook;
export const AfterUpdate = hook.AfterUpdateHook;
export const BeforeCreate = hook.BeforeCreateHook;
export const AfterCreate = hook.AfterCreateHook;
export const BeforeDestroy = hook.BeforeDestroyHook;
export const AfterDestroy = hook.AfterDestroyHook;
// entity attribute
export const Column = Columns.Column;
export const References = Columns.References;
export const PrimaryKey = Columns.PrimaryKey;
export const Id = Columns.Id;
