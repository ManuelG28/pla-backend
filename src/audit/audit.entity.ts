import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @Column('text')
  pdfInfo: string;
}
