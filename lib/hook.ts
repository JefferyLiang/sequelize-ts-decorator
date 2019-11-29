import "reflect-metadata";

export class HookService {
  public static hookTypes = {
    afterFind: "afterFind",
    beforeFind: "beforeFind"
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
