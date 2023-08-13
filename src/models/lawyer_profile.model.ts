import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

class LawyerProfile extends Model {
  email!: string;
  age!: number;
  phone_number!: string;
  linkedin_url!: string;
}

LawyerProfile.init(
  {
    email: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      references: {
        model: "Lawyers",
        key: "email",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    age: {
      type: DataTypes.INTEGER,
    },
    phone_number: {
      type: DataTypes.STRING(255),
    },
    linkedin_url: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    modelName: "LawyerProfile",
    timestamps: true,
  }
);

export default LawyerProfile;
