import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { LogsModule } from 'src/logs/logs.module';
import { ProductModule } from 'src/product/product.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ThrottlerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => [
      {
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      },
    ],
  }),
  forwardRef(() => ProductModule),
  forwardRef(() => LogsModule)],
  controllers: [UserController],
  providers: [UserService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
    UserRepository],
  exports: [UserService, UserRepository]
})
export class UserModule { }
