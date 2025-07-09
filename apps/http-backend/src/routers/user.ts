import { Router } from "express";
import { signIn, signUp } from "../controllers/user";
import { Validate } from "../middlewares/validate";
import { CreateUserSchema, SignInUserSchema } from "@repo/common/types";

const userRouter: Router = Router();

userRouter.post("/signup", Validate(CreateUserSchema), signUp);
userRouter.post("/signin", Validate(SignInUserSchema), signIn);

export { userRouter };
