import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UpdateUserDTO } from 'src/user/dtos/update-user.dto';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: NewUserDTO): Promise<UpdateUserDTO> {
      const hashedPassword = await this.hashPassword(user.password);
      const newUser = await this.userService.register(user, hashedPassword);
      return newUser;
    
  }

  async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(unknownUser: Partial<ExistingUserDTO>): Promise<ExistingUserDTO> {
    const user = await this.userService.findUserByEmail(unknownUser.email);
    const doesPasswordMatch = await this.doesPasswordMatch(unknownUser.password, user.password);
    if (!doesPasswordMatch) {
      throw new Error();
    }
    return user;
  }

  async login(unknownUser: Partial<ExistingUserDTO>): Promise<{ token: string }> {
    try {
      const user = await this.validateUser(unknownUser);
      const jwt = await this.jwtService.signAsync({ user });
      this.logger.log(`Login successfully`);
      return { token: jwt };
    } catch (e) {
      this.logger.error(`Login has failed`);
      throw new Error();
    }
  }
}
