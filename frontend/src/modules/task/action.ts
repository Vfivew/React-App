import { Dispatch } from "redux";
import { TaskAction } from "~/libs/store/libs/enums/enums";
import { CreateTask, Task } from "~/libs/types/types";
import { taskApi } from "./task";

const getAllTasks = () => async (dispatch: Dispatch) => {
  try {
    const tasks = await taskApi.getAllTasks();
    dispatch({
      type: TaskAction.GET_TASKS,
      payload: tasks,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_OCCURRED",
      payload: error,
    });
  }
};

const patchTask = (updatedTaskData: Task) => async (dispatch: Dispatch) => {
  try {
    const updatedTask = await taskApi.patchTask(updatedTaskData);
    dispatch({
      type: TaskAction.PATCH_TASK,
      payload: updatedTask,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_OCCURRED",
      payload: error,
    });
  }
};

const createTask = (createTask: CreateTask) => async (dispatch: Dispatch) => {
  try {
    const newTask = await taskApi.createTask(createTask);
    dispatch({
      type: TaskAction.CREATE_TASK,
      payload: newTask,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_OCCURRED",
      payload: error,
    });
  }
};

const deleteTask = (deleteTaskId: number) => async (dispatch: Dispatch) => {
  try {
    await taskApi.deleteTask(deleteTaskId);
    dispatch({
      type: TaskAction.DELETE_TASK,
      payload: deleteTaskId,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_OCCURRED",
      payload: error,
    });
  }
};

export { getAllTasks, patchTask, createTask, deleteTask };
