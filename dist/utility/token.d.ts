interface jwtPayload {
    user_id: number;
    email: string;
    name: string;
    role: string;
}
export declare const createToken: (jawPayload: jwtPayload, secret: string, expiresIn: `${number}${"d"}`) => void;
export declare const verifyToken: (token: string, secret: string) => void;
export {};
//# sourceMappingURL=token.d.ts.map