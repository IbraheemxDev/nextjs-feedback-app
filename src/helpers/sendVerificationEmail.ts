// import { resend } from "@/lib/resend";
// import { ApiResponse } from "@/types/ApiResponse";
// import VerificationEmail from "../../emails/VerificationEmail";

// export async function sendVerificationEmail(
//     email:string,
//     username:string,
//     verifyCode:string
// ):Promise<ApiResponse>{
//     try {
//         await resend.emails.send({
//              from: 'onboarding@resend.dev',
//              to: email,
//              subject: 'True Feedback Verification Code',
//              react:  VerificationEmail({username,otp:verifyCode}),
//         });

//          return {
//             success:true,
//             message:' verificaton email send successfully'
//         }
//     } catch (emailError) {
//         console.error("Error sending verification email",emailError)
//         return {
//             success:false,
//             message:'failed to send email verificaton'
//         }
//     }
// }



import { transporter } from "@/utils/nodemailer";
import VerificationEmail from "../../emails/VerificationEmail"
import { render } from "@react-email/render";
import { ApiResponse } from "@/utils/ApiResponse";

// Send email verification OTP
export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse<null>> {
  try {
    const html = await render(
      VerificationEmail({
        username,
        otp: verifyCode,
      })
    );

    await transporter.sendMail({
      from: `"MysteryMessage" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html,
    });
const info = await transporter.sendMail({
  from: `"MysteryMessage" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Verify Your Email",
  html,
});

console.log("Email sent:", info);
    return new ApiResponse(
      200,
      "Verification email sent successfully"
    );
  } catch (error) {
    console.error(error);

    throw new ApiResponse(
      500,
      "Failed to send verification email"
    );
  }
}