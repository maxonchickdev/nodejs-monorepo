import {
	ClassSerializerInterceptor,
	Logger,
	ValidationPipe,
	VersioningType,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost, NestFactory, Reflector } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module.js";
import { ConfigKeyEnum } from "./common/enums/config-key.enum.js";
import { EnvironmentsEnum } from "./common/enums/environments.enum.js";
import { CatchEverythingFilter } from "./common/filters/catch-everything.filter.js";
import { LoggingInterceptor } from "./common/interceptors/logger.interceptor.js";
import { TimeoutInterceptor } from "./common/interceptors/timeout.interceptor.js";
import type { AppType } from "./core/config/types/app.type.js";
import type { EnvironmentType } from "./core/config/types/environment.type.js";

const logger: Logger = new Logger("Bootstrap");

(async (): Promise<void> => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const configService = app.get(ConfigService);

	const environmentConfig = configService.getOrThrow<EnvironmentType>(
		ConfigKeyEnum.Environment,
	);

	const isProduction =
		environmentConfig.nodeEnv === EnvironmentsEnum.Production;

	const appConfig = configService.getOrThrow<AppType>(ConfigKeyEnum.App);

	app.enableVersioning({
		defaultVersion: "1",
		prefix: "api/v",
		type: VersioningType.URI,
	});

	if (!isProduction) {
		const swaggerPath = "/api/docs";

		const swaggerConfig = new DocumentBuilder()
			.setTitle(appConfig.appName)
			.setDescription(appConfig.appDescription)
			.setVersion("1.0")
			.addServer(
				`http://localhost:${appConfig.appPort}`,
				EnvironmentsEnum.Development,
			)
			.addBearerAuth(
				{
					bearerFormat: "JWT",
					description: "Enter JWT token",
					in: "header",
					name: "Authorization",
					scheme: "bearer",
					type: "http",
				},
				"Bearer",
			)
			.addSecurityRequirements("Bearer")
			.build();

		const document = SwaggerModule.createDocument(app, swaggerConfig, {
			deepScanRoutes: true,
			ignoreGlobalPrefix: false,
			operationIdFactory: (_controllerKey: string, methodKey: string) =>
				methodKey,
		});

		SwaggerModule.setup(swaggerPath, app, document, {
			customSiteTitle: appConfig.appName,
			explorer: true,
			jsonDocumentUrl: `${swaggerPath}/json`,
			swaggerOptions: {
				filter: true,
				showRequestDuration: true,
			},
			yamlDocumentUrl: `${swaggerPath}/yaml`,
		});
	}

	const httpAdapterHost = app.get(HttpAdapterHost);

	app.useGlobalFilters(
		new CatchEverythingFilter(httpAdapterHost, configService),
	);

	app.enableCors({
		allowedHeaders: appConfig.appCorsAllowedHeaders,
		credentials: appConfig.appCorsCredentials,
		methods: appConfig.appCorsMethods,
		origin: appConfig.appCorsOrigin,
	});

	app.use(helmet());

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.useGlobalInterceptors(
		new TimeoutInterceptor(configService),
		new LoggingInterceptor(configService),
		new ClassSerializerInterceptor(app.get(Reflector)),
	);

	app.enableShutdownHooks();

	await app.listen(appConfig.appPort);

	logger.log(
		`Nestjs boilerplate admin application is running on: ${await app.getUrl()}`,
	);

	if (!isProduction) {
		logger.log(`Swagger docs available at: ${await app.getUrl()}`);
	}
})().catch((e) => {
	logger.error(`Failed to start nestjs boilerplate admin application: ${e}`);
});
