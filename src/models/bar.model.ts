import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

class Bar extends Model {
  bar_id!: number;
  bar_name!: string;
  city_id!: number;
}

Bar.init(
  {
    bar_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bar_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Cities",
        key: "city_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Bar",
  }
);

export default Bar;
