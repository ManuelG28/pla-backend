import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { accessSecretVersion } from './config/secretmanager.config';
import { LoggerMiddleware } from './middleware/logger';
import { Product } from './product/product.entity';
import { Project } from './project/project.entity';
import { ProjectModule } from './project/project.module';
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
    entities: [User, Quotation, Product, Supplier,Project],
    synchronize: true,
  }), UserModule, SupplierModule,ProjectModule],
  controllers: [AppController], 
  providers: [AppService],
})

export class AppModule implements NestModule {
  constructor(private connection: Connection) {}
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    accessSecretVersion('projects/964659245205/secrets/DATABASE/versions/1');
  }
}