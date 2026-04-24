import { registerAs } from "@nestjs/config";
import { ConfigKeyConstant } from "../../../common/constants/config-key.constant";
import type { EnvironmentType } from "../types/types";

export const environmentRegister = registerAs(
	ConfigKeyConstant.environment,
	(): EnvironmentType => {
		const nodeEnv = process.env.NODE_ENV;

		if (!nodeEnv) {
			throw new Error("Missing some envs");
		}

		return {
			nodeEnv,
		};
	},
);
