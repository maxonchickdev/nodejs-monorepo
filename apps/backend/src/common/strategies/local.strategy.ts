import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { compare } from "bcrypt";
import { Strategy } from "passport-local";
import type { AuthRepository } from "../../modules/auth/auth.repository.js";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authRepository: AuthRepository) {
		super({
			passwordField: "password",
			usernameField: "email",
		});
	}

	async validate(email: string, password: string): Promise<number> {
		const user = await this.authRepository.findOneByEmail(email);

		if (!user) {
			throw new UnauthorizedException("Invalid credentials.");
		}

		const isPasswordValid = await compare(password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials.");
		}

		return user.id;
	}
}
