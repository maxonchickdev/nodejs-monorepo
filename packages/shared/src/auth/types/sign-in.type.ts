import type { SignUpType } from "./sign-up.type";

export type SignInType = Pick<SignUpType, "email" | "password">;
