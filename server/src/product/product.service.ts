import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ExistingProductDTO } from './dtos/existing-product.dto';
import { plainToClass } from 'class-transformer';
import { UserService } from 'src/user/user.service';
import { CompleteProductDTO } from './dtos/complete-product.dto';
import { LogsService } from 'src/logs/logs.service';
import { NewProductDTO } from './dtos/new-product.dto';
import { ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    private productRepository: ProductRepository,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => LogsService)) private logsService: LogsService,
  ) {}

  async insertProduct(
    product: Partial<ProductDocument>,
  ): Promise<ExistingProductDTO> {
    const newProduct = await this.productRepository.createProduct(product);
    if (!newProduct) {
      this.logger.error(`This title is already exist`);
      throw new Error();
    }
    await this.logsService.logActivity(
      newProduct.user_id.toString(),
      'addProduct',
    );
    this.logger.log(`Product created successfully`);
    return plainToClass(ExistingProductDTO, newProduct, {
      excludeExtraneousValues: true,
    });
  }

  async findIdByTitle(title: string): Promise<string> {
    const product = await this.productRepository.findByTitle(title);
    if (!product) {
      this.logger.error(`Product with title ${title} not found`);
      throw new Error();
    }
    await this.logsService.logActivity(
      product.user_id.toString(),
      'findProduct',
    );
    this.logger.log(`Product id has successfully found`);
    return product._id.toString();
  }

  async findProductByTitle(title: string): Promise<ExistingProductDTO> {
    const product = await this.productRepository.findByTitle(title);
    if (!product) {
      this.logger.error(`Product with title ${title} not found`);
      throw new Error();
    }
    await this.logsService.logActivity(
      product.user_id.toString(),
      'findProduct',
    );
    this.logger.log(`Product has successfully found`);
    return plainToClass(ExistingProductDTO, product, {
      excludeExtraneousValues: true,
    });
  }

  async getProducts(id: string): Promise<CompleteProductDTO[]> {
    const isUser = await this.userService.findUserById(id);
    if (!isUser) {
      this.logger.error(`User does not exist!`);
      throw new Error();
    }
    const products = await this.productRepository.findAllProduct();
    if (!products) {
      this.logger.error(`Could not retrieve products`);
      throw new Error();
    }
    const productDTOArray: CompleteProductDTO[] = [];
    for (const product of products) {
      const userId = product.user_id.toString();
      const user = await this.userService.findUserById(userId);
      const completeProduct: CompleteProductDTO = {
        product: plainToClass(ExistingProductDTO, product, {
          excludeExtraneousValues: true,
        }),
        user: user,
      };
      productDTOArray.push(completeProduct);
    }
    await this.logsService.logActivity(id, 'findProduct');
    this.logger.log(`Products retrieved successfully`);
    return productDTOArray;
  }

  async getProductById(productId: string): Promise<CompleteProductDTO> {
    const product = await this.productRepository.findProductById(productId);
    if (!product) {
      this.logger.error(`Couldn't get product!`);
      throw new Error();
    }
    const userId = product.user_id.toString();
    const user = await this.userService.findUserById(userId);
    this.logger.log(`Product retrieved successfully`);
    const completeProduct: CompleteProductDTO = {
      product: plainToClass(ExistingProductDTO, product, {
        excludeExtraneousValues: true,
      }),
      user: user,
    };
    await this.logsService.logActivity(userId, 'findProduct');
    return completeProduct;
  }

  async updateProduct(
    productId: string,
    product: Partial<ExistingProductDTO>,
  ): Promise<ExistingProductDTO> {
    const updatedProduct = await this.productRepository.updateProductById(
      productId,
      product,
    );
    if (!updatedProduct) {
      this.logger.error(`Couldn't update product!`);
      throw new Error();
    }
    await this.logsService.logActivity(
      product.user_id.toString(),
      'updateProduct',
    );
    this.logger.log(`Product updated successfully`);
    return plainToClass(ExistingProductDTO, updatedProduct, {
      excludeExtraneousValues: true,
    });
  }

  async removeProduct(id: string): Promise<ExistingProductDTO> {
    const product = await this.productRepository.removeProduct(id);
    if (!product) {
      this.logger.error(`Couldn't delete product!`);
      throw new Error();
    }
    this.logger.log(`Product has deleted successfully`);
    const userId = await product.user_id.toString();
    await this.logsService.logActivity(userId, 'deleteProduct');
    return plainToClass(ExistingProductDTO, product, {
      excludeExtraneousValues: true,
    });
  }

  async removeProducts(id: string): Promise<void> {
    await this.productRepository.removeProducts(id);
    this.logger.log(`Products have deleted successfully`);
    await this.logsService.logActivity(id, 'deleteProduct');
  }

  async myProducts(id: string): Promise<ExistingProductDTO[]> {
    const isUser = await this.userService.findUserById(id);
    if (!isUser) {
      this.logger.error(`User does not exist!`);
      throw new Error();
    }
    const products = await this.productRepository.findMyProducts(id);
    if (!products) {
      this.logger.error(`Could not retrieve products`);
      throw new Error();
    }
    const productDTOArray: ExistingProductDTO[] = products.map((product) =>
      plainToClass(ExistingProductDTO, product, {
        excludeExtraneousValues: true,
      }),
    );
    await this.logsService.logActivity(id, 'findProduct');
    this.logger.log(`Products retrieved successfully`);
    return productDTOArray;
  }
}
