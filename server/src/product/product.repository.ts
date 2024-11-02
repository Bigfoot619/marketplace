import { Injectable } from '@nestjs/common';
import { ProductDocument } from './product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExistingProductDTO } from './dtos/existing-product.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(
    product: Partial<ProductDocument>,
  ): Promise<ProductDocument> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async findByTitle(title: string): Promise<ProductDocument> {
    return await this.productModel.findOne({ title });
  }

  async findAllProduct(): Promise<ProductDocument[]> {
    return await this.productModel.find();
  }

  async findMyProducts(id: string): Promise<ProductDocument[]> {
    return await this.productModel.find({ user_id: id });
  }

  async findProductById(id: string): Promise<ProductDocument> {
    return await this.productModel.findById(id);
  }

  async updateProductById(
    id: string,
    product: Partial<ExistingProductDTO>,
  ): Promise<ProductDocument> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  async removeProduct(id: string): Promise<ProductDocument> {
    return await this.productModel.findByIdAndDelete(id);
  }

  async removeProducts(id: string): Promise<void> {
    await this.productModel.deleteMany({ user_id: id });
  }
}
