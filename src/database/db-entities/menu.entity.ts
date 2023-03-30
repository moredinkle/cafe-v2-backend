import { MenuStatus } from '../../utils/types';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Menu")
export default class MenuEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    date: Date;
    @Column()
    status: MenuStatus;
}
