import { Dispatch } from "redux";
import { HistoryAction } from "~/libs/store/libs/enums/history-action.enum";
import { HistoryApi } from "./history-api";

const historyApi = new HistoryApi(import.meta.env.VITE_API_BASE_URL);

const getHistory = () => async (dispatch: Dispatch) => {
  try {
    const history = await historyApi.getHistory();
    dispatch({
      type: HistoryAction.GET_HISTORY,
      payload: history,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_OCCURRED",
      payload: error,
    });
  }
};

export { getHistory };
