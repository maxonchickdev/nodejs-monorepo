import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { JwtType } from "../../core/config/types/jwt.type.js";
import { AuthRepository } from "../../modules/auth/auth.repository.js";
import { ConfigKeyConstant } from "../constants/config-key.constant.js";

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(
		@Inject(AuthRepository) private readonly authRepository: AuthRepository,
		@Inject(ConfigService) readonly configService: ConfigService,
	) {
		const jwtConfig = configService.getOrThrow<JwtType>(ConfigKeyConstant.jwt);

		super({
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: jwtConfig.secret,
		});
	}

	async validate(payload: { userId: number }): Promise<number> {
		const user = await this.authRepository.findOneById(payload.userId);

		if (!user) {
			throw new UnauthorizedException();
		}

		return payload.userId;
	}
}

export { JwtStrategy };
