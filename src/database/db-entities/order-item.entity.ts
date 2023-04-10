import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("OrderItem")
export default class OrderItemEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    quantity: number;
    @Column({type: "decimal", precision: 6, scale: 2, default: 0})
    subtotal: number;
    @Column()
    menuItemId: string;
    @Column()
    orderId: string;
}