import { Supplier } from 'src/supplier/supplier.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Quotation {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Supplier)
    @JoinColumn()
    supplier: Supplier

    @Column()
    totalPriceForCorn: number;

    @Column()
    totalPriceForCoffee: number;

    @Column()
    totalPriceForPotato: number;

    @Column()
    totalPriceForCarrot: number;
}
