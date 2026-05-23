import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.join(process.cwd(), ".env"),
});
const config = {
    connection_string: process.env.CONNECTIONSTRING,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN,
    accessTokenExpired: process.env.ACCESS_TOKEN_EXPIRED,
    refreshTokenExpired: process.env.REFRESH_TOKEN_EXPIRED,
};
export default config;
//# sourceMappingURL=index.js.map