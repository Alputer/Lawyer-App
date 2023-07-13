import jwt from "jsonwebtoken";
import config from "config";
import { access } from "fs";
import log from "./logger";

interface RegistrationTokenPayload {
    email: string;
  }
  
  export function generateRegistrationTokens(payload: RegistrationTokenPayload): object {
    const accessTokenPrivateKey = config.get<string>("accessTokenPrivateKey")
    const refreshTokenPrivateKey = config.get<string>("refreshTokenPrivateKey")

    const expiresIn = config.get<string>("registrationTokenExpiration");
    log.info('entered here');
    const accessToken = jwt.sign(payload, accessTokenPrivateKey, { expiresIn });
    const refreshToken = jwt.sign(payload, refreshTokenPrivateKey, { expiresIn });
    log.info('accessToken: ', accessToken);
    return {accessToken, refreshToken};
  }

export function signJwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    "base64"
  ).toString("ascii");

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
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