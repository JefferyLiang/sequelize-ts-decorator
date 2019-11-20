import * as sequelize from "./sequelize";
import * as loader from "./associationLoader";

export const Entity = sequelize.Entity;
export const HasMany = sequelize.HasMany;
export const BelongsTo = sequelize.BelongsTo;
export const BelongsToMany = sequelize.BelongsToMany;
export const AssociationLoader = loader.AssociationLoader;
