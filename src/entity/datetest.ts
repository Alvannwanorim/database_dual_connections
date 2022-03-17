import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export default class DateTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  word: string;

  @CreateDateColumn({ type: "varchar" })
  created_at: Date;
}
