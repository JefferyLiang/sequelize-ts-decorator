"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("./sequelize");
const loader = require("./associationLoader");
exports.Entity = sequelize.Entity;
exports.HasMany = sequelize.HasMany;
exports.BelongsTo = sequelize.BelongsTo;
exports.BelongsToMany = sequelize.BelongsToMany;
exports.AssociationLoader = loader.AssociationLoader;
//# sourceMappingURL=index.js.map