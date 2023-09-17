import bcrypt from "bcrypt";
import { Lawyer } from "../models/lawyer.model";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (credentials: {
  password_hash: string;
  password: string;
}): Promise<boolean> => {
  return await bcrypt.compare(credentials.password, credentials.password_hash);
};

export const changePassword = async (
  email: string,
  newPassword: string
): Promise<void> => {
  const hashedPassword = await hashPassword(newPassword);

  await Lawyer.updateOne({ email: email }, { password_hash: hashedPassword });
};

export const saveVerificationCode = async (input: {
  email: string;
  verificationCode: string;
}): Promise<void> => {
  await Lawyer.updateOne(
    { email: input.email },
    { verification_code: input.verificationCode }
  );
};

export const checkVerificationCode = async (
  email: string,
  verificationCode: string
): Promise<boolean> => {
  const lawyer = await Lawyer.findOne({ email: email }, "verification_code");

  if (!lawyer) {
    return false;
  }

  return lawyer.verification_code === verificationCode;
};

export const makeUserVerified = async (email: string): Promise<void> => {
  await Lawyer.updateOne({ email: email }, { is_validated: true });
};

export const isValidated = async (email: string): Promise<boolean> => {
  const lawyer = await Lawyer.findOne({ email: email }, "is_validated");

  if (!lawyer) {
    return false;
  }

  return lawyer.is_validated;
};
