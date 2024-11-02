import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";
import { Expose } from "class-transformer";

export class ExistingUserDTO { 
    @ApiProperty({
        description: 'The email of the User',
        example: 'guy@banana.net',
    })
    @IsEmail()
    @Expose()
    readonly email: string;

    @IsString()
    @MaxLength(20)
    @Expose()
    readonly password: string;

    @ApiProperty({
        description: 'The bank amount of the User ($)',
        example: '60',
    })
    @IsNumber()
    @Expose()
    readonly bank: number;

}