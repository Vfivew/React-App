import { AutoMap } from '@automapper/classes';
import { Task } from '../../tasks/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class TaskColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @AutoMap()
  @Column('float', { nullable: true })
  position: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  task: Task[];
}
