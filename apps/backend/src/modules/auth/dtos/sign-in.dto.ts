import { ApiSchema, PickType } from "@nestjs/swagger";
import type { SignInType } from "@nodejs-monorepo/shared";
import { SignUpDto } from "./sign-up.dto";

@ApiSchema({
	description: "Sign in DTO",
	name: "SignInDto",
})
export class SignInDto
	extends PickType(SignUpDto, ["email", "password"] as const)
	implements SignInType
{
	constructor(email: string, password: string) {
		super();
		this.email = email;
		this.password = password;
	}
}
