import { Product } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
