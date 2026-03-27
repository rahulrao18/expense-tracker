import {
	Controller,
	Post,
	Body,
	Put,
	Param,
	Delete,
	NotFoundException,
	HttpCode,
	HttpStatus,
	Get,
	InternalServerErrorException,
} from '@nestjs/common';
import { ExpenseTrackerService } from './expense.tracker.service';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.tracker.dto';
import { tc, MethodOutputDto } from 'src/commons/dtos/commons';

@Controller(ExpenseTrackerController.PREFIX)
export class ExpenseTrackerController {
	private static readonly PREFIX = 'expense-tracker';
	constructor(private readonly service: ExpenseTrackerService) {}

	@Post()
	async create(@Body() dto: CreateExpenseDto) {
		return this.service.create(dto);
	}

	@Put(':id')
	async edit(@Param('id') id: string, @Body() dto: UpdateExpenseDto) {
		const [err, resp] = await tc(this.service.update(id, dto));
		if (err) throw new InternalServerErrorException('Update failed');
		const out = resp as MethodOutputDto;
		if (out.exception) {
			if ((out.exception.message || '').toLowerCase().includes('not found'))
				throw new NotFoundException(out.exception.message);
			throw new InternalServerErrorException(out.exception.message);
		}
		return out.result.data;
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async remove(@Param('id') id: string) {
		const [err, resp] = await tc(this.service.delete(id));
		if (err) throw new InternalServerErrorException('Delete failed');
		const out = resp as MethodOutputDto;
		if (out.exception) {
			if ((out.exception.message || '').toLowerCase().includes('not found'))
				throw new NotFoundException(out.exception.message);
			throw new InternalServerErrorException(out.exception.message);
		}
	}

	// helper list route (optional)
	@Get()
	async list() {
		const [err, resp] = await tc(this.service.findAll());
		if (err) throw new InternalServerErrorException('List failed');
		const out = resp as MethodOutputDto;
		if (out.exception) throw new InternalServerErrorException(out.exception.message);
		return out.result.data;
	}
}

export default ExpenseTrackerController;

