import { BiDotsVerticalRounded } from "react-icons/bi";
import moment from "moment";
import axios from "axios";

import { useState, useEffect } from "~/libs/hooks/hooks.js";
import { ReactDropdown } from "~/libs/components/dropdown/dropdown";
import {
  DropDownAction,
  Task,
  TaskHistory,
} from "~/libs/types/types";
import { Priority } from "~/libs/enums/enums";
import { Button } from "~/libs/components/button/button.js";
import { Input } from "~/libs/components/input/input.js";

import styles from "./styles.module.css";

interface Properties {
  isOpen: boolean;
  onEditTask: (editedTask: Task) => void;
  onClose: () => void;
  task: Task;
}

const EditTaskModalWindow: React.FC<Properties> = ({
  task,
  isOpen,
  onEditTask,
  onClose,
}) => {
  console.log(task);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskDate, setTaskDate] = useState(
    moment(task.due_date).format("YYYY-MM-DD")
  );
  const [taskPriority, setTaskPriority] = useState(task.priority);
  const [history, setHistory] = useState<TaskHistory[]>([]);

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

  useEffect(() => {
    if (isOpen) {
      setTaskTitle(task.title);
      setTaskDescription(task.description);
      setTaskDate(moment(task.due_date).format("YYYY-MM-DD"));
      setTaskPriority(task.priority);
    }
  }, [isOpen, task]);

  const handleEditTask = () => {
    if (taskTitle.trim() !== "" && taskDate !== "Invalid date") {
      const editedTask: Task = {
        ...task,
        title: taskTitle,
        description: taskDescription,
        due_date: new Date(taskDate),
        priority: taskPriority,
      };
      onEditTask(editedTask);
      onClose();
      console.log(taskDate);
    }
  };

  const fetchData = async (id: number) => {
    try {
      const baseurl = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.get(
        `${baseurl}/history-of-changes-task/${id}`
      );

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(task.id);
  }, []); // here

  console.log(task);
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
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
            <section className={styles["modal-left-block"]}>
              <h3 className={styles["modal-title"]}>Update Task</h3>
              <label htmlFor="task-title" className={styles["input-title"]}>
                Task Title
              </label>
              <Input
                type="text"
                id="task-title"
                value={taskTitle}
                onChange={handleTitleChange}
                placeholder="Enter task title"
              />
              <div className={styles["status"]}>
                Status:{" "}
                <span className={styles["status-title"]}>
                  {task.column.title}
                </span>
              </div>
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
                placeholder="Enter task description"
                rows={5}
              ></textarea>

              <ReactDropdown
                options={dropdownItems}
                onSelect={handleDropdownChange}
                classNames={["mb-4"]}
              >
                <div className={styles["modal-dropdown"]}>
                  {taskPriority} <BiDotsVerticalRounded />
                </div>
              </ReactDropdown>

              <label htmlFor="task-date" className={styles["input-title"]}>
                Task due date
              </label>
              <Input
                type="date"
                id="task-date"
                value={taskDate}
                onChange={handleDateChange}
                placeholder="Select date"
              />

              <Button
                style="submit"
                type="submit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditTask();
                }}
              >
                Update
              </Button>
              <Button
                style="cancel"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                Cancel
              </Button>
            </section>

            <section className={styles["modal-right-block"]}>
              <h3 className={styles["modal-title"]}>Activity</h3>
              <ul className={styles["modal-list"]}>
                {history.map((record: TaskHistory, index: number) => (
                  <li key={index} className={styles["list-item"]}>
                    <p className={styles["list-text"]}>{record.description}</p>
                    <br />
                    <span className={styles["list-data"]}>
                      {moment(record.created_at).format(
                        "MMMM Do YYYY, h:mm:ss"
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export { EditTaskModalWindow };