import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { tc, MethodOutputDto } from '../../../../commons/dtos/commons';
import { UserEntity } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersPgsqlSharedClient {
    constructor(
        @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
        private readonly dataSource: DataSource,
    ) { }

    async create(dto: CreateUserDto) {
        const item = this.repo.create(dto);
        const [err, saved] = await tc(this.repo.save(item));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to create User', error: err } });
        return new MethodOutputDto({ result: { message: 'User created', data: saved } });
    }

    async update(id: string, dto: UpdateUserDto) {
        const [updateErr] = await tc(this.repo.update(id, dto));
        if (updateErr) return new MethodOutputDto({ exception: { message: 'Failed to update User', error: updateErr } });

        const [fetchErr, saved] = await tc(this.repo.findOne({ where: { id } }));
        if (fetchErr) return new MethodOutputDto({ exception: { message: 'Failed to fetch updated User', error: fetchErr } });
            return new MethodOutputDto({ result: { message: 'User updated', data: saved } });
    }

    async delete(id: string) {
        const [err, result] = await tc(this.repo.delete(id));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to delete User', error: err } });
        const ok = (result.affected ?? 0) > 0;
        if (!ok) return new MethodOutputDto({ exception: { message: 'User not found', error: null } });
        return new MethodOutputDto({ result: { message: 'User deleted', data: ok } });
    }

    async findAll() {
        const [err, list] = await tc(this.repo.find({ order: { created_on: 'DESC' } }));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to list Users', error: err } });
        return new MethodOutputDto({ result: { message: 'Users retrieved', data: list } });
    }

    async findOne(id: string) {
        const [err, entity] = await tc(this.repo.findOne({ where: { id } }));
        if (err) return new MethodOutputDto({ exception: { message: 'Failed to find User', error: err } });
        if (!entity) return new MethodOutputDto({ exception: { message: 'User not found', error: null } });
        return new MethodOutputDto({ result: { message: 'User found', data: entity } });
    }
}