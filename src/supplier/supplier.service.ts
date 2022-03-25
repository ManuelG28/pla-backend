import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommoditiesDto } from "src/commodities/commodities.dto";
import { Product } from "src/product/product.entity";
import { Quotation } from "src/quotation/quotation.entity";
import { Repository } from "typeorm";
import { Supplier } from "./supplier.entity";

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(Supplier)
        private supplierRepository: Repository<Supplier>,
    ) { }

    findSupplierLoad(): Promise<Supplier[]> {
        return this.supplierRepository.createQueryBuilder("supplier").leftJoinAndSelect("supplier.products","product").getMany()
    }

    calculateQuotation(commodities: CommoditiesDto, supplier: Supplier): Quotation {
        const products: Product[] = supplier.products;
        const productsForCorn = products.filter(product => product.type === "corn");
        const productsForCoffee = products.filter(product => product.type === "coffee");
        const productsForPotato = products.filter(product => product.type === "potato");
        const productsForCarrot = products.filter(product => product.type === "carrot");
        const quotation = new Quotation();
        quotation.supplier = supplier;
        quotation.totalPriceForCorn = productsForCorn.reduce((accumulator, { pricePerUnit }: { pricePerUnit: number }) => this.sumPrices(accumulator, pricePerUnit), 0) * commodities.poundsOfCorn;
        quotation.totalPriceForCoffee = productsForCoffee.reduce((accumulator, { pricePerUnit }: { pricePerUnit: number }) => this.sumPrices(accumulator, pricePerUnit), 0) * commodities.poundsOfCoffee;
        quotation.totalPriceForPotato = productsForPotato.reduce((accumulator, { pricePerUnit }: { pricePerUnit: number }) => this.sumPrices(accumulator, pricePerUnit), 0) * commodities.poundsOfPotato;
        quotation.totalPriceForCarrot = productsForCarrot.reduce((accumulator, { pricePerUnit }: { pricePerUnit: number }) => this.sumPrices(accumulator, pricePerUnit), 0) * commodities.poundsOfCarrot;
        return quotation;
    }

    sumPrices(accumulator: number, pricePerUnit: number) {
        return accumulator + pricePerUnit
    }
}