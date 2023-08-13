import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";
import { JOB_STATE } from "../enums/job.enum";

class Job extends Model {
  job_id!: string;
  executor!: string | null;
  requester!: string;
  job_description!: string;
  job_status!: JOB_STATE;
  create_date!: Date;
  start_date!: Date | null;
  due_date!: Date | null;
  finish_date!: Date | null;
}

Job.init(
  {
    job_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    executor: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: "Lawyers",
        key: "email",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
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
    job_description: {
      type: DataTypes.STRING(2048),
      allowNull: false,
    },
    job_status: {
      type: DataTypes.ENUM(...Object.values(JOB_STATE)),
      allowNull: false,
      defaultValue: JOB_STATE.NotStarted,
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    finish_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "Job",
  }
);

export default Job;
