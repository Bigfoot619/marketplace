import { PartialType } from '@nestjs/mapped-types';
import { NewProductDTO } from './new-product.dto';

export class UpdateProductDTO extends PartialType(NewProductDTO) {}
