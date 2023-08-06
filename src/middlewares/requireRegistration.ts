import { Request, Response, NextFunction } from "express";
import { query } from "../utils/db";

const requireRegistration = 
(_: {userEmailField: string, place: string}) => 
async (req: Request, res: Response, next: NextFunction) => {

  
  let email = req.body[_.userEmailField];
  if(_.place === "body"){
    email = req.body[_.userEmailField];
  }
  if(_.place === "params"){
    email = req.params[_.userEmailField];
  }

  const queryResult = await query('SELECT * FROM Lawyers L WHERE L.email = $1', [email]);
  
  const userExists = queryResult.rowCount == 1;
  
  if (!userExists) {
    console.log("here")
    console.log(email)
    return res.status(404).json({ error: 'User not found' });
  }

  return next();
};

export default requireRegistration;