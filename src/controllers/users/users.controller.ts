import {
    Controller,
    Post,
    Body,
    Put,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Controller(UsersController.PREFIX)
export class UsersController {
    private static readonly PREFIX = 'users';
    constructor(private readonly service: UsersService) {}

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return this.service.create(dto);
    }

    @Put(':id')
    async edit(@Param('id') id: string, @Body() dto: UpdateUserDto) {
       return this.service.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        return this.service.delete(id);
    }

    @Get()
    async list() {
       return this.service.findAll();
    }
}

