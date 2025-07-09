import { z } from "zod";

const CreateUserSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Firstname should have min 1 character and max 50." })
    .max(50, {
      message: "Firstname should have min 1 character and max 50.",
    }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Lastname should have min 1 character and max 50." })
    .max(50, { message: "Lastname should have min 1 character and max 50." }),
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      "Password must be atleast 8 character long and contain atleast 1 number, 1 letter and one special character",
    ),
});

const SignInUserSchema = z.object({
  email: z.string().trim().email({ message: "Please provide a valid email" }),
  password: z.string().trim(),
});

export { CreateUserSchema, SignInUserSchema };
