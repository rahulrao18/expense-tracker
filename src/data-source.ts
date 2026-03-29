import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
console.log('DB URL:', process.env.DATABASE_URL); 
export default new DataSource({
    type: 'postgres',
    url: 'process.env.DATABASE_URL',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: false,
});