import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisModule as CoreRedisModule } from "@nestjs-modules/ioredis";
import { ConfigKeyConstant } from "../../common/constants/config-key.constant.js";
import type { RedisType } from "../config/types/redis.type.js";
import { RedisService } from "./redis.service.js";

@Module({
	exports: [RedisService],
	imports: [
		CoreRedisModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const redisConfig = configService.getOrThrow<RedisType>(
					ConfigKeyConstant.redis,
				);

				return {
					options: {
						keyPrefix: "nestjs-boilerplate-cache:",
					},
					type: "single",
					url: redisConfig.redisUrl,
				};
			},
		}),
	],
	providers: [RedisService],
})
export class RedisModule {}
