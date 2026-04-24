import { registerAs } from "@nestjs/config";
import { ConfigKeyConstant } from "../../../common/constants/config-key.constant";
import type { PrismaType } from "../types/types";

export const prismaRegister = registerAs(
	ConfigKeyConstant.prisma,
	(): PrismaType => {
		const postgresUrl = process.env.POSTGRES_URL;

		if (!postgresUrl) {
			throw new Error("Missing some envs");
		}

		return {
			postgresUrl,
		};
	},
);
