import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class LastSyncTime {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    last_sync_time: string

}
