import {SaveVerificationCodeInput } from "../schemas/auth.schemas";
import { query } from "../utils/db";
import bcrypt from 'bcrypt';


export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (credentials: {email: string, password: string}): Promise<boolean> => {
  const queryResult = await query('SELECT L.password_hash FROM Lawyers L WHERE L.email = $1', [credentials.email]);
  const hashedPassword = queryResult.rows[0].password_hash;

  const isMatch = await bcrypt.compare(credentials.password, hashedPassword);
  return isMatch;
};

export async function saveVerificationCode(input: SaveVerificationCodeInput) {

    await query('UPDATE lawyers L SET verification_code = $1 WHERE L.email = $2', [input.verificationCode, input.email]);

    return;
  }

  export async function checkMail(email: string){
    const queryResult = await query('SELECT * FROM Lawyers L WHERE L.email = $1', [email]);
    const isRegistered = queryResult.rowCount == 1;
  
    return isRegistered;
  }

export async function isValidated(email: string) {

  const queryResult = await query('SELECT L.is_validated FROM Lawyers L WHERE L.email = $1', [email]);
  const isValidated = queryResult.rows[0].is_validated;

  return isValidated;
}