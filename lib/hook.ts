import "reflect-metadata";

export class HookService {
  public static hookTypes = {
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

  public static hookDecoratorBuilder(hookName: string) {
    return (): MethodDecorator => {
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

export const AfterFindHook = HookService.hookDecoratorBuilder(
  HookService.hookTypes.afterFind
);
export const BeforeFindHook = HookService.hookDecoratorBuilder(
  HookService.hookTypes.beforeFind
);
export const BeforeCreateHook = HookService.hookDecoratorBuilder(
  HookService.hookTypes.beforeCreate
);
export const AfterCreateHook = HookService.hookDecoratorBuilder(
  HookService.hookTypes.afterCreate
);
export const BeforeDestroyHook = HookService.hookDecoratorBuilder(
  HookService.hookTypes.beforeDestroy
);
export const AfterDestroyHook = HookService.hookDecoratorBuilder(
  HookService.hookTypes.afterDestroy
);
export const BeforeSaveHook = HookService.hookDecoratorBuilder(
  HookService.hookTypes.beforeSave
);
export const AfterSaveHook = HookService.hookDecoratorBuilder(
  HookService.hookTypes.afterSave
);
export const BeforeUpdateHook = HookService.hookDecoratorBuilder(
  HookService.hookTypes.beforeUpdate
);
export const AfterUpdateHook = HookService.hookDecoratorBuilder(
  HookService.hookTypes.afterUpdate
);
