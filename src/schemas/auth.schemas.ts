import { object, string} from "zod";

  const loginSchema = object({
    body: object({
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
      password: string({
        required_error: "Password is required",
      }),
    })
  });

  const sendVerificationEmailSchema = object({
    body: object({
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
    })
  });

  const verifyEmailSchema = object({
    body: object({
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
      verificationCode: string({
        required_error: "Verification Code is required",
      }),
    })
  });

  const refreshTokenSchema = object({
    body: object({
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
    })
  });

  const updatePasswordSchema = object({
    body: object({
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
      newPassword: string({
        required_error: "New password is required",
      }),
    })
  });

  const forgotPasswordSchema = object({
    body: object({
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
    })
  });

  const resetPasswordSchema = object({
    body: object({
      email: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
      newPassword: string({
        required_error: "New password is required",
      }),
      resetToken: string({
        required_error: "Reset token is required",
      }),
    })
  });

export type LoginInput = {
  email: string;
};

export type SaveVerificationCodeInput = {
  email: string;
  verificationCode: string;
};

export default {loginSchema, sendVerificationEmailSchema, refreshTokenSchema, updatePasswordSchema, forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema};