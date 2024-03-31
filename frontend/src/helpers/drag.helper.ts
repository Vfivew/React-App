import { DropResult } from "react-beautiful-dnd";

import { ColumnData } from "~/libs/types/column-data.type";
import { Task } from "~/libs/types/task.type";
import { actions as taskActions } from "~/modules/task/task";
import { actions as columnActions } from "~/modules/column/column";

const onDrag = (
  result: DropResult,
  columns: ColumnData[],
  tasks: Task[],
  dispatch: any
) => {
  const { source, destination, draggableId } = result;

  if (!destination) {
    return;
  }
  if (result.type === "COLUMN" && source.index !== destination.index) {
    const movedColumn = columns.find(
      (column: ColumnData) => column.title + column.id === draggableId
    );
    let columnnsBefforeMove = [...columns].sort(
      (first: ColumnData, second: ColumnData) =>
        first.position - second.position
    );
    if (!movedColumn) {
      return;
    }

    let targetPosition = 0;

    if (destination.index === columnnsBefforeMove.length - 1) {
      targetPosition =
        columnnsBefforeMove[columnnsBefforeMove.length - 1].position + 500;
    } else if (destination.index == 0) {
      targetPosition = columnnsBefforeMove[0].position / 2;
    } else {
      targetPosition =
        (columnnsBefforeMove[destination.index - 1].position +
          columnnsBefforeMove[destination.index].position) /
        2;
    }

    const updatedColumn = { ...movedColumn, position: targetPosition };

    if (updatedColumn) {
      dispatch(columnActions.patchColumn(updatedColumn));
      return;
    }
  } else if (
    source.droppableId === destination.droppableId &&
    source.index !== destination.index
  ) {
    const movedTask = tasks.find((t: Task) => t.title + t.id === draggableId);
    if (!movedTask) {
      return;
    }
    let columntasks = tasks
      .filter((task: Task) => task.columnId == movedTask.columnId)
      .sort((first: Task, second: Task) => first.position - second.position);

    let targetPosition = 0;
    if (columntasks.length === 0) {
      targetPosition = 1000;
    } else if (destination.index === columntasks.length - 1) {
      targetPosition = columntasks[columntasks.length - 1].position + 500;
    } else if (destination.index === 0) {
      targetPosition = columntasks[0].position / 2;
    } else {
      targetPosition =
        (columntasks[destination.index - 1].position +
          columntasks[destination.index].position) /
        2;
    }

    if (movedTask) {
      const updatedTask = { ...movedTask, position: targetPosition };

      if (updatedTask) {
        dispatch(taskActions.patchTask(updatedTask));
      }
    }
  }

  if (source.droppableId !== destination.droppableId) {
    let targetListid = columns.filter(
      (c: ColumnData) => c.title + c.id == destination.droppableId
    )[0].id;
    const movedTask = tasks.find((t: Task) => t.title + t.id === draggableId);
    let columntasks = tasks
      .filter((task: Task) => task.columnId == targetListid)
      .sort((first: Task, second: Task) => first.position - second.position);
    let targetPosition = 0;

    if (columntasks.length === 0) {
      targetPosition = 1000;
    } else if (destination.index === columntasks.length) {
      targetPosition = columntasks[columntasks.length - 1].position + 500;
    } else if (destination.index === 0) {
      targetPosition = columntasks[0].position / 2;
    } else {
      targetPosition =
        (columntasks[destination.index - 1].position +
          columntasks[destination.index].position) /
        2;
    }

    if (movedTask) {
      const updatedTask = {
        ...movedTask,
        position: targetPosition,
        columnId: targetListid,
      };

      if (updatedTask) {
        dispatch(taskActions.patchTask(updatedTask));
      }
    }
  }
};

export { onDrag };
