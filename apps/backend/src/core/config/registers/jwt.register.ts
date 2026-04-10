import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../../../common/enums/config-key.enum";
import type { JwtType } from "../types/jwt.type";

export const jwtRegister = registerAs(ConfigKeyEnum.Jwt, (): JwtType => {
	const expiresIn = Number(process.env.JWT_EXPIRES_IN);
	const secret = process.env.JWT_SECRET;

	if (!expiresIn || !secret) {
		throw new Error("Missing some envs");
	}

	return {
		expiresIn,
		secret,
	};
});
