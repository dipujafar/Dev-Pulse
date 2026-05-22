
export const userRoles = {
  contributor: "contributor",
  maintainer: "maintainer",
} as const;


export interface IUser {
  name: string;
  email: string;
  password: string;
  role:  keyof typeof userRoles
}
