import { PartialType } from "@nestjs/swagger";

export class ExpenseTrackerPgsqlDto {
	clientCode: string;
	amount: number;
	description?: string;
	date?: string;
	category?: string;
}

export class UpdateExpenseTrackerPgsqlDto extends PartialType(ExpenseTrackerPgsqlDto) { }
