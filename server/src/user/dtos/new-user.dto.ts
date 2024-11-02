import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString, MaxLength } from 'class-validator';

export class NewUserDTO {
  @ApiProperty({
    description: 'The name of the User',
    example: 'guy banana',
  })
  @IsString()
  @Expose()
  readonly name: string;

  @ApiProperty({
    description: 'The email of the User',
    example: 'guy@banana.net',
  })
  @IsEmail()
  @Expose()
  readonly email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'guy123',
  })
  @IsString()
  @MaxLength(20)
  @Expose()
  password: string;

  @ApiProperty({
    description: 'The bank amount of the User ($)',
    example: '60',
  })
  @Expose()
  @IsNumber()
  readonly bank: number;
}
