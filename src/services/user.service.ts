import { CreateUserInput } from "../schemas/user.schemas";
import { query } from "../utils/db";
import { hashPassword } from "./auth.service";

export async function createUser(input: CreateUserInput, verificationCode: string) {     
    
    const hashedPassword = await hashPassword(input.password)
  
    await query('INSERT INTO Lawyers (email, password_hash, firstname, lastname, verification_code) VALUES($1, $2, $3, $4, $5)', [input.email, hashedPassword, input.firstname, input.lastname, verificationCode]);
    await query('INSERT INTO LawyerProfiles (email) VALUES ($1)', [input.email])
  
    return;
  }