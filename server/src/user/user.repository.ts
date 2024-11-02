import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { NewUserDTO } from './dtos/new-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  async createUser(newUser: NewUserDTO): Promise<UserDocument> {
    const user = new this.userModel(newUser);
    return user.save();
  }

  async removeUser(id: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async updateUser(
    id: string,
    updatePayload: Partial<NewUserDTO>,
  ): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, updatePayload, {
      new: true,
    });
  }

  async getAllUsers(): Promise<UserDocument[]> {
    const users: UserDocument[] = await this.userModel.find();
    return users;
  }
}
