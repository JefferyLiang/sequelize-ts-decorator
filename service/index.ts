import * as express from "express";
import * as Path from "path";
import { AssociationLoader } from "../lib/associationLoader";
import { ControllerLoader } from "express-ts-decorator";

@AssociationLoader({
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
@ControllerLoader({
  filePath: Path.join(__dirname, "./controllers")
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
