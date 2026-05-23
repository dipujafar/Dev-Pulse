export declare const userRoles: {
    readonly contributor: "contributor";
    readonly maintainer: "maintainer";
};
export interface IUser {
    name: string;
    email: string;
    password: string;
    role: keyof typeof userRoles;
}
//# sourceMappingURL=auth.interface.d.ts.map