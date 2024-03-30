import { AutoMap } from '@automapper/classes';
import { TaskColumn } from '../../task-columns/entities/task-column.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';


@Entity({ name: 'task' })
export class Task {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ nullable: true })
  title: string;

  @AutoMap()
  @Column({ nullable: true })
  description: string;

  @AutoMap()
  @Column('float', { nullable: true })
  position: number;

  @AutoMap()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @AutoMap()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @AutoMap()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  due_date: Date;

  @ManyToOne(() => TaskColumn, (taskColumn) => taskColumn.task)
  @JoinColumn({ name: 'column_id' })
  column: TaskColumn;
}
