import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 60})
    title: string;

    @Column('text')
    description: string;

    @Column('decimal')
    price: number;

    @Column('decimal')
    quantityOnHand: number;
}