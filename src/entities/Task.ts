import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    ManyToOne,
    OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';
import { TaskStatus } from '../enums/TaskStatus';

@Entity('tasks')
class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.PENDING
    })
    status: TaskStatus;

    @ManyToOne(() => User, user => user.tasks)
    user: User;

    @ManyToOne(() => Task, task => task.subtasks, { nullable: true })
    parentTask: Task;

    @OneToMany(() => Task, task => task.parentTask)
    subtasks: Task[];

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Task };