import { ColumnData } from "~/libs/types/column-data.type";
import { ColumnAction } from "../libs/enums/enums";

export interface ColumState {
  columns: ColumnData[];
  isLoading: boolean;
}

const initialState: ColumState = {
  columns: [],
  isLoading: false,
};

const columnReducer = (state = initialState, action : any) => {
  switch (action.type) {
    case ColumnAction.GET_COLUMNS:
      return {
        ...state,
        columns: action.payload,
        isLoading: false,
      };
    case ColumnAction.PATCH_COLUMN:
      const index = state.columns.findIndex(
        (column) => column.id === action.payload.id
      );
      if (index !== -1) {
        const updatedColumns = [...state.columns];
        updatedColumns[index] = action.payload;

        return {
          ...state,
          columns: [...updatedColumns],
          isLoading: false,
        };
      } else {
        return state;
      }

    case ColumnAction.CREATE_COLUMN:
      const updatedColumn = [...state.columns, action.payload].sort(
        (first: ColumnData, second: ColumnData) =>
          first.position - second.position
      );

      return {
        ...state,
        columns: [...updatedColumn],
        isLoading: false,
      };

    case ColumnAction.DELETE_COLUMN:
      const columnAfterDelete = [...state.columns]
        .filter((column: ColumnData) => column.id != action.payload)
        .sort(
          (first: ColumnData, second: ColumnData) =>
            first.position - second.position
        );

      return {
        ...state,
        columns: [...columnAfterDelete],
        isLoading: false,
      };
    default:
      return state;
  }
};

export {columnReducer};