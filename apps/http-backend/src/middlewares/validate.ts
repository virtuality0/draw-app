import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const Validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        const errorMessages = result.error.errors.map((item) => {
          return {
            message: `${item.path.join(".")} : ${item.message}`,
          };
        });

        res.status(400).json({
          msg: errorMessages,
        });
        return;
      }
      next();
    } catch (err) {
      res.status(500).json({
        msg: `Internal Server Error, please try again later.`,
      });
      return;
    }
  };
};
