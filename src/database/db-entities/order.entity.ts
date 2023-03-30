import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OrderType } from "../../utils/types";

@Entity("Order")
export default class OrderEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({type: "decimal", precision: 6, scale: 2, default: 0})
    total: number;
    @Column({type: "decimal", precision: 6, scale: 2, default: 0})
    payedWith: number;
    @Column({type: "decimal", precision: 6, scale: 2, default: 0})
    change: number;
    @Column()
    type: OrderType;
}