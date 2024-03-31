import { ColumnData } from "./column-data.type";

type Task = {
  id: number;
  title: string;
  description: string;
  position: number;
  updated_at: Date;
  columnId: number;
  created_at: Date;
  priority: string;
  due_date: Date;
  column: ColumnData;
};

export { type Task };
