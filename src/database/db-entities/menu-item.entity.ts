import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("MenuItem")
export default class MenuItemEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column({type: "decimal", precision: 6, scale: 2, default: 0})
    price: number;
    @Column()
    stock: number;
    @Column()
    menuId: string;
}