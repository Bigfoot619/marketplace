import { Body, Controller, Delete, Get, Param, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { NewUserDTO } from './dtos/new-user.dto';
import { InvalidCredentialsException } from 'src/global-filters/invalid-credentials.exception';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Throttle } from '@nestjs/throttler';

@ApiTags('user')
@Throttle({ default: { limit: 10, ttl: 60000 } })
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('email/:email')
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ description: 'User object returns as response', type: NewUserDTO })
    @ApiBadRequestResponse({ description: 'Error! could not return user' })
    async getUserByEmail(@Param('email') email: string): Promise<NewUserDTO> {
        try {
            const user = await this.userService.findUserByEmail(email);
            return user;
        } catch (e) {
            throw new InvalidCredentialsException();
        }
    }

    @Get('id/:email')
    @UsePipes(ValidationPipe)
    @ApiCreatedResponse({ description: 'Id of the user returns as response' })
    @ApiBadRequestResponse({ description: 'Error! could not return the id of the user' })
    async getUserIdByEmail(@Param('email') email: string): Promise<string> {
        try {
            const user = await this.userService.findIdByEmail(email);
            return user;
        } catch (e) {
            throw new InvalidCredentialsException();
        }
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    @ApiOkResponse({ description: 'User successfully updated', type: UpdateUserDTO })
    @ApiBadRequestResponse({ description: 'Error! could not update user' })
    async updateUser(@Param('id') id: string, @Body() updatePayload: Partial<NewUserDTO>): Promise<UpdateUserDTO> {
        try {
            const user = await this.userService.updateUserDetails(id, updatePayload);
            return user;
        } catch (e) {
            throw new InvalidCredentialsException();
        }
    }

    @Delete(':id')
    @ApiCreatedResponse({ description: 'User successfully deleted' })
    @ApiBadRequestResponse({ description: 'User cannot be deleted' })
    @UseGuards(JwtGuard)
    @UsePipes(ValidationPipe)
    async remove(@Param('id') id: string) {
        try {
            await this.userService.removeUser(id);
        } catch (e) {
            throw new InvalidCredentialsException();
        }
    }

    @Get('getAllUsers')
    @UseGuards(JwtGuard)
    @ApiCreatedResponse({ description: 'Users object returns as response', type: [NewUserDTO] })
    @ApiBadRequestResponse({ description: 'Error! could not return users' })
    async getAllUsers(): Promise<NewUserDTO[]> {
        try {
            const users = await this.userService.getAllUsers();
            return users;
        } catch (e) {
            throw new InvalidCredentialsException();
        }
    }
}
