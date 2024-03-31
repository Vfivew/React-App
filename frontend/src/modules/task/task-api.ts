import axios from "axios";

import { CreateTask, Task } from "~/libs/types/types";

class TaskApi {
  private baseurl: string;

  constructor(baseurl: string) {
    this.baseurl = baseurl;
  }

  async getAllTasks() {
    const res = await axios.get(`${this.baseurl}/tasks`);

    return res.data;
  }

  async patchTask(updatedTaskData: Task) {
    const res = await axios.patch(
      `${this.baseurl}/tasks/${updatedTaskData.id}`,
      updatedTaskData,
      {}
    );
    return res.data;
  }

  async createTask(createTask: CreateTask) {
    const res = await axios.post(`${this.baseurl}/tasks`, createTask, {});

    return res.data;
  }

  async deleteTask(deleteTaskId: number) {
    const res = await axios.delete(`${this.baseurl}/tasks/${deleteTaskId}`);

    return res.data;
  }
}

export { TaskApi };
