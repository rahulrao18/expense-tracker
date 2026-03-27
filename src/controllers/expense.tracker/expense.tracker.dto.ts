import { PartialType } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsISO8601 } from 'class-validator';

export class CreateExpenseDto {
	@IsString()
	clientCode: string;

	@IsNumber()
	amount: number;

	@IsString()
	@IsOptional()
	description?: string;

	@IsISO8601()
	@IsOptional()
	date?: string;

	@IsString()
	@IsOptional()
	category?: string;
}

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) { }

