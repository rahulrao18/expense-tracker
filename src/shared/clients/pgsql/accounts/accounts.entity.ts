import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'accounts' })
export class AccountEntity {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({ type: 'varchar', nullable: true })
    user_id: string;

    @Column({ type: 'varchar', nullable: true })
    account_name: string;

    @Column({ type: 'float', nullable: true })
    balance: number;

    @CreateDateColumn({ type: 'timestamptz' })
    created_on: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_on: Date;
}