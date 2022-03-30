import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (
  handler: (req: NextApiRequest, res: NextApiResponse, user: User) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { LISTENFY_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, "hello") as User;
        user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          throw new Error("Not a real user");
        }
      } catch (error) {
        res.status(401).json({ error: "Not Authorized" });
        return;
      }

      return handler(req, res, user);
    }
    res.status(401).json({ error: "Not Authorized" });
  };
};

export const validateToken = (token: string) => {
  const user = jwt.verify(token, "hello") as User;
  return user;
};
