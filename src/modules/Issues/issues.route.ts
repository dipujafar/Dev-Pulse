import { Router } from "express";
import { issueController } from "./issues.controller.js";
import auth from "../../middleware/auth.js";
import { userRoles } from "../auth/auth.interface.js";

const router = Router();

router.post("/", auth(userRoles.contributor,userRoles.maintainer) ,issueController.createIssue);
router.get("/",issueController.getAllIssues);
router.get("/:id",issueController.getSingleIssue);
router.patch("/:id",auth(userRoles.contributor,userRoles.maintainer),issueController.updateIssue);
router.delete("/:id",issueController.deleteIssue)

export const issuesRoute = router;
