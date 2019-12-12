# sequelize-ts-decorator

> sequelize decorator with typescript project

## Installation

```bash
$ npm i -S sequelize-ts-decorator

or

$ yarn add sequelize-ts-decorator
```

## Usage

1. Set up the Entity

```typescript
import { Model, DataTypes, FindOptions } from "sequelize";
import {
  AfterFind,
  BeforeFind,
  Entity,
  Column,
  Id
} from "sequelize-ts-decorator";
import * as _ from "lodash";

@Entity("account", {
  tableName: "accounts",
  timestamps: true
})
export class Account extends Model {
  @Id()
  public readonly id!: number;
  @Column({ type: DataTypes.STRING(512) })
  public email!: string;
  @Column({ type: DataTypes.STRING(512) })
  public password!: string;
  @Column({ type: DataTypes.DATE })
  public createdAt!: Date;
  @Column({ type: DataTypes.DATE })
  public updatedAt!: Date;

  public count!: number;

  @BeforeFindHook()
  public static showLog(option: FindOptions) {
    if (option.limit === 20) option.limit = 25;
  }

  @AfterFindHook()
  public static setCount(accounts: Account | Account[], option: FindOptions) {
    let datas = Array.isArray(accounts) ? accounts : [accounts];
    for (let data of datas) {
      data.setDataValue("count", 1);
    }
  }
}
```

2. Use loadder with express

```typescript
import * as express from "express";
import * as Path from "path";
import { AssociationLoader } from "sequelize-ts-decorator";

@AssociationLoader({
  debug: true,
  filePath: Path.join(__dirname, "./entity"),
  dbConfig: {
    host: "localhost",
    username: "root",
    password: "123456",
    database: "oamanager",
    port: 3306,
    option: {
      dialect: "mysql",
      port: 3306,
      host: "localhost"
    }
  }
})
class App {
  private _express: express.Express;

  public routes: express.Router[] = [];

  get express() {
    return this._express;
  }

  constructor() {
    this._express = express();
  }

  public use(
    ...args: Array<express.RequestHandler | express.ErrorRequestHandler>
  ) {
    this._express.use(...args);
  }
}

const app = new App();

app.routes.forEach(router => {
  app.use(router);
});

app.express.listen(3000);
```
