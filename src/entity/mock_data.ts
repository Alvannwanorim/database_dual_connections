import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MockData {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    gender: string;

    @Column()
    ip_address: string;

}
