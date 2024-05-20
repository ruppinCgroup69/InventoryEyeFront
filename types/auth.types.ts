import z from "zod";
import { Post } from "./post.types";
export enum UserType {
  ADMIN,
  NORMAL,
  SUPPLIER,
}

export interface Token {
  userId: string;
}

export interface User {
  userId: number;
  fullName: string;
  imageUrl: string
  userType: UserType;
  posts: Post[];
  email: string;
  password: string;
  addressLatitude: number;
  addressLongtitude: number;
  birthDate: number | null;
  lastSeen: number;
}

const PasswordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).*$/;

export const UserLoginScheme = z.object({
  email: z.string().email("Email must be a valid email address"),
  password: z
    .string()
    .min(6, "Password must be atleast 6 symbols long")
    .regex(PasswordRegex, "1 lower case, 1 upper case, 1 digit required"),
});

export const UserRegisterScheme = z.object({
  fullName: z.string(),
  userType: z.number(),
  email: z.string().email("Email must be a valid email address"),
  password: z
    .string()
    .min(6, "Password must be atleast 6 symbols long")
    .regex(PasswordRegex, "1 lower case, 1 upper case, 1 digit required"),
  addressLatitude: z.number(),
  addressLongtitude: z.number(),
  imageUrl: z.string().optional().default("https://i.ibb.co/1mbj19Q/profile-sacred.png"),
  birthDate: z.number(),
});

export type UserLogin = z.infer<typeof UserLoginScheme>;

export type UserRegister = z.infer<typeof UserRegisterScheme>;
