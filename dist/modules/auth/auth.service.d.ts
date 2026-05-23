import type { IUser } from "./auth.interface.js";
export declare const authService: {
    createUserIntoDB: (payload: IUser) => Promise<import("pg").QueryResult<any>>;
    loginUserFormDB: (payload: IUser) => Promise<{
        data: {
            token: void;
            user: any;
        };
        refreshToken: void;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map