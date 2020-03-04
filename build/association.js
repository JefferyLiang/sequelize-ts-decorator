"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class Association {
    static getAssociationKeyName(key) {
        return `${this.ASSOCIATION_KEY.toString()}_${key.toString()}`;
    }
    static associationDecoratorBuilder(association) {
        return (options) => {
            return target => {
                if (options.length > 0) {
                    Reflect.defineMetadata(association, options.map((val) => {
                        val.from = target;
                        return val;
                    }), target);
                }
            };
        };
    }
}
exports.Association = Association;
Association.ASSOCIATION_KEY = "ASSOCIATION";
Association.associations = {
    BELONGS_TO: "belongsTo",
    HAS_MANY: "hasMany",
    BELONGS_TO_MANY: "belongsToMany",
    HAS_ONE: "hasOne"
};
//# sourceMappingURL=association.js.map