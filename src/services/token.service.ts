import jwt from "jsonwebtoken";
import config from "config";
import { LoginInput } from "../schemas/auth.schemas";
import { query } from "../utils/db";
const crypto = require("crypto");

export function generateLoginTokens(payload: LoginInput): {
  accessToken: string;
  refreshToken: string;
} {
  const accessTokenExpiresIn = config.get<string>("accessTokenExpiresIn");
  const refreshTokenExpiresIn = config.get<string>("refreshTokenExpiresIn");

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: accessTokenExpiresIn,
  });
  const refreshToken = signJwt(payload, "refreshTokenPrivateKey", {
    expiresIn: refreshTokenExpiresIn,
  });

  return { accessToken: accessToken, refreshToken: refreshToken };
}

export async function generateAndSaveResetToken(email: string) {
  const tokenLength = 24;
  const resetToken = crypto.randomBytes(tokenLength).toString("hex");
  await query("UPDATE Lawyers SET reset_token = $1 WHERE email = $2", [
    resetToken,
    email,
  ]);
  return resetToken;
}

export const getResetToken = async (email: string): Promise<void> => {
  const queryResult = await query(
    "SELECT reset_token FROM Lawyers WHERE email = $1",
    [email]
  );
  return queryResult.rows[0].reset_token;
};
export const deleteResetToken = async (email: string): Promise<void> => {
  await query("UPDATE Lawyers SET reset_token = NULL WHERE email = $1", [
    email,
  ]);
  return;
};

export function signJwt(
  object: Object, // our payload
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  return jwt.sign(object, signingKey, {
    ...(options && options),
  });
}

export function verifyJwt(
  token: string,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey"
) {
  const privateKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  try {
    const decoded = jwt.verify(token, privateKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
