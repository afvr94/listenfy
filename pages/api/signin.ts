import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      "hello",
      { expiresIn: "8h" }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("LISTENFY_ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
    res.json(user);
    return;
  }

  res.status(401).json({ error: "Email or password is wrong" });
};
