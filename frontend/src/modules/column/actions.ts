import { Dispatch } from "redux";
import { ColumnApi } from "./column-api";
import { ColumnAction } from "~/libs/store/libs/enums/enums";
import { ColumnData, CreateColumnData } from "~/libs/types/types";

const columnApi = new ColumnApi(import.meta.env.VITE_API_BASE_URL);

const getAllTaskColumns = () => async (dispatch: Dispatch) => {
  try {
    const columns = await columnApi.getAllTaskColumns();
    dispatch({
      type: ColumnAction.GET_COLUMNS,
      payload: columns,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_OCCURRED",
      payload: error,
    });
  }
};

const patchColumn =
  (updatedColumnData: ColumnData) => async (dispatch: Dispatch) => {
    try {
      const updatedColumn = await columnApi.patchColumn(updatedColumnData);
      dispatch({
        type: ColumnAction.PATCH_COLUMN,
        payload: updatedColumn,
      });
    } catch (error) {
      dispatch({
        type: "ERROR_OCCURRED",
        payload: error,
      });
    }
  };

const deleteColumn = (deleteColumnId: number) => async (dispatch: Dispatch) => {
  try {
    await columnApi.deleteColumn(deleteColumnId);
    dispatch({
      type: ColumnAction.DELETE_COLUMN,
      payload: deleteColumnId,
    });
  } catch (error) {
    dispatch({
      type: "ERROR_OCCURRED",
      payload: error,
    });
  }
};

const createColumn =
  (createColumn: CreateColumnData) => async (dispatch: Dispatch) => {
    try {
      const newColumn = await columnApi.createColumn(createColumn);
      dispatch({
        type: ColumnAction.CREATE_COLUMN,
        payload: newColumn,
      });
    } catch (error) {
      dispatch({
        type: "ERROR_OCCURRED",
        payload: error,
      });
    }
  };

export { getAllTaskColumns, patchColumn, deleteColumn, createColumn };
