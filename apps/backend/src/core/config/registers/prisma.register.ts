import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../../../common/enums/config-key.enum";
import type { PrismaType } from "../types/prisma.type";

export const prismaRegister = registerAs(
	ConfigKeyEnum.Prisma,
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
