import { registerAs } from "@nestjs/config";
import { ConfigKeyConstant } from "../../../common/constants/config-key.constant";
import type { RedisType } from "../types/types";

const RedisRegister = registerAs(ConfigKeyConstant.redis, (): RedisType => {
	const redisUrl = process.env.REDIS_URL;

	if (!redisUrl) {
		throw new Error("Missing some env");
	}

	return {
		redisUrl,
	};
});

export { RedisRegister };
