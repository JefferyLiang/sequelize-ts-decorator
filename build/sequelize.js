"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const association_1 = require("./association");
exports.ENTITY_NAME = Symbol("entity");
exports.MODEL_OPTION = Symbol("modelOption");
function Entity(name, option) {
    return target => {
        Reflect.defineMetadata(exports.ENTITY_NAME, name, target);
        if (option) {
            Reflect.defineMetadata(exports.MODEL_OPTION, option, target);
        }
    };
}
exports.Entity = Entity;
exports.HasMany = association_1.Association.associationDecoratorBuilder(association_1.Association.associations.HAS_MANY);
exports.BelongsTo = association_1.Association.associationDecoratorBuilder(association_1.Association.associations.BELONGS_TO);
exports.BelongsToMany = association_1.Association.associationDecoratorBuilder(association_1.Association.associations.BELONGS_TO_MANY);
exports.HasOne = association_1.Association.associationDecoratorBuilder(association_1.Association.associations.HAS_ONE);
//# sourceMappingURL=sequelize.js.map