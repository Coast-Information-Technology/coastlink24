import { z } from "zod";

// Sign-Up Form Schema
export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    phoneNumber: z
      .string()
      .length(11, "Phone number must be exactly 11 digits"), // More concise validation
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Login Form Schema
export const LoginFormSchema = z.object({
  phone: z.string().length(11, "Phone number must be exactly 11 digits"), // Reused same concise validation
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Type for FormState
export type FormState =
  | {
      errors?: Record<string, string[]>; // Optimized error type using Record for dynamic fields
      message?: string;
    }
  | undefined;
