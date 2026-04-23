import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy, LocalStrategy } from "../../common/strategies/strategies";
import { ConfigModule } from "../../core/config/config.module.js";
import { JwtModule } from "../../core/jwt/jwt.module.js";
import { PrismaModule } from "../../core/prisma/prisma.module.js";
import { AuthController } from "./auth.controller.js";
import { AuthRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";

@Module({
	controllers: [AuthController],
	exports: [AuthService, AuthRepository],
	imports: [JwtModule, PassportModule, PrismaModule, ConfigModule],
	providers: [AuthService, AuthRepository, JwtStrategy, LocalStrategy],
})
class AuthModule {}

export { AuthModule };
