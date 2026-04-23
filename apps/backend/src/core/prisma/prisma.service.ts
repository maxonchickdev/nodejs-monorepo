import {
	Inject,
	Injectable,
	type OnModuleDestroy,
	type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../prisma/generated/client.js";
import { ConfigKeyConstant } from "../../common/constants/config-key.constant.js";
import type { PrismaType } from "../config/types/prisma.type.js";

@Injectable()
class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(@Inject(ConfigService) readonly configService: ConfigService) {
		const prismaConfig = configService.getOrThrow<PrismaType>(
			ConfigKeyConstant.prisma,
		);

		const adapter: PrismaPg = new PrismaPg({
			connectionString: prismaConfig.postgresUrl,
		});

		super({ adapter });
	}
	async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}
}

export { PrismaService };
