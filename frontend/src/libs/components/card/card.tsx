import { Draggable } from "react-beautiful-dnd";
import { FaCalendarCheck, FaRegEdit } from "react-icons/fa";
import moment from "moment";
import { FaTrash } from "react-icons/fa6";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";

import { actions as taskActions } from "~/modules/task/task";
import { ReactDropdown } from "~/libs/components/dropdown/dropdown";
import { Badge } from "~/libs/components/badge/badge";
import { EditTaskModalWindow } from "~/libs/components/modals/edit-task/edit-task";
import { useAppDispatch, useAppSelector, useState } from "~/libs/hooks/hooks";
import {
  ColumnData,
  DropDownAction as DropDownType,
  Task,
} from "~/libs/types/types";
import { DropDown } from "~/libs/enums/enums";

import styles from "./styles.module.css";

type Properties = {
  task: Task;
  index: number;
};

const Card = ({ task, index }: Properties) => {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.columnReducer.columns);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditTask = (task: Task) => {
    dispatch(taskActions.patchTask({ ...task, columnId: task.columnId }));
  };

  const dropdownItem = [
    {
      title: (
        <div className={styles["drop-item"]}>
          <FaRegEdit className={styles["icon"]} /> Edit
        </div>
      ),
      action: DropDown.EDIT,
    },
    {
      title: (
        <div className={styles["delete-item"]}>
          <FaTrash className={styles["icon"]} /> Delete
        </div>
      ),
      action: DropDown.DELETE,
    },
  ];

  const onSelect = (item: DropDownType | ColumnData) => {
    if ("action" in item) {
      if (item.action == DropDown.DELETE) {
        dispatch(taskActions.deleteTask(task.id));
      }

      if (item.action == DropDown.EDIT) {
        openModal();
      }
    } else {
      dispatch(taskActions.patchTask({ ...task, columnId: item.id }));
    }
  };

  return (
    <Draggable
      key={task.title}
      draggableId={task.title + task.id}
      index={index}
      isDragDisabled={isModalOpen}
    >
      {(provided) => (
        <div
          className={styles["provider-wrapper"]}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div {...provided.dragHandleProps} className={styles["provider"]}>
            <h3 className={styles["card-title"]} onClick={openModal}>
              {task.title}
            </h3>
            <ReactDropdown
              options={dropdownItem}
              onSelect={(item: DropDownType) => onSelect(item)}
            >
              {" "}
              <BiDotsVerticalRounded />{" "}
            </ReactDropdown>
          </div>

          <p className={styles["text"]}>
            {task.description?.length > 100
              ? `${task.description.slice(0, 100)}...`
              : task.description}
          </p>
          <div className={styles["calendar-wrapper"]}>
            <FaCalendarCheck className={styles["calendar-icon"]} />
            <p className={styles["calendar-text"]}>
              {moment(task.due_date).format("YYYY/MM/DD")}
            </p>
          </div>

          <Badge classNames={[styles["badge"]]}>
            <div className={styles["drop-item"]}>
              <GoDotFill /> {task.priority}
            </div>
          </Badge>

          <ReactDropdown
            classNames={[styles["dropdown"]]}
            options={columns}
            onSelect={(item: DropDownType) => onSelect(item)}
          >
            MOVE TO:{" "}
          </ReactDropdown>

          <EditTaskModalWindow
            isOpen={isModalOpen}
            onClose={closeModal}
            onEditTask={handleEditTask}
            task={task}
          />
        </div>
      )}
    </Draggable>
  );
};

export { Card };
