import { Model, DataTypes, FindOptions } from "sequelize";
import { Entity } from "../../lib/sequelize";
import { AfterFindHook, BeforeFindHook } from "../../lib/hook";
import { Column, Id } from "../../lib/column";
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
