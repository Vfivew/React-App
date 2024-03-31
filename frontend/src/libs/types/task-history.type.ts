import { Task } from "./task.type";

type TaskHistory = {
  id: number;
  description: string;
  created_at: Date;
  task: Task;
  updated_at: Date;
};

export { type TaskHistory };
