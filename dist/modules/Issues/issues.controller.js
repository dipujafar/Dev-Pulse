import sendResponse from "../../utility/sendResponse.js";
import { issuesService } from "./issues.service.js";
const createIssue = async (req, res) => {
    try {
        const { user_id } = req.user;
        const result = await issuesService.createIssueIntoDB(req.body, user_id);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully",
            data: result,
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: true,
            message: error.message,
            error: error,
        });
    }
};
const getAllIssues = async (req, res) => {
    try {
        const result = await issuesService.getAllIssuesFromDB(req.query);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issues retrived successfully",
            data: result,
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: true,
            message: error.message,
            error: error,
        });
    }
};
const getSingleIssue = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await issuesService.getSingleIssueFromDB(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue retrived successfully",
            data: result,
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: true,
            message: error.message,
            error: error,
        });
    }
};
const updateIssue = async (req, res) => {
    const { user_id } = req.user;
    const { id } = req.params;
    try {
        const result = await issuesService.updateIssueIntoDB(req.body, id, user_id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue updated successfully",
            data: result,
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: true,
            message: error.message,
            error: error,
        });
    }
};
const deleteIssue = async (req, res) => {
    const { id } = req.params;
    try {
        await issuesService.deleteIssueFromDB(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue deleted successfully",
        });
    }
    catch (error) {
        sendResponse(res, {
            statusCode: 500,
            success: true,
            message: error.message,
            error: error,
        });
    }
};
export const issueController = {
    createIssue,
    getAllIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue
};
//# sourceMappingURL=issues.controller.js.map