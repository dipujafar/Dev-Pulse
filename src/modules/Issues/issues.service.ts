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

const getSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
  SELECT * FROM issues WHERE id=$1
`,
    [id]
  );
  return result;
};

const updateIssueIntoDB = async (
  payload: IIssues,
  id: string,
  userId: string
) => {
  const issuesData = await pool.query(
    `
    SELECT * FROM issues WHERE id=$1
  `,
    [id]
  );

  if (issuesData.rows.length === 0) {
    throw Error(`The issue doest not exits`);
  }
  const issue = issuesData.rows[0];

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [userId]
  );
  const user = userData.rows[0];

  if (user.role === "contributor" && user.id !== issue.reporter_id) {
    throw Error("ou are not authorized to update this issue");
  }
  if (user.role === "contributor" && issue.status !== "open") {
    throw Error("You can not update this issue on this stage");
  }

  const { title, description, type } = payload;
  const result = await pool.query(
    `
  UPDATE issues SET 
  title=COALESCE($1,title),
  description=COALESCE($2,description),
  type=COALESCE($3,type)

  WHERE id=$4 RETURNING *
  `,
    [title, description, type,id]
  );

  return result.rows[0];
};

const deleteIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
  DELETE FROM issues WHERE id=$1
  `,
    [id]
  );
  if (result.rowCount === 0) {
    throw Error("This issue does not exits");
  }
  return result;
};

export const issuesService = {
  createIssueIntoDB,
  getSingleIssueFromDB,
  deleteIssueFromDB,
};
