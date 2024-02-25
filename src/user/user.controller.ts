import { Controller, Get, Param, Put, UseGuards, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { updateUserDto } from './dtos/update-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  getUsers(): Promise<User[]> {
    return this.UserService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.UserService.getUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: updateUserDto,
  ): Promise<User> {
    return this.UserService.updateUser(id, updateUserDto);
  }
}
