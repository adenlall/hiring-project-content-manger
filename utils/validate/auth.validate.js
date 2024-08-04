import { z } from "zod";
import PasswordCheck from "../password.js";

const register = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      }).min(5).max(20),
    bio: z
      .string().max(100).nullable(),
    email: z
      .string({
        required_error: "Email is required",
      }).email("Not a valid email"),
    password: z.string({
      required_error: "Password is required",
    }),
    confirm: z.string({
      required_error: "Password Confirmation is required",
    }),
  }).superRefine(PasswordCheck).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  }),
});

const login = z.object({
  body: z.object({
    email: z.string({
      required_error: "email is required!"
    }),
    password: z.string({
      required_error: "password is required!"
    }),
  }).superRefine(PasswordCheck),
});

const logout = z.object({
  body: z.object({
    refreshToken: z.string({
      required_error: "refreshToken is required!"
    }),
  }),
});

const refreshTokens = z.object({
  body: z.object({
    refreshToken: z.string({
      required_error: "refreshToken is required!"
    }),
  }),
});

const resetPassword = z.object({
  query: z.object({
    token: z.string({
      required_error: ":  is required!"
    }),
  }),
  body: z.object({
    password: z.string({
      required_error: "password is required!"
    }).superRefine(PasswordCheck),
  }),
});


export {
  register,
  login,
  logout,
  refreshTokens,
  resetPassword,
};
