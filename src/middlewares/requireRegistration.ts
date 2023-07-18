import { Request, Response, NextFunction } from "express";
import { query } from "../utils/db";

const requireRegistration = 
() => 
async (req: Request, res: Response, next: NextFunction) => {

  const email = req.body.email;

  const queryResult = await query('SELECT * FROM Lawyers L WHERE L.email = $1', [email]);

  const doesUserExist = queryResult.rowCount == 1;

  if (!doesUserExist) {
    return res.status(404).json({ error: 'User not found' });
  }

  return next();
};

export default requireRegistration;