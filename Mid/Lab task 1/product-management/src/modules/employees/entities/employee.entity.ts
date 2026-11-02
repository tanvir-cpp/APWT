import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "employees" })
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  password!: string;

  @Column()
  age!: number;

  @Column({ name: "years_of_working" })
  yearsOfWorking!: number;
}
