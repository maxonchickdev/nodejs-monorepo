import { registerAs } from "@nestjs/config";
import { ConfigKeyConstant } from "../../../common/constants/config-key.constant";
import type { RateLimitType } from "../types/types";

const RateLimitRegister = registerAs(
	ConfigKeyConstant.rateLimit,
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

export { RateLimitRegister };
