import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ExpenseTrackerEntity } from './clients/pgsql/expense.tracker/expense.tracker.entity';
import { ExpenseTrackerPgsqlSharedClient } from './clients/pgsql/expense.tracker/expense.tracker.pgsql.shared.client';
import { UserEntity } from './clients/pgsql/users/users.entity';
import { UsersPgsqlSharedClient } from './clients/pgsql/users/users.pgsql.shared.client';
import { AccountEntity } from './clients/pgsql/accounts/accounts.entity';
import { AccountsPgsqlSharedClient } from './clients/pgsql/accounts/account.pgsql.shared.client';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
                const logger = new Logger('PgSqlSharedClientModule');
                // const isProd = configService.get<boolean>('SYSTEM.IS_PROD');

                const options: TypeOrmModuleOptions = {
                    type: 'postgres',
                    entities: [__dirname + '/clients/pgsql/**/*.entity{.ts,.js}'],
                    migrations: [__dirname + '/migrations/*{.ts,.js}'],
                    synchronize: true,
                    migrationsRun: true,
                    extra: {
                        max: 10,
                        min: 2,
                        idleTimeoutMillis: 30000,
                        connectionTimeoutMillis: 2000,
                    },
                    url: process.env.DATABASE_URL,
                    schema: 'public',
                };

                logger.log(`TypeORM options: ${JSON.stringify({
                    url: process.env.DATABASE_URL,
                    type: options.type,
                    entities: options.entities,
                    synchronize: options.synchronize,
                    migrationsRun: options.migrationsRun,
                    schema: options.schema,
                })}`);

                return options;
            },
            imports: [ConfigModule],
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([ExpenseTrackerEntity, UserEntity, AccountEntity]),
    ],
    providers: [ExpenseTrackerPgsqlSharedClient, UsersPgsqlSharedClient, AccountsPgsqlSharedClient],
    exports: [ExpenseTrackerPgsqlSharedClient, UsersPgsqlSharedClient, AccountsPgsqlSharedClient],
})
export class PgSqlSharedClientModule { }