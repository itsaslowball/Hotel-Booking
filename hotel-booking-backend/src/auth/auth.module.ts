import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/models/user.model";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    ConfigModule, // Import ConfigModule to use ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule], // Re-import ConfigModule here if needed by JwtModule
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService], // Inject ConfigService into the useFactory function
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {};