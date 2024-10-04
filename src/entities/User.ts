import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany, PrimaryGeneratedColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid';
import { hashPassword } from '../utils/crypto'
import {Task} from "./Task";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async setPassword() {
        try {
            this.password = await hashPassword(this.password)
        } catch (error) {
            console.log('Hash password error:', error)
        }
    }

}

export { User }