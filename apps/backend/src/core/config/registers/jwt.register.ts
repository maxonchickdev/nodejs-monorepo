import { registerAs } from "@nestjs/config";
import { ConfigKeyConstant } from "../../../common/constants/config-key.constant";
import type { JwtType } from "../types/types";

const JwtRegister = registerAs(ConfigKeyConstant.jwt, (): JwtType => {
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

export { JwtRegister };
