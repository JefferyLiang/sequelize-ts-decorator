"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Association {
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
Association.associations = {
    BELONGS_TO: Symbol("belongsTo"),
    HAS_MANY: Symbol("hasMany"),
    BELONGS_TO_MANY: Symbol("belongsToMany")
};
//# sourceMappingURL=association.js.map