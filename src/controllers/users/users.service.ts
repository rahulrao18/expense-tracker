import { Injectable } from '@nestjs/common';
import { tc, MethodOutputDto, GenericApplicationResponseDto } from 'src/commons/dtos/commons';
import { UsersPgsqlSharedClient } from 'src/shared/clients/pgsql/users/users.pgsql.shared.client';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
    constructor(private readonly pgClient: UsersPgsqlSharedClient) {}

    async create(dto: CreateUserDto) {
        const [err, clientResp] = await tc(this.pgClient.create(dto));
        if (err) return new MethodOutputDto({ exception: { message: 'PG client error on create', error: err } });
        // return new MethodOutputDto({ result: { message: 'Expense created', data: clientResp } });

        return new GenericApplicationResponseDto({ status: 200, code: 'CREATE', message: clientResp.result.message, data: { result: clientResp.result.data  }});
        // return clientResp as MethodOutputDto;
    }

    async update(id: string, dto: UpdateUserDto) {
        const [err, clientResp] = await tc(this.pgClient.update(id, dto));
        if (err) return new MethodOutputDto({ exception: { message: 'PG client error on update', error: err } });
        return clientResp as MethodOutputDto;
    }

    async delete(id: string) {
        const [err, clientResp] = await tc(this.pgClient.delete(id));
        if (err) return new MethodOutputDto({ exception: { message: 'PG client error on delete', error: err } });
        return clientResp as MethodOutputDto;
    }

    async findAll() {
        const [err, clientResp] = await tc(this.pgClient.findAll());
        if (err) return new MethodOutputDto({ exception: { message: 'PG client error on list', error: err } });
        return clientResp as MethodOutputDto;
    }
}
