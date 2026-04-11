import {
	Inject,
	Injectable,
	type OnModuleDestroy,
	type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../prisma/generated/client.js";
import { ConfigKeyEnum } from "../../common/enums/config-key.enum.js";
import type { PrismaType } from "../config/types/prisma.type.js";

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	constructor(@Inject(ConfigService) readonly configService: ConfigService) {
		const prismaConfig = configService.getOrThrow<PrismaType>(
			ConfigKeyEnum.Prisma,
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
