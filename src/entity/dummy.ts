import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Dummy {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: string;

}
