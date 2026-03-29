import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { tc, MethodOutputDto } from '../../../../commons/dtos/commons';
import { AccountEntity } from './accounts.entity';
import { CreateAccountDto, UpdateAccountDto } from './accounts.dto';
@Injectable()
export class AccountsPgsqlSharedClient {
    constructor(
        @InjectRepository(AccountEntity) private readonly repo: Repository<AccountEntity>,
        private readonly dataSource: DataSource,
    ) { }

    async create(dto: CreateAccountDto) {
        const item = this.repo.create(dto);
        const [err, saved] = await tc(this.repo.save(item));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to create Account', error: err } });
        return new MethodOutputDto({ result: { message: 'Account created', data: saved } });
    }

    async update(id: string, dto: UpdateAccountDto) {
        const [updateErr] = await tc(this.repo.update(id, dto));
        if (updateErr) return new MethodOutputDto({ exception: { message: 'Failed to update Account', error: updateErr } });

        const [fetchErr, saved] = await tc(this.repo.findOne({ where: { id } }));
        if (fetchErr) return new MethodOutputDto({ exception: { message: 'Failed to fetch updated Account', error: fetchErr } });
            return new MethodOutputDto({ result: { message: 'Account updated', data: saved } });
    }

    async delete(id: string) {
        const [err, result] = await tc(this.repo.delete(id));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to delete Account', error: err } });
        const ok = (result.affected ?? 0) > 0;
        if (!ok) return new MethodOutputDto({ exception: { message: 'Account not found', error: null } });
        return new MethodOutputDto({ result: { message: 'Account deleted', data: ok } });
    }

    async findAll() {
        const [err, list] = await tc(this.repo.find({ order: { created_on: 'DESC' } }));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to list Accounts', error: err } });
        return new MethodOutputDto({ result: { message: 'Accounts retrieved', data: list } });
    }

    async findOne(id: string) {
        const [err, entity] = await tc(this.repo.findOne({ where: { id } }));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to find Account', error: err } });
        if (!entity) return new MethodOutputDto({ exception: { message: 'Account not found', error: null } });
        return new MethodOutputDto({ result: { message: 'Account found', data: entity } });
    }
}