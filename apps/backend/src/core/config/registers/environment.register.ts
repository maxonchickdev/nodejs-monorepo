import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../../../common/enums/config-key.enum";
import type { EnvironmentType } from "../types/environment.type";

export const environmentRegister = registerAs(
	ConfigKeyEnum.Environment,
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
