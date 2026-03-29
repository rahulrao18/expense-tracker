import { PartialType } from "@nestjs/swagger";
import { transactionType } from "./expense.tracker.entity";

export class ExpenseTrackerPgsqlDto {
	user_id: string;
	account_id: string;
	amount: number;
	transaction_type: transactionType;
	description: string;
	date: Date;
	category: string;
}

export class UpdateExpenseTrackerPgsqlDto extends PartialType(ExpenseTrackerPgsqlDto) { }
