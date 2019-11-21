import { Model, DataTypes, FindOptions } from "sequelize";
import { Entity } from "../../lib/sequelize";
import { AfterFindHook } from "../../lib/hook";
import { Column, PrimaryKey } from "../../lib/column";
import * as _ from "lodash";

@Entity("account", {
  tableName: "accounts",
  timestamps: true
})
export class Account extends Model {
  @Column({ type: DataTypes.INTEGER })
  @PrimaryKey(true)
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

  @AfterFindHook()
  public static setCount(accounts: Account | Account[], option: FindOptions) {
    let datas = Array.isArray(accounts) ? accounts : [accounts];
    for (let data of datas) {
      data.setDataValue("count", 1);
    }
  }
}
