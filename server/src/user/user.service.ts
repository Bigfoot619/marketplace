import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserRepository } from './user.repository';
import { NewUserDTO } from './dtos/new-user.dto';
import { LogsService } from 'src/logs/logs.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    @Inject(forwardRef(() => LogsService)) private logsService: LogsService,
  ) {}

  async findIdByEmail(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.logger.error(`User with email ${email} not found`);
      throw new Error();
    }
    await this.logsService.logActivity(user._id, 'findUSER');
    this.logger.log(`User id has successfully found`);
    return user._id.toString();
  }

  async findUserById(id: string): Promise<NewUserDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      this.logger.error(`User with ID ${id} not found`);
      throw new Error();
    }
    await this.logsService.logActivity(user._id, 'findUSER');
    this.logger.log(`User has successfully found`);
    return plainToClass(NewUserDTO, user, { excludeExtraneousValues: true });
  }

  async findUserByEmail(email: string): Promise<NewUserDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.logger.error(`User with email ${email} not found`);
      throw new Error();
    }
    await this.logsService.logActivity(user._id, 'findUSER');
    this.logger.log(`User has successfully found`);
    return plainToClass(NewUserDTO, user, { excludeExtraneousValues: true });
  }

  async register(
    user: NewUserDTO,
    hashedPassword: string,
  ): Promise<NewUserDTO> {
    const NewUser = await this.userRepository.findByEmail(user.email);
    if (NewUser) {
      this.logger.error(`Email ${user.email} is already registered`);
      throw new Error();
    }
    user.password = hashedPassword;
    const newUser = await this.userRepository.createUser(user);
    this.logger.log(`User has registered successfully`);
    return plainToClass(NewUserDTO, newUser, { excludeExtraneousValues: true });
  }

  async removeUser(id: string): Promise<NewUserDTO> {
    const user = await this.userRepository.removeUser(id);
    if (!user) {
      this.logger.error(`User with ID ${id} not found, cannot remove`);
      throw new Error();
    }
    await this.productService.removeProducts(id);
    this.logger.log(`User has removed successfully`);
    await this.logsService.logActivity(id, 'removeUser');
    return plainToClass(NewUserDTO, user, { excludeExtraneousValues: true });
  }

  async updateUserDetails(
    id: string,
    updatePayload: Partial<NewUserDTO>,
  ): Promise<NewUserDTO> {
    const updatedUser = await this.userRepository.updateUser(id, updatePayload);
    if (!updatedUser) {
      this.logger.error(`User with ID ${id} not found, cannot update`);
      throw new Error();
    }
    this.logger.log(`User has successfully updated`);
    await this.logsService.logActivity(id, 'updateUser');
    return plainToClass(NewUserDTO, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async getAllUsers(): Promise<NewUserDTO[]> {
    const usersDAO = await this.userRepository.getAllUsers();
    const usersDTO: NewUserDTO[] = [];
    for (const user of usersDAO) {
      const userDTO: NewUserDTO = {
        name: user.name,
        email: user.email,
        password: '*******',
        bank: user.bank,
      };
      usersDTO.push(userDTO);
    }
    return usersDTO;
  }
}
