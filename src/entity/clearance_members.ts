import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class ClearanceMembers {
  @PrimaryColumn()
  unique_member_id: string;
  @Index("ik_number")
  @Column()
  ik_number: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Index("staff_id")
  @Column()
  staff_id: string;
  @Index("msb_id")
  @Column()
  msb_id: string;
  @Column()
  clearance_staff_id: string;
  @Column()
  clearance_field_size: string;
  @Column()
  IMEI: string;
  @Column()
  latitude: string;
  @Column()
  longitude: string;
  @Column()
  location_id: string;
  @Column()
  clearance_date: string;
  @Column()
  app_version: string;
  @Index("date_updated")
  @UpdateDateColumn()
  date_updated: Date;
}
