import { Task } from "~/libs/types/task.type";
import { TaskAction } from "../libs/enums/enums";

type TaskState = {
  tasks: Task[];
  isLoading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: true,
};

const taskReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TaskAction.GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
      };
    case TaskAction.PATCH_TASK:
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        const updatedTasks = [...state.tasks];
        updatedTasks[index] = action.payload;

        return {
          ...state,
          tasks: [...updatedTasks],
          isLoading: false,
        };
      } else {
        return state;
      }
    case TaskAction.CREATE_TASK:
      const updatedTasks = [...state.tasks, action.payload].sort(
        (first: Task, second: Task) => first.position - second.position
      );

      return {
        ...state,
        tasks: [...updatedTasks],
        isLoading: false,
      };
    case TaskAction.DELETE_TASK:
      const tasksAfterDelete = [...state.tasks]
        .filter((t: Task) => t.id != action.payload)
        .sort((first: Task, second: Task) => first.position - second.position);

      return {
        ...state,
        tasks: [...tasksAfterDelete],
        isLoading: false,
      };

    default:
      return state;
  }
};

export {taskReducer};