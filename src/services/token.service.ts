import jwt from "jsonwebtoken";
import config from "config";
import { LoginInput } from "../schemas/auth.schemas";
import Lawyer from "../models/lawyer.model";
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

  const [updatedRowsCount] = await Lawyer.update(
    { reset_token: resetToken },
    {
      where: {
        email: email,
      },
    }
  );

  if (updatedRowsCount === 0) {
    throw new Error("User not found");
  }

  return resetToken;
}

export async function getResetToken(email: string): Promise<string | null> {
  const user = await Lawyer.findOne({
    where: {
      email: email,
    },
    attributes: ["reset_token"],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.reset_token;
}

export async function deleteResetToken(email: string): Promise<void> {
  const [updatedRowsCount] = await Lawyer.update(
    { reset_token: null },
    {
      where: {
        email: email,
      },
    }
  );

  if (updatedRowsCount === 0) {
    throw new Error("User not found");
  }
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
