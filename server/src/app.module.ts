import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LogsModule } from './logs/logs.module';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [
    AuthModule, ProductModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
       uri: config.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
     }),
    UserModule,
    LogsModule,
    TradeModule],    
})
export class AppModule {}
