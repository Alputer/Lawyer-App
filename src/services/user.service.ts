import { CreateUserInput } from "../schemas/user.schemas";
import { query } from "../utils/db";
import { hashPassword } from "./auth.service";

export async function createUser(input: CreateUserInput, verificationCode: string) {     
    
    const hashedPassword = await hashPassword(input.password)
  
    await query('INSERT INTO Lawyers (email, password_hash, firstname, lastname, verification_code) VALUES($1, $2, $3, $4, $5)', [input.email, hashedPassword, input.firstname, input.lastname, verificationCode]);
    await query('INSERT INTO LawyerProfiles (email) VALUES ($1)', [input.email])
  
    return;
  }

  export async function updateProfile(email: string, age: string | null | undefined, phoneNumber: string | null | undefined, linkedinUrl: string | null | undefined) {     
    
    if(typeof age !== 'undefined')
    await query('UPDATE LawyerProfiles SET age = $1 WHERE email = $2', [age as string | null, email]);
    if(typeof phoneNumber !== 'undefined')
    await query('UPDATE LawyerProfiles SET phone_number = $1 WHERE email = $2', [phoneNumber as string | null, email]);
    if(typeof linkedinUrl !== 'undefined')
    await query('UPDATE LawyerProfiles SET linkedin_url = $1 WHERE email = $2', [linkedinUrl as string | null, email]);
  
    return;
  }