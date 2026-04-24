import { registerAs } from "@nestjs/config";
import { ConfigKeyConstant } from "../../../common/constants/config-key.constant.js";
import type { AppType } from "../types/types.js";

export const appRegister = registerAs(ConfigKeyConstant.app, (): AppType => {
	const appDescription = process.env.APP_DESCRIPTION;
	const appName = process.env.APP_NAME;
	const appPort = Number(process.env.APP_PORT);
	const appRequestTimeout = Number(process.env.APP_REQUEST_TIMEOUT);
	const appCorsAllowedHeaders = process.env.APP_CORS_ALLOWED_HEADERS;
	const appCorsCredentials = Boolean(process.env.APP_CORS_CREDENTIALS); // TODO: check this
	const appCorsMethods = process.env.APP_CORS_METHODS;
	const appCorsOrigin = process.env.APP_CORS_ORIGIN;

	if (
		!appDescription ||
		!appName ||
		!appPort ||
		!appRequestTimeout ||
		!appCorsAllowedHeaders ||
		!appCorsMethods ||
		!appCorsOrigin ||
		appCorsCredentials === undefined
	) {
		throw new Error("Missing some envs");
	}

	return {
		appDescription,
		appName,
		appPort,
		appRequestTimeout,
		appCorsAllowedHeaders,
		appCorsCredentials,
		appCorsMethods,
		appCorsOrigin,
	};
});
