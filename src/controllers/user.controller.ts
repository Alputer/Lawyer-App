import { Request, Response } from 'express';
import { authService, userService, barService, mailService} from '../services';

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

  export async function rateLawyer(
    req: Request,
    res: Response
  ) {
    try{
      const {rater_email, rated_email, rating} = req.body;

      if(rater_email === rated_email){
        return res.status(400).json({
          message: "Lawyer cannot rate himself",
        })
      }

      await userService.rateLawyer(rater_email, rated_email, rating);

      return res.status(200).json({
        message: "Lawyer is successfully rated",
      });

    } catch (e: any) {
      
      if (e.code === "23505") {
        return res.status(400).json({
          message: "Lawyer already rated this lawyer",
        });
      }

      console.error('Error rating lawyer:', e);
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
  }

  export async function getAvailableLawyers(
    req: Request,
    res: Response
  ) {
  
    try {
        
        const {barId} = req.params

        const barExists = await barService.barExists(barId);
        if(!barExists){
          return res.status(404).json({ error: `Bar with id '${barId}' could not found` });
        }

        const available_lawyers = await userService.getAvailableLawyers(barId);
        
        return res.status(200).json({available_lawyers: available_lawyers});

    } catch (e: any) {
        console.error('Error getting available lawyers in the bar:', e);
        res.status(500).json({ error: 'An internal server error occurred.' });
      }
    }

    export async function getUserProfile(
      req: Request,
      res: Response
    ) {
    
      try {
          
          const {userEmail} = req.params

          const userExists = await userService.userExists(userEmail);
          if(!userExists){
            return res.status(404).json({ error: 'User not found' });
          }

          const user_profile = await userService.getUserProfile(userEmail);
            
          return res.status(200).json({user_profile: user_profile});
  
      } catch (e: any) {
          console.error('Error getting user profile:', e);
          res.status(500).json({ error: 'An internal server error occurred.' });
        }
      }

      export async function getCityOfTheUser(
        req: Request,
        res: Response
      ) {
      
        try {
            
          const userEmail = res.locals.user.email;
  
            const userExists = await userService.userExists(userEmail);
            if(!userExists){
              return res.status(404).json({ error: 'User not found' });
            }
  
            const user_location = await userService.getUserLocation(userEmail);
            if(!user_location){
              return res.status(404).json({ error: 'User has no registered city' });
            }

            return res.status(200).json({user_location: user_location});
    
        } catch (e: any) {
            console.error("Error getting user's city", e);
            res.status(500).json({ error: 'An internal server error occurred.' });
          }
        }


  export default {
    register,
    updateProfile,
    rateLawyer,
    getAvailableLawyers,
    getUserProfile,
    getCityOfTheUser,
  };