import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export default class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    username: string;
    @Column()
    password: string;
}