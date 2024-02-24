import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Make sure ConfigModule is imported
      inject: [ConfigService], // Inject ConfigService to use it in useFactory
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Access the JWT_SECRET from ConfigService
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'), // Access the JWT_EXPIRATION_TIME from ConfigService
        },
      }),
    }),
  ],
})
export class AuthenticationModule {}
