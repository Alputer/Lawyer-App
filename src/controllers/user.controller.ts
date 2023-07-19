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
        text: `verification code: ${verificationCode}`,
      };
  
      await mailService.sendEmail(mailOptions);
      
      return res.status(200).json({
        message: "User successfully created",
      });
      
    } catch (e: any) {
      
      if (e.code === "23505") {
        return res.status(409).json({
          message: "Account already exists",
        });
      }
      console.log(e)
      return res.status(500).send(e);
    }
  }

  export async function updateProfile(
    req: Request,
    res: Response
  ) {
    try{
      const {email, age, phoneNumber, linkedinUrl} = req.body;

      await userService.updateProfile(email, age, phoneNumber, linkedinUrl);

      return res.status(200).json({
        message: "Profile successfully updated",
      });
    } catch (e: any) {
      console.error('Error resetting password:', e);
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
  }


  export default {
    register,
    updateProfile,
  };