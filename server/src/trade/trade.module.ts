import { Module, forwardRef } from '@nestjs/common';
import { LogsModule } from 'src/logs/logs.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => LogsModule),
    forwardRef(() => ProductModule),
  ],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}
