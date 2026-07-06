// "use client";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import axios, { isAxiosError } from "axios";
// import { useState } from "react";
// import { signUpSchema } from "@/schemas/signUpSchema";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";

// export default function SignUpPage() {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: { username: "", email: "", password: "" },
//   });

//   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//     try {
//       setIsSubmitting(true);
//       const response = await axios.post("/api/sign-up", data);
//       toast.success(response.data.message);
//       router.replace(`/verify/${data.username}`);
//     } catch (error) {
//       const message = isAxiosError(error)
//         ? error.response?.data?.message
//         : "Something went wrong";
//       toast.error(message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
//       <div className="w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900 p-6">
//         <h1 className="mb-6 text-xl font-semibold text-slate-100">
//           Create your account
//         </h1>

//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <FieldGroup className="gap-4">
//             <Controller
//               name="username"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="username" className="text-slate-300">
//                     Username
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="username"
//                     placeholder="johndoe"
//                     aria-invalid={fieldState.invalid}
//                     className="border-slate-800 bg-slate-950 text-slate-100 focus-visible:border-indigo-500"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} className="text-rose-400" />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="email"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="email" className="text-slate-300">
//                     Email
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     aria-invalid={fieldState.invalid}
//                     className="border-slate-800 bg-slate-950 text-slate-100 focus-visible:border-indigo-500"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} className="text-rose-400" />
//                   )}
//                 </Field>
//               )}
//             />

//             <Controller
//               name="password"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel htmlFor="password" className="text-slate-300">
//                     Password
//                   </FieldLabel>
//                   <Input
//                     {...field}
//                     id="password"
//                     type="password"
//                     placeholder="••••••••"
//                     aria-invalid={fieldState.invalid}
//                     className="border-slate-800 bg-slate-950 text-slate-100 focus-visible:border-indigo-500"
//                   />
//                   {fieldState.invalid && (
//                     <FieldError errors={[fieldState.error]} className="text-rose-400" />
//                   )}
//                 </Field>
//               )}
//             />

//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="mt-1 w-full bg-indigo-600 hover:bg-indigo-500"
//             >
//               {isSubmitting ? "Creating account…" : "Create account"}
//             </Button>
//           </FieldGroup>
//         </form>

//         <p className="mt-4 text-center text-sm text-slate-400">
//           Already have an account?{" "}
//           <a href="/sign-in" className="text-indigo-400 hover:text-indigo-300">
//             Log in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }