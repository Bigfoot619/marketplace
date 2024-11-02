import { PartialType } from '@nestjs/mapped-types';
import { NewProductDTO } from './new-product.dto';

export class ExistingProductDTO extends PartialType(NewProductDTO) {}
