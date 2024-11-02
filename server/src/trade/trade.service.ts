import { Injectable, Logger } from '@nestjs/common';
import { LogsService } from 'src/logs/logs.service';
import { ExistingProductDTO } from 'src/product/dtos/existing-product.dto';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { CompleteProductDTO } from 'src/product/dtos/complete-product.dto';

@Injectable()
export class TradeService {
  private readonly logger = new Logger(TradeService.name);

  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly logsService: LogsService,
  ) {}

  async buyProduct(
    id: string,
    productTitle: Partial<ExistingProductDTO>,
  ): Promise<CompleteProductDTO> {
    try {
      const buyer = await this.userService.findUserById(id);
      const product = await this.productService.findProductByTitle(
        productTitle.title,
      );
      if (buyer.bank < product.price) {
        this.logger.error(`Insufficient Balance!`);
        throw new Error();
      }
      if (id === product.user_id) {
        this.logger.error(`Invalid Credentials!`);
        throw new Error();
      }
      const seller = await this.userService.findUserById(product.user_id.toString());
      const sellerBalance = seller.bank + product.price;
      const buyerBalance = buyer.bank - product.price;
      await this.userService.updateUserDetails(product.user_id.toString(), {
        bank: sellerBalance,
      });
      const buyerUpdated = await this.userService.updateUserDetails(id, {
        bank: buyerBalance,
      });
      const productId = await this.productService.findIdByTitle(
        productTitle.title,
      );
      const updatedProduct = await this.productService.updateProduct(
        productId,
        { user_id: id },
      );
      await this.logsService.logActivity(id, 'BuyProduct');
      const completeProduct: CompleteProductDTO = {
        product: updatedProduct,
        user: buyerUpdated,
      };
      return completeProduct;
    } catch (e) {
      throw new Error();
    }
  }

  async sellProduct(
    id: string,
    productTitle: Partial<ExistingProductDTO>,
  ): Promise<number> {
    const seller = await this.userService.findUserById(id);
    const product = await this.productService.findProductByTitle(
      productTitle.title,
    );
    if (id !== product.user_id){
      this.logger.error(`Invalid Credentials!`);
      throw new Error();
    }
    const sellerBalance = seller.bank + product.price * 0.8;
    //vault += product.price*0.2
    await this.userService.updateUserDetails(product.user_id.toString(), {
      bank: sellerBalance,
    });
    const productId = await this.productService.findIdByTitle(
      productTitle.title,
    );
    await this.productService.removeProduct(productId);
    await this.logsService.logActivity(id, 'SellProduct');
    return sellerBalance;
  }
}
