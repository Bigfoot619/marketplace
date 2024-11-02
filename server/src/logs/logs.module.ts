import { Module, forwardRef } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log, LogSchema } from './log.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsController } from './logs.controller';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    forwardRef(() => UserModule),
    forwardRef(() => ProductModule),
    forwardRef(() => LogsModule),
    ],
  providers: [LogsService],
  controllers: [LogsController],
  exports: [LogsService]
})
export class LogsModule {}
