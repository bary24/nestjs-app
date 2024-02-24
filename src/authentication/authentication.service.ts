import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

export interface IToken {
  token: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data): Promise<IToken | UnauthorizedException> {
    const user: User | null = await this.userService.getUser(data.id);
    const hashedEnteredPass: boolean = await bcrypt.compare(
      data.password,
      user.password,
    );
    console.log(hashedEnteredPass);
    if (!user || !hashedEnteredPass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.id, username: user.username };
    const token: string = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }

  async register(data): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(data.password, 10);
    const user: User = await this.userService.createUser({
      ...data,
      password: hashedPassword,
    });
    return user;
  }
}
