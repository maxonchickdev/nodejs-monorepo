import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { PrismaModule } from "../prisma/prisma.module.js";
import { HealthChecksController } from "./health-checks.controller.js";
import { HealthChecksService } from "./health-checks.service.js";

@Module({
	controllers: [HealthChecksController],
	imports: [TerminusModule, PrismaModule],
	providers: [HealthChecksService],
})
export class HealthChecksModule {}
