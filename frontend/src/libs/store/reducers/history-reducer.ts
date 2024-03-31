// import { HistoryData } from "~/libs/types/history-data.type";
import { HistoryAction } from "../libs/enums/enums";

export interface HistoryState {
  history: any[];
  isLoading: boolean;
}

const initialState: HistoryState = {
  history: [],
  isLoading: false,
};

const historyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HistoryAction.GET_HISTORY:
      return {
        ...state,
        history: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export { historyReducer };
