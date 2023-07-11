import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import logger from "./utils/logger";
import {connect} from "./utils/db";
import routes from "./routes";


const port = config.get<number>("port");

const app = express();

app.use(express.json());

app.listen(port, async () => {
    
    logger.info(`App is running at http://localhost:${port}`);
  
    await connect();
  
    routes(app);
  });