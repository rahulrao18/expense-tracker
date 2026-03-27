import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ExpenseTrackerEntity } from './expense.tracker.entity';
import {
    ExpenseTrackerPgsqlDto,
    UpdateExpenseTrackerPgsqlDto,
} from './expense.tracker.dto';
import { tc, MethodOutputDto } from '../../../../commons/dtos/commons';

@Injectable()
export class ExpenseTrackerPgsqlSharedClient {
    constructor(
        @InjectRepository(ExpenseTrackerEntity) private readonly repo: Repository<ExpenseTrackerEntity>,
        private readonly dataSource: DataSource,
    ) { }

    async create(dto: ExpenseTrackerPgsqlDto) {
        const item = this.repo.create(dto);
        const [err, saved] = await tc(this.repo.save(item));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to create expense', error: err } });
        return new MethodOutputDto({ result: { message: 'Expense created', data: saved } });
    }

    async update(id: string, dto: UpdateExpenseTrackerPgsqlDto) {
        const [updateErr] = await tc(this.repo.update(id, dto));
        if (updateErr) return new MethodOutputDto({ exception: { message: 'Failed to update expense', error: updateErr } });

        const [fetchErr, saved] = await tc(this.repo.findOne({ where: { id } }));
        if (fetchErr) return new MethodOutputDto({ exception: { message: 'Failed to fetch updated expense', error: fetchErr } });
            return new MethodOutputDto({ result: { message: 'Expense updated', data: saved } });
    }

    async delete(id: string) {
        const [err, result] = await tc(this.repo.delete(id));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to delete expense', error: err } });
        const ok = (result.affected ?? 0) > 0;
        if (!ok) return new MethodOutputDto({ exception: { message: 'Expense not found', error: null } });
        return new MethodOutputDto({ result: { message: 'Expense deleted', data: ok } });
    }

    async findAll() {
        const [err, list] = await tc(this.repo.find({ order: { createdAt: 'DESC' } }));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to list expenses', error: err } });
        return new MethodOutputDto({ result: { message: 'Expenses retrieved', data: list } });
    }

    async findOne(id: string) {
        const [err, entity] = await tc(this.repo.findOne({ where: { id } }));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to find expense', error: err } });
        if (!entity) return new MethodOutputDto({ exception: { message: 'Expense not found', error: null } });
        return new MethodOutputDto({ result: { message: 'Expense found', data: entity } });
    }
}