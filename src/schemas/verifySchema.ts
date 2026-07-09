
// import {z} from 'zod'
// import { usernameValidation } from "./signUpSchema";
// export const verifySchema=z.object({
//     username: usernameValidation,
//     code:z.string().length(6,'Verification code must be 6 digits')
// })
import { z } from 'zod'
import { usernameValidation } from "./signUpSchema";

// used by sign-up form (has both username & code together, if applicable elsewhere)
export const verifySchema = z.object({
    username: usernameValidation,
    code: z.string().length(6, 'Verification code must be 6 digits')
})

// added: separate schema for the verify-account page, where username
// comes from route params (not a form field) — only "code" is submitted
export const verifyCodeSchema = z.object({
    code: z.string().length(6, 'Verification code must be 6 digits')
})