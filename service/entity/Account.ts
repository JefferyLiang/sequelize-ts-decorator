import { Model, DataTypes } from "sequelize";
import { Entity } from "../../lib/sequelize";

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
}
