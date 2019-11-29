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
    beforeFind: "beforeFind"
};
exports.AfterFindHook = HookService.hookDecoratorBuilder(HookService.hookTypes.afterFind);
exports.BeforeFindHook = HookService.hookDecoratorBuilder(HookService.hookTypes.beforeFind);
//# sourceMappingURL=hook.js.map