import { CreateUserInput } from "../schemas/auth.validation";
import { query } from "../utils/db";
import { generateRegistrationTokens } from "../utils/jwt";
import log from "../utils/logger";

export async function createUser(input: CreateUserInput) {
    
    const user = await query('INSERT INTO lawyers (mail, password_hash, firstname, lastname) VALUES($1, $2, $3, $4)', [input.email, input.password, input.firstname, input.lastname]);
    //log.info(user);
    const tokens = generateRegistrationTokens({email: input.email});
    log.info('entered here');
    log.info('tokens: ', tokens);
    
    return {user, ...tokens};
  }