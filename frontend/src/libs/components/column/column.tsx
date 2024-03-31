import { Draggable, Droppable } from "react-beautiful-dnd";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit, FaPlus } from "react-icons/fa";

import { Card } from "~/libs/components/card/card";
import { CreateCard } from "~/libs/components/create-card/create-card";
import { ReactDropdown } from "~/libs/components/dropdown/dropdown";
import { actions as columnActions } from "~/modules/column/column";
import { EditableTitle } from "~/libs/components/editable-title/editable-title";
import { CreateTaskModal } from "~/libs/components/modals/create-task/create-task-modal";
import { actions as taskActions } from "~/modules/task/task";
import {
  useAppDispatch,
  useState,
  useAppSelector,
} from "~/libs/hooks/hooks";
import {
  ColumnData,
  CreateTask,
  Task,
  DropDownAction as DropDownType,
} from "~/libs//types/types";
import { DropDown } from "~/libs/enums/enums";

import styles from "./styles.module.css";


const Column = ({
  columnData,
  index,
}: {
  columnData: ColumnData;
  index: number;
}) => {
  const tasks = useAppSelector((state) => state.taskReducer.tasks);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusInput, setFocusInput] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTask = (task: CreateTask) => {
    task.columnId = columnData.id;
    dispatch(taskActions.createTask(task));
  };

  const dropdownItem = [
    {
      title: (
        <div className={styles["drop-item"]}>
          <FaEdit className={styles["icon"]} /> Edit
        </div>
      ),
      action: DropDown.EDIT,
    },
    {
      title: (
        <div className={styles["drop-item"]}>
          <FaPlus className={styles["icon"]} /> Add new card
        </div>
      ),
      action: DropDown.ADD,
    },
    {
      title: (
        <div className={styles["delete-item"]}>
          <FaTrashCan className={styles["icon"]} /> Delete
        </div>
      ),
      action: DropDown.DELETE,
    },
  ];
  const onSelect = (item: DropDownType) => {
    if (item.action == DropDown.DELETE) {
      dispatch(columnActions.deleteColumn(columnData.id));
    }

    if (item.action == DropDown.ADD) {
      openModal();
    }

    if (item.action == DropDown.EDIT) {
      setFocusInput(true);
    }
  };

  const handleTitleSave = (newTitle: string) => {
    setFocusInput(false);
    dispatch(columnActions.patchColumn({ ...columnData, title: newTitle }))
    .then(()=> dispatch(taskActions.getAllTasks()))
  };

  console.log(tasks)
  return (
    <>
      <Draggable draggableId={columnData.title + columnData.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={styles["column-wrapper"]}
          >
            <div {...provided.dragHandleProps} className={styles["column"]}>
              <EditableTitle
                initialTitle={columnData.title}
                onSave={handleTitleSave}
                focusInput={focusInput}
              />
              <ReactDropdown
                options={dropdownItem}
                onSelect={(item: DropDownType) => onSelect(item)}
              >
                {" "}
                <BiDotsVerticalRounded />{" "}
              </ReactDropdown>
            </div>

            <CreateCard
              classNames={[styles["create-card"]]}
              columnId={columnData.id}
            />

            <Droppable
              droppableId={columnData.title + columnData.id}
              key={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${styles["column-content"]} ${
                    snapshot.isDraggingOver
                      ? `${styles["snapshot-target-background"]}`
                      : `${styles["snapshot-background"]}`
                  }`}
                >
                  {tasks
                    .filter((t: Task) => t.columnId === columnData.id)
                    .sort(
                      (first: Task, second: Task) =>
                        first.position - second.position
                    )
                    .map((task: Task, index: number) => (
                      <Card key={task.title} task={task} index={index} />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateTask={handleCreateTask}
      />
    </>
  );
};

export { Column };
