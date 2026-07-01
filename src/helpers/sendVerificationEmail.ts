import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try {
        
         return {
            success:false,
            message:'failed to send email verificaton'
        }
    } catch (emailError) {
        console.error("Error sending verification email"emailError)
        return {
            success:false,
            message:'failed to send email verificaton'
        }
    }
}