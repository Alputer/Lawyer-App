import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";
import { OFFER_STATE } from "../enums/offer.enum";

class Offer extends Model {
  offer_id!: string;
  job_id!: string;
  requester!: string;
  receiver!: string;
  offer_status!: OFFER_STATE;
  offer_date!: Date;
  response_date!: Date | null;
  dismiss_date!: Date | null;
}

Offer.init(
  {
    offer_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    job_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Jobs",
        key: "job_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    requester: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: "Lawyers",
        key: "email",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    receiver: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: "Lawyers",
        key: "email",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    offer_status: {
      type: DataTypes.ENUM(...Object.values(OFFER_STATE)),
      allowNull: false,
      defaultValue: OFFER_STATE.Pending,
    },
    offer_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    response_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dismiss_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Offer",
  }
);

export default Offer;
