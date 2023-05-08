import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ExtraType } from "../../utils/types";

@Entity("MenuExtra")
export default class MenuExtraEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    description: string;
    @Column({type: "decimal", precision: 6, scale: 2, default: 0})
    amount: number;
    @Column()
    type: ExtraType;
    @Column()
    menuId: string;
}