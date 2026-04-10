import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { seconds, ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ConfigKeyEnum } from "../../common/enums/config-key.enum.js";

@Module({
	imports: [
		ThrottlerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => [
				{
					limit: Number(
						configService.getOrThrow<number>(
							`${ConfigKeyEnum.RateLimit}.limit`,
						),
					),
					name: "rate-limiter",
					ttl: seconds(
						Number(
							configService.getOrThrow<number>(
								`${ConfigKeyEnum.RateLimit}.ttl`,
							),
						),
					),
				},
			],
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
