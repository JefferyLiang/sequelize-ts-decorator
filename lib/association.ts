export type AssociationOption<T> = {
  from?: any;
  to: string;
  option: T;
};

export class Association {
  public static associations = {
    BELONGS_TO: Symbol("belongsTo"),
    HAS_MANY: Symbol("hasMany"),
    BELONGS_TO_MANY: Symbol("belongsToMany")
  };

  public static associationDecoratorBuilder<T>(association: Symbol) {
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
}
