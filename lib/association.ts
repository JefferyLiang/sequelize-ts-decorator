import "reflect-metadata";

export type AssociationOption<T> = {
  from?: any;
  to: string;
  option: T;
};

export class Association {
  public static ASSOCIATION_KEY = "ASSOCIATION";
  public static associations = {
    BELONGS_TO: "belongsTo",
    HAS_MANY: "hasMany",
    BELONGS_TO_MANY: "belongsToMany"
  };

  private static getAssociationKeyName(key: string | symbol): string {
    return `${this.ASSOCIATION_KEY.toString()}_${key.toString()}`;
  }

  public static associationDecoratorBuilder<T>(association: string) {
    return (options: Array<AssociationOption<T>>): ClassDecorator => {
      return target => {
        if (options.length > 0) {
          Reflect.defineMetadata(
            association,
            options.map((val: any) => {
              val.from = target;
              return val;
            }),
            target
          );
        }
      };
    };
  }

  // public static associationMethodDecoratorBuilder<T>(association: string) {
  //   return (option: T): PropertyDecorator => {
  //     return (target, key) => {
  //       Reflect.defineMetadata();
  //     };
  //   };
  // }
}
