import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule as CoreJwtModule, type JwtModuleOptions } from "@nestjs/jwt";
import { ConfigKeyConstant } from "../../common/constants/config-key.constant.js";
import type { JwtType } from "../config/types/jwt.type.js";

@Module({
	imports: [
		CoreJwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService): JwtModuleOptions => {
				const jwtConfig = configService.getOrThrow<JwtType>(
					ConfigKeyConstant.jwt,
				);

				return {
					secret: jwtConfig.secret,
					signOptions: {
						expiresIn: jwtConfig.expiresIn,
					},
				};
			},
		}),
	],
	exports: [CoreJwtModule],
})
class JwtModule {}

export { JwtModule };
