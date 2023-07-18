import { Request, Response } from 'express';
import { authService, userService, tokenService, mailService} from '../services';

const { v4: uuidv4 } = require('uuid');

export async function register(
    req: Request,
    res: Response
  ) {
    const body = req.body;
  
    try {
  
      const verificationCode = uuidv4()
  
      await userService.createUser(body, verificationCode);
  
      const mailOptions = {
        from: 'alp.tuna.453@gmail.com',
        to: body.email,
        subject: "Verify your email",
        text: `verification code: ${verificationCode}.}`,
  
      };
  
      await mailService.sendEmail(mailOptions);
      
  
      return res.status(200).json({
        message: "User successfully created",
      });
  
      
  
    } catch (e: any) {
      
      if (e.code === "23505") {
        return res.status(409).send("Account already exists");
      }
      console.log(e)
      return res.status(500).send(e);
    }
  }


  export default {
    register,
  };