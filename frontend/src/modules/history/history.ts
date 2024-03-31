import { HistoryApi } from "./history-api";
import {
  getHistory,
} from "./actions";

const columnApi = new HistoryApi(import.meta.env.VITE_API_BASE_URL);

export { columnApi };
export const actions = {
  getHistory
};
