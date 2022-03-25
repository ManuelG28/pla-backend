import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierController } from "./supplier.controller";
import { Supplier } from "./supplier.entity";
import { SupplierService } from "./supplier.service";

@Module({
    imports: [TypeOrmModule.forFeature([Supplier])],
    providers: [SupplierService],
    controllers: [SupplierController],
  })
  export class SupplierModule {}
  