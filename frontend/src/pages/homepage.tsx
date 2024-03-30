import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import { useAppDispatch, useAppSelector, useEffect } from "../libs/hooks/hooks";
import { ColumnData } from "../libs/types/column-data.type";
import { actions as taskActions } from "~/modules/task/task";
import { actions as columnActions } from "~/modules/column/column";
import { Column } from "~/libs/components/column/column";
import { onDrag } from "~/helpers/drag.helper";

import styles from "./styles.module.css";

const Homepage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(taskActions.getAllTasks());
    dispatch(columnActions.getAllTaskColumns());
  }, [dispatch]);

  const columns = useAppSelector((state) => state.columnReducer.columns);
  const tasks = useAppSelector((state) => state.taskReducer.tasks);

  const handleDrag = (result: DropResult) => {
    onDrag(result, columns, tasks, dispatch);
  };

  return (
    <div className={styles["main"]}>
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles["main-inner"]}
            >
              {[...columns]
                .sort(
                  (first: ColumnData, second: ColumnData) =>
                    first.position - second.position
                )
                .map((column: ColumnData, index: number) => (
                  <Column key={column.id} columnData={column} index={index} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Homepage;
