import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import logger from "./utils/logger";
import {connect} from "./utils/db";
import index from './routes/index';
import deserializeUser from "./middlewares/deserializeUser";

const port = config.get<number>("port");

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.use('/api', index);

app.listen(port, async () => {
    
    logger.info(`App is running at http://localhost:${port}`);
  
    await connect();
 
  });