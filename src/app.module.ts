import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger';
import { Product } from './product/product.entity';
import { Quotation } from './quotation/quotation.entity';
import { Supplier } from './supplier/supplier.entity';
import { SupplierModule } from './supplier/supplier.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    extra:{
      sockethPath: process.env.DATABASE_HOST,
    },
    entities: [User, Quotation, Product, Supplier],
    synchronize: true,
  }), UserModule, SupplierModule],
  controllers: [AppController], 
  providers: [AppService],
})

export class AppModule implements NestModule {
  constructor(private connection: Connection) {}
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}