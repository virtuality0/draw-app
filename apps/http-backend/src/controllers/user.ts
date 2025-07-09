import { Request, Response, CookieOptions } from "express";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getJWTSecret } from "@repo/backend-common/config";

const signUp = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  // If a user with the provided email already exisits
  if (user !== null) {
    res.status(400).json({
      msg: "User with this email already exists.",
    });
    return;
  }

  // hash the password before storing it in db
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
      modifiedAt: new Date().toISOString(),
      photo: "",
    },
  });

  res.status(201).json({
    msg: "User created successfully",
    id: newUser.id,
  });
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  // If a user with the provided email already exisits
  if (user === null) {
    res.status(401).json({
      msg: "Email or password incorrect.",
    });
    return;
  }

  // Hash the password to compare them
  const isPasswordCorrect = bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    res.status(401).json({
      msg: "Email or password incorrect.",
    });
    return;
  }

  // Signing JWT token for user
  const token = jwt.sign(
    {
      userId: user.id,
    },
    getJWTSecret(),
    { expiresIn: "24h" },
  );

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  };

  // Sending token via cookies
  res.cookie("Authorization", token, cookieOptions);

  res.status(200).json({
    msg: "Signed in successfully",
  });
};

export { signUp, signIn };
