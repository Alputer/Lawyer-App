import { Sequelize } from "sequelize";
import config from "config";
import logger from "./logger";
import { averageRatingTrigger } from "./triggers";

const dbUri = config.get<string>("dbUri");

// Set up Sequelize instance
export const sequelize = new Sequelize(dbUri);

export async function connect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Sync models with the database
    await sequelize.query(averageRatingTrigger);
    logger.info("DB connected");
  } catch (error) {
    console.log(error);
    logger.error("Could not connect to db", error);
    process.exit(1);
  }
}
