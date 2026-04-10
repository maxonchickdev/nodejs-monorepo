import { Module } from "@nestjs/common";
import { ConfigModule as CoreConfigModule } from "@nestjs/config";
import Joi from "joi";
import { appRegister } from "./registers/app.register";
import { environmentRegister } from "./registers/environment.register";
import { jwtRegister } from "./registers/jwt.register";
import { prismaRegister } from "./registers/prisma.register";
import { rateLimitRegister } from "./registers/rate-limit.register";
import { redisRegister } from "./registers/redis.register";

@Module({
	imports: [
		CoreConfigModule.forRoot({
			envFilePath: ["../../.env"],
			isGlobal: true,
			load: [
				redisRegister,
				appRegister,
				prismaRegister,
				environmentRegister,
				jwtRegister,
				rateLimitRegister,
			],
			validationSchema: Joi.object({
				APP_DESCRIPTION: Joi.string(),
				APP_NAME: Joi.string(),

				APP_PORT: Joi.number()
					.port()
					.default(3000)
					.description("Port on which the application will run"),
				APP_REQUEST_TIMEOUT: Joi.number()
					.positive()
					.default(5000)
					.description("Request timeout in milliseconds"),
				JWT_EXPIRES_IN: Joi.number().required().description("JWT expires in"),

				JWT_SECRET: Joi.string().required().description("JWT secret"),
				NODE_ENV: Joi.string()
					.valid("development", "production", "test")
					.default("development")
					.description("Application environment"),

				POSTGRES_URL: Joi.string()
					.uri({ scheme: ["postgresql", "postgres"] })
					.required()
					.description("Postgres connection URL"),

				REDIS_URL: Joi.string()
					.uri({ scheme: ["redis"] })
					.required()
					.description("Redis connection URL"),
				THROTTLE_LIMIT: Joi.number()
					.required()
					.description("Rate limiting limit"),

				THROTTLE_TTL: Joi.number().required().description("Rate limiting TTL"),
			}),
		}),
	],
})
export class ConfigModule {}
