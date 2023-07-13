import { Pool } from "pg";
import config from "config";
import logger from "./logger";

const dbConfig = config.get<object>("dbConfig");

const pool = new Pool(dbConfig);

export async function connect() {
  try {
    await pool.connect();
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

// Example usage below
// const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
// const values = ['john', 'john.doe@gmail.com']

export const query = async (text: string, params: Array<string> ) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  logger.info('executed query', { text, duration, rows: res.rowCount })
  return res
}
