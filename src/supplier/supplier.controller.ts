import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommoditiesDto } from "src/commodities/commodities.dto";
import { Product } from "src/product/product.entity";
import { Quotation } from "src/quotation/quotation.entity";
import { createQueryBuilder } from "typeorm";
import { Supplier } from "./supplier.entity";
import { SupplierService } from "./supplier.service";

@Controller()
export class SupplierController {

    constructor(private supplierService: SupplierService) { }

    @Post('createQuotation')
    async createQuotation(@Body() commodities: CommoditiesDto): Promise<Quotation[]> {
        const suppliers: Supplier[] = await this.supplierService.findSupplierLoad();
        const quotations: Quotation[] = suppliers.map(supplier =>
            this.supplierService.calculateQuotation(commodities, supplier)
        );
        return quotations;
    }
}