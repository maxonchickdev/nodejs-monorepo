import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../../../common/enums/config-key.enum";
import type { RateLimitType } from "../types/rate-limiting.type";

export const rateLimitRegister = registerAs(
	ConfigKeyEnum.RateLimit,
	(): RateLimitType => {
		const limit = Number(process.env.THROTTLE_LIMIT);
		const ttl = Number(process.env.THROTTLE_TTL);

		if (!limit || !ttl) {
			throw new Error("Missing some envs");
		}

		return {
			limit,
			ttl,
		};
	},
);
