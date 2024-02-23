import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: { username: string; password: string }) {
    return await this.authenticationService.login(data);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() data: { username: string; password: string; name: string },
  ) {
    return await this.authenticationService.register(data);
  }
}
