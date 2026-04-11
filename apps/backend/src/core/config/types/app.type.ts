export type AppType = {
	appPort: number;
	appRequestTimeout: number;
	appName: string;
	appDescription: string;
	appCorsAllowedHeaders: string;
	appCorsCredentials: boolean;
	appCorsMethods: string;
	appCorsOrigin: string;
};
