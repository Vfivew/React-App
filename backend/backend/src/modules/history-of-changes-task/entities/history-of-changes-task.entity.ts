import { Task } from "src/modules/tasks/entities/task.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from "typeorm";

@Entity({name : "history_of_changes_task"})
export class HistoryOfChangesTask
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => Task)
    @JoinColumn({ name: "task_id" })
    task: Task;
}
