import jwt, {} from "jsonwebtoken";
import config from "../config/index.js";
import { pool } from "../db/index.js";
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access!!",
                });
            }
            const decoded = jwt.verify(token, config.jwtSecret);
            const userData = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [decoded.email]);
            const user = userData.rows[0];
            if (userData.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User is not found",
                });
            }
            if (roles.length && roles.includes(user?.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Access Denied",
                });
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default auth;
//# sourceMappingURL=auth.js.map