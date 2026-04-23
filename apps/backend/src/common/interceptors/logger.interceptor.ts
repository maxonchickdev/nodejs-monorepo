// TODO: check this
import {
	type CallHandler,
	type ExecutionContext,
	Inject,
	Injectable,
	Logger,
	type NestInterceptor,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";
import { type Observable, tap } from "rxjs";
import type { EnvironmentType } from "../../core/config/types/environment.type.js";
import { ConfigKeyConstant } from "../constants/config-key.constant.js";
import { EnvironmentsConstant } from "../constants/environments.constant.js";

type LoggerExpressionType = "incoming" | "error" | "success";

@Injectable()
class LoggingInterceptor implements NestInterceptor {
	private readonly logger = new Logger(LoggingInterceptor.name);
	private readonly isProduction: boolean;

	constructor(@Inject(ConfigService) readonly configService: ConfigService) {
		const environmentConfig = configService.getOrThrow<EnvironmentType>(
			ConfigKeyConstant.environment,
		);

		this.isProduction =
			environmentConfig.nodeEnv === EnvironmentsConstant.production;
	}

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		if (this.isProduction) return next.handle();

		const httpContext = context.switchToHttp();
		const request = httpContext.getRequest<Request>();
		const response = httpContext.getResponse<Response>();

		const { method, originalUrl } = request;

		const start = Date.now();

		this.logResponse("incoming", method, originalUrl);

		return next.handle().pipe(
			tap({
				error: (e) => {
					const duration = Date.now() - start;
					const statusCode = response.statusCode;
					this.logResponse(
						"error",
						method,
						originalUrl,
						statusCode,
						duration,
						e,
					);
				},
				next: () => {
					const duration = Date.now() - start;
					const { statusCode } = response;

					this.logResponse(
						"success",
						method,
						originalUrl,
						statusCode,
						duration,
					);
				},
			}),
		);
	}

	private logResponse(
		loggerExpressionType: LoggerExpressionType,
		method: string,
		url: string,
		statusCode?: number,
		duration?: number,
		error?: unknown,
	): void {
		switch (loggerExpressionType) {
			case "incoming":
				this.logger.debug(`[Incoming] - [Method: ${method}] - [Url: ${url}]`);
				break;

			case "success":
				this.logger.debug(
					`[Completed] - [Method: ${method}] - [Url: ${url}] - [Status: ${statusCode}] - [Duration: ${duration}ms]`,
				);
				break;

			case "error":
				this.logger.error(
					`[Failed] - [Method: ${method}] - [Url: ${url}] - [Status: ${statusCode}] - [Duration: ${duration}ms] - [Error: ${error}]`,
				);
				break;
		}
	}
}

export { LoggingInterceptor };
