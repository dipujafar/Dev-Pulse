import { pool } from "../../db/index.js";
import type { IIssues } from "./issues.interface.js";


const createIssueIntoDB = async (payload: IIssues, userId: string) => {
  const { title, description, type } = payload;
  const result = await pool.query(
    `
    INSERT INTO issues(title, description, type, reporter_id) VALUES($1,$2,$3,$4) RETURNING *
  `,
    [title, description, type, userId]
  );
  return result;
};

export const issuesService = {
  createIssueIntoDB
}