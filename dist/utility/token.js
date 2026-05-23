import jwt, {} from "jsonwebtoken";
export const createToken = (jawPayload, secret, expiresIn) => {
    jwt.sign(jawPayload, secret, {
        expiresIn,
    });
};
export const verifyToken = (token, secret) => {
    jwt.verify(token, secret);
};
//# sourceMappingURL=token.js.map