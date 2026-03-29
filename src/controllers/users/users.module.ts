import { Module } from '@nestjs/common';
import { PgSqlSharedClientModule } from 'src/shared/pgsql.shared.client.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [ PgSqlSharedClientModule ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}