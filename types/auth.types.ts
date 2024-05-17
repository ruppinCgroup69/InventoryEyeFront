
import z from 'zod'
export enum UserType {
    ADMIN,
    NORMAL,
    SUPPLIER
}

export interface Token {
    userId: string
}

export interface User {
    userId: number;
    fullName: string;
    userType: UserType;
    email: string;
    password: string;
    addressLatitude: number;
    addressLongtitude: number;
    birthDate: number | null;
    lastSeen: number;
}


const PasswordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[a-z]).*$/

export const UserLoginScheme = z.object({
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(6, "Password must be atleast 6 symbols long")
                        .regex(PasswordRegex, "Password must contain atleast 1 lower case, 1 upper case and 1 digit"),
})


export const UserRegisterScheme = z.object({
    fullName: z.string(),
    userType: z.number(),
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(6, "Password must be atleast 6 symbols long")
                        .regex(PasswordRegex, "Password must contain atleast 1 lower case, 1 upper case and 1 digit"),
    addressLatitude: z.number(),
    addressLongtitude: z.number(),
    birthDate:  z.number(),
})

export type UserLogin =  z.infer<typeof UserLoginScheme>

export type UserRegister = z.infer<typeof UserRegisterScheme> 

