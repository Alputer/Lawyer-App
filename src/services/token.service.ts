import jwt from "jsonwebtoken";
import config from "config";
import {LoginInput} from "../schemas/auth.schemas";
  
  export function generateLoginTokens(payload: LoginInput): { accessToken: string; refreshToken: string } {
  
      const accessTokenExpiresIn = config.get<string>("accessTokenExpiresIn");
      const refreshTokenExpiresIn = config.get<string>("refreshTokenExpiresIn");

      const accessToken = signJwt(payload, "accessTokenPrivateKey", { expiresIn: accessTokenExpiresIn });
      const refreshToken = signJwt(payload, "refreshTokenPrivateKey", { expiresIn: refreshTokenExpiresIn });

      return {accessToken: accessToken, refreshToken: refreshToken}; 

  }

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
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii"
  );

  try {
    const decoded = jwt.verify(token, publicKey);
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