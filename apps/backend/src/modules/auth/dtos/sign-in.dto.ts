import { ApiSchema, PickType } from "@nestjs/swagger";
import { SignUpDto } from "./sign-up.dto";

@ApiSchema({
	description: "Sign in DTO",
	name: "SignInDto",
})
class SignInDto extends PickType(SignUpDto, ["email", "password"] as const) {
	constructor(email: string, password: string) {
		super();
		this.email = email;
		this.password = password;
	}
}

export { SignInDto };
