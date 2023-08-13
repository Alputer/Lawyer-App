import bcrypt from "bcrypt";
import Lawyer from "../models/lawyer.model";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (credentials: {
  email: string;
  password: string;
}): Promise<boolean> => {
  const lawyer = await Lawyer.findOne({
    attributes: ["password_hash"],
    where: { email: credentials.email },
  });

  if (!lawyer) {
    return false;
  }

  const isMatch = await bcrypt.compare(
    credentials.password,
    lawyer.password_hash
  );
  return isMatch;
};

export const changePassword = async (
  email: string,
  newPassword: string
): Promise<void> => {
  const hashedPassword = await hashPassword(newPassword);

  await Lawyer.update({ password_hash: hashedPassword }, { where: { email } });
};

export const saveVerificationCode = async (input: {
  email: string;
  verificationCode: string;
}): Promise<void> => {
  await Lawyer.update(
    { verification_code: input.verificationCode },
    { where: { email: input.email } }
  );
};

export const checkVerificationCode = async (
  email: string,
  verificationCode: string
): Promise<boolean> => {
  const lawyer = await Lawyer.findOne({
    attributes: ["verification_code"],
    where: { email },
  });

  if (!lawyer) {
    return false;
  }

  return lawyer.verification_code === verificationCode;
};

export const makeUserVerified = async (email: string): Promise<void> => {
  await Lawyer.update({ is_validated: true }, { where: { email } });
};

export const isValidated = async (email: string): Promise<boolean> => {
  const lawyer = await Lawyer.findOne({
    attributes: ["is_validated"],
    where: { email },
  });

  if (!lawyer) {
    return false;
  }

  return lawyer.is_validated;
};
