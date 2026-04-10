import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../../../common/enums/config-key.enum";
import type { RedisType } from "../types/reids.type";

export const redisRegister = registerAs(ConfigKeyEnum.Redis, (): RedisType => {
	const redisUrl = process.env.REDIS_URL;

	if (!redisUrl) {
		throw new Error("Missing some env");
	}

	return {
		redisUrl,
	};
});
