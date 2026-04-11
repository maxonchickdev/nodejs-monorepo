import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { seconds, ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigKeyEnum } from "../../common/enums/config-key.enum.js";
import type { RateLimitType } from "../config/types/rate-limit.type.js";

@Module({
	imports: [
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const rateLimitConfig = configService.getOrThrow<RateLimitType>(
					ConfigKeyEnum.RateLimit,
				);

				return {
					throttlers: [
						{
							limit: rateLimitConfig.limit,
							name: "rate-limiter",
							ttl: seconds(rateLimitConfig.ttl),
						},
					],
				};
			},
		}),
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class RateLimitModule {}
