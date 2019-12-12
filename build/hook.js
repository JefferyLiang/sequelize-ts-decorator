"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class HookService {
    static hookDecoratorBuilder(hookName) {
        return () => {
            return (target, key, descriptor) => {
                let hooksMap = Reflect.getMetadata(hookName, target);
                if (!hooksMap) {
                    hooksMap = new Map();
                    Reflect.defineMetadata(hookName, hooksMap, target);
                }
                hooksMap.set(key, descriptor.value);
            };
        };
    }
}
exports.HookService = HookService;
HookService.hookTypes = {
    afterFind: "afterFind",
    beforeFind: "beforeFind",
    beforeCreate: "beforeCreate",
    afterCreate: "afterCreate",
    beforeDestroy: "beforeDestroy",
    afterDestroy: "afterDestroy",
    beforeUpdate: "beforeUpdate",
    afterUpdate: "afterUpdate",
    beforeSave: "beforeSave",
    afterSave: "afterSave"
};
exports.AfterFindHook = HookService.hookDecoratorBuilder(HookService.hookTypes.afterFind);
exports.BeforeFindHook = HookService.hookDecoratorBuilder(HookService.hookTypes.beforeFind);
exports.BeforeCreateHook = HookService.hookDecoratorBuilder(HookService.hookTypes.beforeCreate);
exports.AfterCreateHook = HookService.hookDecoratorBuilder(HookService.hookTypes.afterCreate);
exports.BeforeDestroyHook = HookService.hookDecoratorBuilder(HookService.hookTypes.beforeDestroy);
exports.AfterDestroyHook = HookService.hookDecoratorBuilder(HookService.hookTypes.afterDestroy);
exports.BeforeSaveHook = HookService.hookDecoratorBuilder(HookService.hookTypes.beforeSave);
exports.AfterSaveHook = HookService.hookDecoratorBuilder(HookService.hookTypes.afterSave);
exports.BeforeUpdateHook = HookService.hookDecoratorBuilder(HookService.hookTypes.beforeUpdate);
exports.AfterUpdateHook = HookService.hookDecoratorBuilder(HookService.hookTypes.afterUpdate);
//# sourceMappingURL=hook.js.map