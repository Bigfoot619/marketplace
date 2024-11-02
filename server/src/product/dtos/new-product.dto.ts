import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose } from "class-transformer";

export class NewProductDTO {

  @ApiProperty({
    description: 'The user id of the product',
    example: 'asd32rq3rasdhs',
  })
  @Expose()
  @IsNotEmpty()
  readonly user_id: string;

  @ApiProperty({
    description: 'The title of the product',
    example: 'Computer',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'description',
    example: 'Gray, big, square',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'price',
    example: '100$',
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description: 'Date of creation',
    example: '2023-12-31T23:59:59.999Z',
  })
  @Expose()
  readonly createdAt: Date;
}
