import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

class Rating extends Model {
  rater_email!: string;
  rated_email!: string;
  rating!: number;
}

Rating.init(
  {
    rater_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Lawyers",
        key: "email",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    rated_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Lawyers",
        key: "email",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Rating",
  }
);

export default Rating;
