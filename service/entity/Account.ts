import { Model, DataTypes, FindOptions } from "sequelize";
import { Entity } from "../../lib/sequelize";
import { AfterFindHook } from "../../lib/hook";
import * as _ from "lodash";

@Entity("account", {
  fields: {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(512),
      validate: {
        isEmail: true
      },
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "roles",
        key: "id"
      },
      onDelete: "CASCADE"
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  tableName: "accounts",
  timestamps: true
})
export class Account extends Model {
  public readonly id!: number;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  public count!: number;

  @AfterFindHook()
  public static setCount(accounts: Account | Account[], option: FindOptions) {
    let datas = Array.isArray(accounts) ? accounts : [accounts];
    for (let data of datas) {
      data.setDataValue("count", 1);
    }
  }
}
