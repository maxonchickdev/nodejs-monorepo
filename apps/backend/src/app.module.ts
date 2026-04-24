import { Module } from "@nestjs/common";
import { HealthChecksModule } from "./core/health-checks/health-checks.module.js";
import { RateLimitModule } from "./core/rate-limit/rate-limit.module.js";
import { S3Module } from "./core/s3/s3.module.js";
import { AuthModule } from "./modules/auth/auth.module.js";

@Module({
	imports: [HealthChecksModule, AuthModule, S3Module, RateLimitModule],
})
export class AppModule {}
