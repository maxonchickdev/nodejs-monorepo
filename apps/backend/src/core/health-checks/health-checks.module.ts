import { Module } from "@nestjs/common";
import { HealthChecksController } from "./health-checks.controller.js";
import { HealthChecksService } from "./health-checks.service.js";
import { TerminusModule } from "@nestjs/terminus";

@Module({
  imports: [TerminusModule],
  controllers: [HealthChecksController],
  providers: [HealthChecksService],
})
export class HealthChecksModule {}
