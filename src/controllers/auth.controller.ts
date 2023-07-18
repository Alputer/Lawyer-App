import { Request, Response } from 'express';
import { authService, userService, tokenService, mailService} from '../services';

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
      text: `verification code: ${verificationCode}.}`,
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

/*
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  await authService.resetPassword(req.query.token as string, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req: Request, res: Response) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.query.token as string);
  res.status(httpStatus.NO_CONTENT).send();
});
*/

export default {
  login,
  sendVerificationEmail,
  /*
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  */
};
