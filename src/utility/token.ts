import jwt, { type JwtPayload } from "jsonwebtoken";
interface jwtPayload {
  user_id: number;
  email: string;
  name: string;
  role: string;
}

export const createToken = (
  jawPayload: jwtPayload,
  secret: string,
  expiresIn: `${number}${"d"}`
) => {
  jwt.sign(jawPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  jwt.verify(token, secret) as jwtPayload;
};
