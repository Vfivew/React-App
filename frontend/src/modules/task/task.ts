import { TaskApi } from "./task-api";
import { getAllTasks, patchTask, createTask, deleteTask } from "./action";

const taskApi = new TaskApi(import.meta.env.VITE_API_BASE_URL);

const allActions = {
  deleteTask,
  getAllTasks,
  patchTask,
  createTask,
};

export { taskApi };
export { allActions as actions };
