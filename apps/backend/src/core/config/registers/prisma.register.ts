import { registerAs } from "@nestjs/config";
import { ConfigKeyConstant } from "../../../common/constants/config-key.constant";
import type { PrismaType } from "../types/types";

const PrismaRegister = registerAs(ConfigKeyConstant.prisma, (): PrismaType => {
	const postgresUrl = process.env.POSTGRES_URL;

	if (!postgresUrl) {
		throw new Error("Missing some envs");
	}

	return {
		postgresUrl,
	};
});

export { PrismaRegister };
