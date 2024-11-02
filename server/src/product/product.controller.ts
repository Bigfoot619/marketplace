import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExistingProductDTO } from './dtos/existing-product.dto';
import { InvalidCredentialsException } from 'src/global-filters/invalid-credentials.exception';
import { CompleteProductDTO } from './dtos/complete-product.dto';
import { Throttle } from '@nestjs/throttler';
import { NewProductDTO } from './dtos/new-product.dto';
import { ProductDocument } from './product.schema';

@ApiTags('product')
@UseGuards(JwtGuard)
@Throttle({ default: { limit: 10, ttl: 60000 } })
@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Product has been successfully created.',
    type: ExistingProductDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async addProduct(@Body() product: Partial<ProductDocument>): Promise<ExistingProductDTO> {
    try {
      const newProduct = await this.productService.insertProduct(product);
      return newProduct;
    } catch (e) {
      throw new InvalidCredentialsException();
    }
  }

  @Get('id/:title')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'Id of the product returns as response' })
  @ApiBadRequestResponse({ description: 'Error! could not return the id of the product' })
  async getProductIdByTitle(@Param('title') title: string): Promise<string> {
    try {
      const product = await this.productService.findIdByTitle(title);
      return product;
    } catch (e) {
      throw new InvalidCredentialsException();
    }
  }

  @Get('showAll/:id')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'A list of products',
    type: [CompleteProductDTO],
  })
  async getAllProducts(@Param('id') id: string): Promise<CompleteProductDTO[]> {
    try {
      const products = await this.productService.getProducts(id);
      return products;
    } catch (e) {
      throw new InvalidCredentialsException();
    }
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'The product with the specified ID',
    type: ExistingProductDTO,
  })
  @ApiBadRequestResponse({ description: 'No product found with the given ID' })
  async getProductById(@Param('id') id: string): Promise<CompleteProductDTO> {
    try {
      const completeProduct = await this.productService.getProductById(id);
      return completeProduct;
    } catch (e) {
      throw new InvalidCredentialsException();
    }
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'Product updated successfully',
    type: ExistingProductDTO,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data or no product found with the given ID' })
  async updateProduct(@Param('id') id: string, @Body() updateProduct: Partial<ExistingProductDTO>): Promise<ExistingProductDTO> {
    try {
      const updatedProduct = await this.productService.updateProduct(id, updateProduct);
      return updatedProduct;
    } catch (e) {
      throw new InvalidCredentialsException();
    }
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ description: 'Product deleted successfully' })
  @ApiBadRequestResponse({ description: 'No product found with the given ID' })
  async removeProduct(@Param('id') id: string) {
    try {
      await this.productService.removeProduct(id);
    } catch (e) {
      throw new InvalidCredentialsException();
    }
  }

  @Get('myProducts/:id')
  @UseGuards(JwtGuard)
  @ApiCreatedResponse({ description: 'Products object returns as response', type: [ExistingProductDTO] })
  @ApiBadRequestResponse({ description: 'Error! could not return users' })
  async myProducts(@Param('id') id: string): Promise<ExistingProductDTO[]> {
      try {
          const products = await this.productService.myProducts(id);
          return products;
      } catch (e) {
          throw new InvalidCredentialsException();
      }
  }
}
