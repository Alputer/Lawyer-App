import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

class City extends Model {
  city_id!: number;
  city_name!: string;
}

City.init(
  {
    city_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    city_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "City",
  }
);

export default City;
