import type { NextFunction, Request, Response } from "express";
import type { userRoles } from "../modules/auth/auth.interface.js";
declare const auth: (...roles: (keyof typeof userRoles)[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default auth;
//# sourceMappingURL=auth.d.ts.map