import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export enum transactionType {
	DEBIT = 'DEBIT',
	CREDIT = 'CREDIT',
}

@Entity({ name: 'expenses' })
export class ExpenseTrackerEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', nullable: true })
	user_id: string;

	@Column({ type: 'varchar', nullable: true })
	account_id: string;

	@Column({ type: 'numeric' })
	amount: number;

	@Column({ type: 'text', nullable: true })
	description: string | null;

	@Column({ type: 'enum', enum: transactionType })
	transaction_type: transactionType;

	@Column({ type: 'timestamptz' })
	date: Date;

	@Column({ type: 'varchar', nullable: true })
	category: string | null;

	@CreateDateColumn({ type: 'timestamptz' })
	created_on: Date;

	@UpdateDateColumn({ type: 'timestamptz' })
	updated_on: Date;
}
