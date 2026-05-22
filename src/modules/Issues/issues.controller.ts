import type { JwtPayload } from "jsonwebtoken";
import sendResponse from "../../utility/sendResponse.js";
import { issuesService } from "./issues.service.js";
import type { Request, Response } from "express";

const createIssue = async (req: Request, res: Response) => {
  try {
      const {user_id} = req.user as JwtPayload;
      const result = await issuesService.createIssueIntoDB(req.body, user_id);
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Issue created successfully",
        data: result.rows[0],
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 500,
        success: true,
        message: error.message,
        error: error,
      });
    }
  };
  
  export const issueController = {
    createIssue
  }