import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { updateUserDto } from './dtos/update-user.dto';
import { signupDto } from 'src/authentication/dtos/signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(identifier: string): Promise<User> {
    return await this.userRepository.findOne({
      where: [{ id: identifier }, { username: identifier }],
    });
  }

  async createUser(user: signupDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async updateUser(id: string, updateUserDto: updateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ id });
  }
}
