import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module.js";
import { PrismaService } from "./prisma.service.js";

@Module({
	imports: [ConfigModule],
	exports: [PrismaService],
	providers: [PrismaService],
})
export class PrismaModule {}
