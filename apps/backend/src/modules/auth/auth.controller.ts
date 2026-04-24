// TODO: add all possible responses
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	UseGuards,
} from "@nestjs/common";
import {
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { UserIdDecorator } from "../../common/decorators/decorators";
import { LocalGuard } from "../../common/guards/guards";
import { AuthService } from "./auth.service.js";
import { SignInDto, SignUpDto } from "./dtos/dtos";
import { AuthRdo } from "./rdos/rdos";

@ApiTags("Authentication & Authorization")
@Controller("auth")
export class AuthController {
	constructor(@Inject(AuthService) private readonly authService: AuthService) {}

	@Post("sign-in")
	@UseGuards(LocalGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		description: "Sign In flow",
		summary: "Sign In",
	})
	@ApiOkResponse({
		description: "Sucess",
		type: AuthRdo,
	})
	@ApiUnauthorizedResponse({
		description: "Invalid credentials",
	})
	@ApiUnauthorizedResponse({
		description: "User not found. Try to sign up.",
	})
	@ApiBody({
		type: SignInDto,
	})
	public signIn(@UserIdDecorator() userId: number): AuthRdo {
		return this.authService.signIn(userId);
	}

	@Post("sign-up")
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		description: "Sign Up flow",
		summary: "Sign Up",
	})
	@ApiCreatedResponse({
		description: "Success",
		type: AuthRdo,
	})
	@ApiUnauthorizedResponse({
		description: "",
	})
	@ApiBody({
		type: SignUpDto,
	})
	public signUp(@Body() signUpDto: SignUpDto): Promise<AuthRdo> {
		return this.authService.signUp(signUpDto);
	}
}
