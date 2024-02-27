import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { signupDto } from './dtos/signup.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: { username: string; password: string }) {
    return await this.authenticationService.login(data);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() signupDto: signupDto) {
    return await this.authenticationService.register(signupDto);
  }
}
