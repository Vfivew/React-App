import { ColumnApi } from "./column-api";
import {
  getAllTaskColumns,
  patchColumn,
  createColumn,
  deleteColumn,
} from "./actions";

const columnApi = new ColumnApi(import.meta.env.VITE_API_BASE_URL);

export { columnApi };
export const actions = {
  getAllTaskColumns,
  patchColumn,
  createColumn,
  deleteColumn,
};
