import { Sequelize } from "sequelize";
import { dbConfigOption } from "./associationLoader";

export class Connection {
  private _sequelize: Sequelize;

  get sequelize() {
    return this._sequelize;
  }

  constructor(option: dbConfigOption) {
    try {
      this._sequelize = new Sequelize(
        option.database!,
        option.username!,
        option.password!,
        option.option!
      );
    } catch (err) {
      throw err;
    }
  }
}
