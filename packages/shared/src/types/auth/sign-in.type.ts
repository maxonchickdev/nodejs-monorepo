import type { SignUpType } from "../..";

export type SignInType = Pick<SignUpType, "email" | "password">;
