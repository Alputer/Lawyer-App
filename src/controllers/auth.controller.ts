import { Request, Response } from "express";
import {
  authService,
  tokenService,
  mailService,
  userService,
} from "../services";

const { v4: uuidv4 } = require("uuid");

export async function login(req: Request, res: Response) {
  const body = req.body;

  try {
    const lawyer = await userService.getUser(body.email);

    const isMatch = await authService.comparePasswords({
      password_hash: lawyer.password_hash,
      password: body.password,
    });

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (!lawyer.is_validated) {
      return res
        .status(403)
        .json({ message: "Account not validated. Please verify your email." });
    }

    const { accessToken, refreshToken } = tokenService.generateLoginTokens({
      id: lawyer._id,
      email: body.email,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    return res
      .status(200)
      .json({ message: "Login successful.", accessToken: accessToken });
  } catch (e: any) {
    console.log(e);
    return res.status(500).send(e);
  }
}

export async function sendVerificationEmail(req: Request, res: Response) {
  const body = req.body;
  try {
    const verificationCode = uuidv4();

    const mailOptions = {
      from: "alp.tuna.453@gmail.com",
      to: body.email,
      subject: "Verify your email",
      text: `verification code: ${verificationCode}`,
    };

    await authService.saveVerificationCode({
      email: body.email,
      verificationCode: verificationCode,
    });

    await mailService.sendEmail(mailOptions);

    return res.status(200).json({
      message: "Verification code has been sent successfully",
    });
  } catch (e: any) {
    console.log(e);
    return res.status(500).send(e);
  }
}

export async function verifyEmail(req: Request, res: Response) {
  const { email, verificationCode } = req.body;

  try {
    const isVerificationCodeCorrect = await authService.checkVerificationCode(
      email,
      verificationCode
    );

    if (isVerificationCodeCorrect) {
      await authService.makeUserVerified(email);
      return res.status(200).json({ message: "Email verified successfully" });
    } else {
      return res.status(401).json({ error: "Invalid verification code." });
    }
  } catch (err) {
    console.error("Error verifying email:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    if (req.cookies?.refreshToken) {
      // Destructuring refreshToken from cookie
      const refreshToken = req.cookies.refreshToken;

      // Verifying refresh token
      const { decoded } = tokenService.verifyJwt(
        refreshToken,
        "refreshTokenPrivateKey"
      );

      if (!decoded) {
        // Wrong Refresh Token
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      const accessToken = tokenService.signJwt(
        { id: decoded.id, email: decoded.email },
        "accessTokenPrivateKey"
      );

      return res.status(200).json({ accessToken });
    } else {
      return res.status(400).json({ message: "No refresh token in cookie" });
    }
  } catch (error) {
    console.error("Error while getting access token:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export async function updatePassword(req: Request, res: Response) {
  try {
    const email = res.locals.user.email;
    const { newPassword } = req.body;

    await authService.changePassword(email, newPassword);

    res.status(200).json({ message: "Password update successful." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;

    // Generate a password reset token and save it in the database
    const resetToken = await tokenService.generateAndSaveResetToken(email);

    // Send the reset token to the user's email address
    const mailOptions = {
      from: "alp.tuna.453@gmail.com",
      to: email,
      subject: "Verify your email",
      text: `Reset Token: ${resetToken}`,
    };

    await mailService.sendEmail(mailOptions);

    res.status(200).json({
      message: "Password reset token sent to the email address.",
      resetToken: resetToken,
    });
  } catch (error) {
    console.error("Error sending reset token:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { email, newPassword, resetToken } = req.body;

    // Check if the reset token matches the one saved in the database for the user
    const actualResetToken = await tokenService.getResetToken(email);
    if (actualResetToken !== resetToken) {
      res.status(401).json({ error: "Invalid reset token." });
      return;
    }

    // Update the user's password
    await authService.changePassword(email, newPassword);

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "An internal server error occurred." });
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
