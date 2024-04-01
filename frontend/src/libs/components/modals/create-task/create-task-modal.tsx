import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaSortAmountDown, FaTimes } from "react-icons/fa";

import { ReactDropdown } from "~/libs/components/dropdown/dropdown";
import { CreateTask, DropDownAction } from "~/libs/types/types";
import { Priority } from "~/libs/enums/enums";
import { useState } from "~/libs/hooks/hooks";
import { Button } from "~/libs/components/button/button";
import { Input } from "~/libs/components/input/input";

import styles from "./styles.module.css";

type Properties = {
  isOpen: boolean;
  onCreateTask: (createdTask: CreateTask) => void;
  onClose: () => void;
};

const CreateTaskModal: React.FC<Properties> = ({
  isOpen,
  onCreateTask,
  onClose,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("LOW");
  const [isError, setIsError] = useState(false);

  const dropdownItems = Object.keys(Priority).map((element) => ({
    title: <div className={styles["drop-item"]}>{element}</div>,
    action: element,
  }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDate(e.target.value);
  };

  const handleDropdownChange = (item: DropDownAction) => {
    setTaskPriority(item.action);
  };

  const clearForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setTaskPriority(Priority.LOW);
    setIsError(false);
  };

  const handleCreateTask = () => {
    if (taskTitle.trim() !== "" && taskDate !== "") {
      onCreateTask({
        title: taskTitle,
        description: taskDescription,
        due_date: new Date(taskDate),
        priority: taskPriority,
        columnId: 0,
      });
      setIsError(false);
      clearForm();
      onClose();
    } else {
      setIsError(true);
    }
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      clearForm();
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className={styles["modal"]}>
          <div
            className={styles["blur-background"]}
            onClick={handleModalClick}
          ></div>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-section"]}>
              <section className={styles["modal-title-wrapper"]}>
                <h2 className={styles["modal-title"]}>Create Task</h2>
                <Button className={styles["button"]} onClick={onClose}>
                  <FaTimes className={styles["icon"]} />
                </Button>
              </section>
              <label htmlFor="task-title" className={styles["input-title"]}>
                Task Title
              </label>
              <Input
                type="text"
                id="task-title"
                value={taskTitle}
                onChange={handleTitleChange}
                className={styles["modal-input"]}
                placeholder="Task title"
              />

              <label
                htmlFor="task-description"
                className={styles["input-title"]}
              >
                Task Description
              </label>
              <textarea
                id="task-description"
                value={taskDescription}
                onChange={handleDescriptionChange}
                className={styles["modal-textarea"]}
                placeholder="Task description"
                rows={5}
              ></textarea>
              <ReactDropdown
                options={dropdownItems}
                onSelect={(item: DropDownAction) => handleDropdownChange(item)}
              >
                <div className={styles["modal-dropdown"]}>
                  <FaSortAmountDown className={styles["icon"]} />
                  {taskPriority} <BiDotsVerticalRounded />
                </div>
              </ReactDropdown>

              <label htmlFor="task-date" className={styles["input-title"]}>
                Due date
              </label>
              <Input
                type="date"
                id="task-date"
                value={taskDate}
                onChange={handleDateChange}
                className={styles["modal-input"]}
                placeholder="Select date"
              />
              <Button
                style="submit"
                type="submit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateTask();
                }}
              >
                Create
              </Button>
              <Button
                style="cancel"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                  clearForm();
                }}
              >
                Cancel
              </Button>
              {isError && (
                <span className={styles["error"]}>Fill all inputs</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { CreateTaskModal };
