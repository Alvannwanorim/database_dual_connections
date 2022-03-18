import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class ClearanceTgs {
  @PrimaryColumn()
  ik_number: string;
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
  tg_lead_name: string;
  @Column()
  tg_lead_unique_member_id: string;
  @Column()
  face_rec_status: string;
  @Column()
  scanned_receipt_flag: string;
  @Column()
  scanned_receipt_code: string;
  @Column()
  season: string;
  @Column()
  crop: string;
  @Column()
  mapping_field: string;
  @Column()
  voucher_id: string;
  @Column()
  bvn: string;
  @Column()
  prepaid_card_details: string;
  @Column()
  no_prepaid_flag: string;
  @Column()
  template: string;
  @Column()
  IMEI: string;
  @Column()
  latitude: string;
  @Column()
  longitude: string;
  @Column()
  edit_count: string;
  @Column()
  clearance_date: string;
  @Index("location_id")
  @Column()
  location_id: string;
  @Column()
  app_version: string;
  @Index("date_updated")
  @UpdateDateColumn()
  date_updated: Date;
  @Column()
  location_pickup_id: string;
}
