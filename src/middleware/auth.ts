import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import { pool } from "../db/index.js";
import type { userRoles } from "../modules/auth/auth.interface.js";


const auth = (...roles: (keyof typeof userRoles)[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!!",
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.jwtSecret as string
      ) as JwtPayload;

      const userData = await pool.query(
        `
    SELECT * FROM users WHERE email=$1
    `,
        [decoded.email]
      );

      const user = userData.rows[0];

      if (userData.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User is not found",
        });
      }


      console.log(roles);
      if (!roles.length && !roles.includes(user?.role)) {
        return res.status(403).json({
          success: false,
          message: "Access Denied",
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
