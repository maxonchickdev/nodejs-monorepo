import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

const UserIdDecorator = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>();
		return request.user;
	},
);

export { UserIdDecorator };
