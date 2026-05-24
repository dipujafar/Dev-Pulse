import { pool } from "../../db/index.js";
import type { IIssues, IQuery } from "./issues.interface.js";

const createIssueIntoDB = async (payload: IIssues, userId: string) => {
  const { title, description, type } = payload;
  const result = await pool.query(
    `
    INSERT INTO issues(title, description, type, reporter_id) VALUES($1,$2,$3,$4) RETURNING *
  `,
    [title, description, type, userId]
  );
  return result.rows[0];
};

const getAllIssuesFromDB = async (query: IQuery) => {
  const { sort = "newest", type, status } = query;

  const queriesData: string[] = [];
  const queryValues: string[] = [];

  if (type) {
    queryValues.push(type);
    queriesData.push(`type = $${queryValues.length}`);
  }

  if (status) {
    queryValues.push(status);
    queriesData.push(`status = $${queryValues.length}`);
  }

  const where = queriesData.length ? `WHERE ${queriesData.join(" AND ")}` : "";
  const orderBy = sort === "oldest" ? "ASC" : "DESC";

  const issuesData = await pool.query(
    `SELECT * FROM issues
     ${where}
     ORDER BY created_at ${orderBy}`,
    queryValues
  );

  const issues = issuesData.rows;

  if (issues.length === 0) {
    return [];
  }

  const reportersId = [...new Set(issues.map((i) => i.reporter_id))];

  const reportersResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = ANY($1)`,
    [reportersId]
  );

  const reporterMap: Record<number, unknown> = {};
  for (const reporter of reportersResult.rows) {
    reporterMap[reporter.id] = reporter;
  }

  return issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: reporterMap[issue.reporter_id] ?? null,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));
};

const getSingleIssueFromDB = async (id: string) => {
  const issueData = await pool.query(
    `
  SELECT * FROM issues WHERE id=$1
`,
    [id]
  );

  if (issueData.rows.length === 0) {
    throw Error("Invalid issue id");
  }

  const issue = issueData.rows[0];
  const userData = await pool.query(
    `SELECT id, name, role FROM users WHERE id=$1`,
    [issue.reporter_id]
  );
  const user = userData.rows[0];
  delete issue.reporter_id;
  const result = {
    ...issue,
    reporter: { id: user.id, name: user.name, role: user.role },
  };

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
    [title, description, type, id]
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
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
  deleteIssueFromDB,
};
