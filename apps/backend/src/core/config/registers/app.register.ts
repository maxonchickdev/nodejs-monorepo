import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../../../common/enums/config-key.enum.js";
import type { AppType } from "../types/app.type.js";

export const appRegister = registerAs(ConfigKeyEnum.App, (): AppType => {
	const appDescription = process.env.APP_DESCRIPTION;
	const appName = process.env.APP_NAME;
	const appPort = Number(process.env.APP_PORT);
	const appRequestTimeout = Number(process.env.APP_REQUEST_TIMEOUT);

	if (!appDescription || !appName || !appPort || !appRequestTimeout) {
		throw new Error("Missing some envs");
	}

	return {
		appDescription,
		appName,
		appPort,
		appRequestTimeout,
	};
});
