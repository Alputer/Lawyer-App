import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/db";
import { LAWYER_STATE } from "../enums/lawyer.enum";
import City from "./city.model";

class Lawyer extends Model {
  email!: string;
  password_hash!: string;
  firstname!: string;
  lastname!: string;
  bar_id!: number;
  lawyer_state!: keyof typeof LAWYER_STATE;
  average_rating!: number | null;
  is_validated!: boolean;
  verification_code!: string | null;
  reset_token!: string | null;
  last_location!: number | null;
}

Lawyer.init(
  {
    email: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lawyer_state: {
      type: DataTypes.ENUM(...Object.values(LAWYER_STATE)),
      allowNull: false,
      defaultValue: LAWYER_STATE.FREE,
    },
    average_rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    is_validated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verification_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_location: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    modelName: "Lawyer",
    timestamps: true,
  }
);

Lawyer.belongsTo(City, { foreignKey: "last_location", as: "city" });

export class LawyerWithCity extends Lawyer {
  city!: City;
}

export default Lawyer;
