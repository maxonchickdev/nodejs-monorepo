// TODO: erase joi configs
import { Module } from "@nestjs/common";
import { ConfigModule as CoreConfigModule } from "@nestjs/config";
import Joi from "joi";
import { EnvironmentsConstant } from "../../common/constants/environments.constant";
import {
	AppRegister,
	EnvironmentRegister,
	JwtRegister,
	PrismaRegister,
	RateLimitRegister,
	RedisRegister,
	S3Register,
} from "./registers/registers";

@Module({
	imports: [
		CoreConfigModule.forRoot({
			envFilePath: ["../../.env"],
			isGlobal: false,
			load: [
				RedisRegister,
				AppRegister,
				PrismaRegister,
				EnvironmentRegister,
				JwtRegister,
				RateLimitRegister,
				S3Register,
			],
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().default(EnvironmentsConstant.development),

				APP_PORT: Joi.number().port().positive().required(),
				APP_REQUEST_TIMEOUT: Joi.number().positive().required(),
				APP_NAME: Joi.string().required(),
				APP_DESCRIPTION: Joi.string().required(),
				APP_CORS_ALLOWED_HEADERS: Joi.string().required(),
				APP_CORS_CREDENTIALS: Joi.boolean().required(),
				APP_CORS_METHODS: Joi.string().required(),
				APP_CORS_ORIGIN: Joi.string().required(),

				POSTGRES_URL: Joi.string()
					.uri({ scheme: ["postgresql", "postgres"] })
					.required(),

				REDIS_URL: Joi.string()
					.uri({ scheme: ["redis"] })
					.required(),

				JWT_SECRET: Joi.string().required(),
				JWT_EXPIRES_IN: Joi.number().required(),

				THROTTLE_TTL: Joi.number().positive().required(),
				THROTTLE_LIMIT: Joi.number().positive().required(),

				AWS_REGION: Joi.string().required(),
				AWS_ACCESS_KEY_ID: Joi.string().required(),
				AWS_SECRET_ACCESS_KEY: Joi.string().required(),
				AWS_S3_BUCKET_NAME: Joi.string().required(),
			}),
		}),
	],
	exports: [CoreConfigModule],
})
class ConfigModule {}

export { ConfigModule };
