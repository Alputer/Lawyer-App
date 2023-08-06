import { Request, Response } from 'express';
import { authService, userService, tokenService, mailService} from '../services';
import { query } from '../utils/db';

const { v4: uuidv4 } = require('uuid');


export async function login(
  req: Request,
  res: Response
){

  const body = req.body

  try {

    const isMatch = await authService.comparePasswords({email: body.email, password: body.password});

    if(!isMatch){

      return res.status(401).json({ message: 'Invalid credentials.' });

    }   

    const isVerified = await authService.isValidated(body.email)

    if(!isVerified) {
      res.status(403).json({ message: 'Account not validated. Please verify your email.' });
      return;
    }
  
    const {accessToken, refreshToken} = tokenService.generateLoginTokens({email: body.email})  

    res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
  });
    
    return res.status(200).json({message: 'Login successful.', accessToken: accessToken})

  }

  catch (e: any) {
    console.log(e)
    return res.status(500).send(e);
  }
}


export async function sendVerificationEmail(
  req: Request,
  res: Response
) {

  const body = req.body
  try {

    const verificationCode = uuidv4()

    const mailOptions = {
      from: 'alp.tuna.453@gmail.com',
      to: body.email,
      subject: "Verify your email",
      text: `verification code: ${verificationCode}`,
    };
    
    await authService.saveVerificationCode({email: body.email, verificationCode: verificationCode});

    await mailService.sendEmail(mailOptions);

  
    return res.status(200).json({
      message: "Verification code has been sent successfully",
    });
  }
  catch (e: any) {
    console.log(e)
    return res.status(500).send(e);
  }
}

export async function verifyEmail(
  req: Request,
  res: Response
)  {
  const { email, verificationCode } = req.body;

  try {

    const isVerificationCodeCorrect = await authService.checkVerificationCode(email, verificationCode);
    
    if(isVerificationCodeCorrect){

      await authService.makeUserVerified(email);
      return res.status(200).json({ message: 'Email verified successfully' });

    }
    else {
      return res.status(400).json({ error: 'Invalid email or verification code.' });
    }
      
    } 
    catch (err) {
      console.error('Error verifying email:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function refreshToken(
  req: Request,
  res: Response
)  {
  try{
    if (req.cookies?.refreshToken) {
  
      // Destructuring refreshToken from cookie
      const refreshToken = req.cookies.refreshToken;
      console.log("refreshToken: ", refreshToken);
      // Verifying refresh token
      const {decoded} = tokenService.verifyJwt(refreshToken, "refreshTokenPrivateKey");
  
      if(!decoded){
          // Wrong Refresh Token
          return res.status(406).json({ message: 'Unauthorized' });
      }
  
      const accessToken = tokenService.signJwt(req.body.email, "accessTokenPrivateKey");
  
      return res.status(200).json({ accessToken });
  
  } else {
      return res.status(406).json({ message: 'Unauthorized' });
  }

  } catch (error) {
    console.error('Error while getting access token:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }

}

export async function updatePassword(
  req: Request,
  res: Response
)  {
  try {
    const { email, newPassword } = req.body;

    await authService.changePassword(email, newPassword);

    res.status(200).json({ message: 'Password update successful.' });

  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}

export async function forgotPassword(
  req: Request,
  res: Response
)  {
  try {
    const { email } = req.body;

    // Generate a password reset token and save it in the database
    const resetToken = await tokenService.generateAndSaveResetToken(email);

    // Send the reset token to the user's email address
    const mailOptions = {
      from: 'alp.tuna.453@gmail.com',
      to: email,
      subject: "Verify your email",
      text: `Reset Token: ${resetToken}`,
    };

    await mailService.sendEmail(mailOptions);

    res.status(200).json({ message: 'Password reset token sent to the email address.' });
  } catch (error) {

    console.error('Error sending reset token:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });

  }
}

export async function resetPassword(
  req: Request,
  res: Response
)  {

  try {
    const { email, newPassword, resetToken } = req.body;

    // Check if the reset token matches the one saved in the database for the user
    const actualResetToken = await tokenService.getResetToken(email);
    if (actualResetToken !== resetToken) {
      res.status(401).json({ error: 'Invalid reset token.' });
      return;
    }

    // Update the user's password and clear the reset token fields in the database
    await authService.changePassword(email, newPassword);
    await tokenService.deleteResetToken(email);


    res.status(200).json({ message: 'Password reset successful.' });

  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }

}


export default {
  login,
  sendVerificationEmail,
  verifyEmail,
  refreshToken,
  updatePassword,
  forgotPassword,
  resetPassword,
};
