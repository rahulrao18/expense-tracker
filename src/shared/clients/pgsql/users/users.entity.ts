import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserType {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

@Entity({ name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: true })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    email: string;

    @Column({ type: 'enum', enum: UserType, default: UserType.USER })
    type: UserType;

    @Column({ type: 'varchar', nullable: true })
    password: string;

    @CreateDateColumn({ type: 'timestamptz' })
    created_on: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_on: Date;
}