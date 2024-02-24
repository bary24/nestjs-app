import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  getUsers(): Promise<User[]> {
    return this.UserService.getUsers();
  }
}
