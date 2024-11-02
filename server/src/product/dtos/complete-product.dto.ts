import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { ExistingProductDTO } from './existing-product.dto';

export class CompleteProductDTO {
  @ApiProperty({ description: 'Product details' })
  @Expose()
  product: ExistingProductDTO;

  @ApiProperty({ description: 'Associated user details' })
  @Expose()
  user: NewUserDTO;
}
