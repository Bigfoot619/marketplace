import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UsePipes } from '@nestjs/common/';
import { UpdateUserDTO } from 'src/user/dtos/update-user.dto';
import { InvalidCredentialsException } from 'src/global-filters/invalid-credentials.exception';
import { Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';

@ApiTags('auth')
@Throttle({ default: { limit: 3, ttl: 60000 } })
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }


  @Post('register')
  @ApiCreatedResponse({
    description: 'User successfully registered',
    type: NewUserDTO,
  })
  @ApiBadRequestResponse({ description: 'User registration failed' })
  @UsePipes(ValidationPipe)
  async register(@Body() user: NewUserDTO): Promise<UpdateUserDTO> {
    try {
      const registeredUser = await this.authService.register(user);
      return registeredUser;
    } catch (e) {
      throw new InvalidCredentialsException();
    }
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'User successfully logged in' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @UsePipes(ValidationPipe)
  async login(
    @Body() user: Partial<ExistingUserDTO>,
    @Res({ passthrough: true }) response: Response): Promise<{token: string} | void> {
    try {
      const token = await this.authService.login(user);
      response.cookie('jwt', token, { httpOnly: true });
      return token;
    } catch (e) {
      throw new InvalidCredentialsException();
    }
  }
}
