import config from "../../config/index.js";
import { pool } from "../../db/index.js";
import { createToken } from "../../utility/token.js";
import type { IUser } from "./auth.interface.js";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const hasPassword = bcrypt.hash(password, 10);

  const result = await pool.query(
    `
        INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4,COALESCE($5,'contributor')) RETURNING *
        `,
    [name, email, hasPassword, role]
  );

  delete result.rows[0].password;
  return result;
};

const loginUserFormDB = async (payload: IUser) => {
  const { email, password } = payload;

  const userData = await pool.query(
    `
  SELECT * FROM users WHERE email=$1
  `,
    [email]
  );

  if (userData.rows.length === 0) {
    throw new Error("User not found");
  }

  const user = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Password does not match");
  }

  const jwtPayload = {
    user_id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  const token = createToken(
    jwtPayload,
    config.jwtSecret as string,
    config.accessTokenExpired as `${number}d`
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwtRefreshSecret as string,
    config.refreshTokenExpired as `${number}d`
  );
  delete user.password;
  const data = {
    token,
    user,
  };

  return { data, refreshToken };
};

export const authService = {
  createUserIntoDB,
  loginUserFormDB,
};
