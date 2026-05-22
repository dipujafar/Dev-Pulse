import { Router } from "express";
import { issueController } from "./issues.controller.js";
import auth from "../../middleware/auth.js";
import { userRoles } from "../auth/auth.interface.js";

const router = Router();

router.post("/", auth(userRoles.contributor,userRoles.maintainer) ,issueController.createIssue);

export const issuesRoute = router;
