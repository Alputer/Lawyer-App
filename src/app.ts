import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import logger from "./utils/logger";
import {connect} from "./utils/db";
import router from './routes';
import deserializeUser from "./middlewares/deserializeUser";
import cookieParser from 'cookie-parser';

const port = config.get<number>("port");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(deserializeUser);

app.use('/api', router);

app.listen(port, async () => {
    
    logger.info(`App is running at http://localhost:${port}`);
  
    await connect();
 
  });