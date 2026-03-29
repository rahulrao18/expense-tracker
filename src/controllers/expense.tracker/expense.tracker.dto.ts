import { PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsEnum } from 'class-validator';
import { transactionType } from 'src/shared/clients/pgsql/expense.tracker/expense.tracker.entity';

export class CreateExpenseDto {
	@IsString()
	user_id: string;

	@IsString()
	account_id: string;

	@IsNumber()
	amount: number;

	@IsEnum(transactionType)
	transaction_type: transactionType;

	@IsString()
	description: string;

	@IsDate()
	date: Date;

	@IsString()
	category: string;
}

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) { }

