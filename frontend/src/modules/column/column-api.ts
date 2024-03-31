import axios from "axios";

import { ColumnData, CreateColumnData } from "~/libs/types/types";

class ColumnApi {
  private baseurl: string;

  constructor(baseurl: string) {
    this.baseurl = baseurl;
  }

  async getAllTaskColumns() {
    const res = await axios.get(`${this.baseurl}/task-columns`);

    return res.data;
  }

  async patchColumn(updatedColumnData: ColumnData) {
    const res = await axios.patch(
      `${this.baseurl}/task-columns/${updatedColumnData.id}`,
      updatedColumnData
    );

    return res.data;
  }

  async createColumn(createColumn: CreateColumnData) {
    const res = await axios.post(`${this.baseurl}/task-columns`, createColumn);

    return res.data;
  }

  async deleteColumn(deleteColumnId: number) {
    const res = await axios.delete(
      `${this.baseurl}/task-columns/${deleteColumnId}`
    );

    return res.data;
  }
}

export { ColumnApi };
