import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ExpenseTrackerEntity } from './clients/pgsql/expense.tracker/expense.tracker.entity';
import { ExpenseTrackerPgsqlSharedClient } from './clients/pgsql/expense.tracker/expense.tracker.pgsql.shared.client';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
                const logger = new Logger('PgSqlSharedClientModule');
                // const isProd = configService.get<boolean>('SYSTEM.IS_PROD');

                const options: TypeOrmModuleOptions = {
                    type: (configService.get<string>('PGSQL.TYPE') as any) || 'postgres',
                    entities: [__dirname + '/clients/pgsql/**/*.entity{.ts,.js}'],
                    synchronize: false,
                    migrationsRun: false,
                    extra: {
                        max: 10,
                        min: 2,
                        idleTimeoutMillis: 30000,
                        connectionTimeoutMillis: 2000,
                    },
                    url: configService.get<string>('PGSQL.URL') || process.env.DATABASE_URL,
                    schema: configService.get<string>('PGSQL.SCHEMA') || 'public',
                };

                logger.log(`TypeORM options: ${JSON.stringify({
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
        TypeOrmModule.forFeature([ExpenseTrackerEntity]),
    ],
    providers: [ExpenseTrackerPgsqlSharedClient],
    exports: [ExpenseTrackerPgsqlSharedClient],
})
export class PgSqlSharedClientModule { }