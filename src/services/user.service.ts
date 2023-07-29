import { QueryResult } from "pg";
import { CreateUserInput } from "../schemas/user.schemas";
import { query } from "../utils/db";
import { hashPassword } from "./auth.service";

export async function userExists(userEmail: string){
  const queryResult = await query("SELECT * FROM Lawyers WHERE email = $1", [userEmail]);
  return queryResult.rowCount > 0
}

export async function createUser(input: CreateUserInput, verificationCode: string) {     
    
    const hashedPassword = await hashPassword(input.password)
  
    await query('INSERT INTO Lawyers (email, password_hash, firstname, lastname, verification_code) VALUES ($1, $2, $3, $4, $5)', [input.email, hashedPassword, input.firstname, input.lastname, verificationCode]);
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

  export async function rateLawyer(rater_email: string, rated_email: string, rating: number) {     
    
    await query('INSERT INTO Rates (rater_email, rated_email, rating) VALUES ($1, $2, $3)', [rater_email, rated_email, rating.toString()]);
  
    return;
  }

  export async function getLawyers(barId: string, availability: string | null) {

    let queryResult = {} as QueryResult<any>;
    if(availability === "True"){
      queryResult = await query("SELECT (email, firstname, lastname) FROM Lawyers WHERE bar_id = $1 AND lawyer_state = 'free'", [barId]);
    }
    else{
      queryResult = await query("SELECT (email, firstname, lastname) FROM Lawyers WHERE bar_id = $1", [barId]);
    }

    const lawyers = queryResult.rows.map(lawyer => {
      const items = lawyer.row.split(',');
      return {email: items[0].slice(1),
             firstname: items[1],
             lastname: items[2].slice(0, -1),
            };
        } 
      );

    return lawyers;
  }

  export async function getUserProfile(userEmail: string) {
    const queryResult = await query("SELECT * FROM LawyerProfiles WHERE email = $1", [userEmail]);
    
    const user_profile= {
      age: queryResult.rows[0].age,
      phone_number: queryResult.rows[0].phone_number,
      linkedin_url: queryResult.rows[0].linkedin_url,
    }

    return user_profile;
  }

  export async function getUserLocation(userEmail: string) {
    const queryResult = await query("SELECT C.city_name From Cities C, Lawyers L WHERE L.email = $1 AND L.last_location = C.city_id", [userEmail]);
    
    const user_location = queryResult.rows[0]?.city_name;

    return user_location;
  }

  export async function updateUserLocation(userEmail: string, cityName: string) {

    await query('UPDATE Lawyers SET last_location = (SELECT city_id FROM Cities WHERE city_name = $1) WHERE email = $2', [cityName, userEmail]);
    return;
  }