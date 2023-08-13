import { Sequelize } from "sequelize";
import config from "config";
import logger from "./logger";

const dbUri = config.get<string>("dbUri");

// Set up Sequelize instance
export const sequelize = new Sequelize(dbUri);

export async function connect() {
  try {
    await sequelize.authenticate();
    logger.info("DB connected");
    await sequelize.sync(); // Sync models with the database
  } catch (error) {
    logger.error("Could not connect to db", error);
    process.exit(1);
  }
}
