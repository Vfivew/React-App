import { useState } from "../../../hooks/hooks.js";
import { CreateColumnData } from "../../../types/types";
import { Button } from "~/libs/components/button/button.js";
import { Input } from "~/libs/components/input/input.js";

import styles from "./styles.module.css";

type Properties = {
  isOpen: boolean;
  onCreateList: (createdTask: CreateColumnData) => void;
  onClose: () => void;
};

const CreateTaskListModal: React.FC<Properties> = ({
  isOpen,
  onCreateList,
  onClose,
}) => {
  const [listTitle, setListTitle] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListTitle(event.target.value);
  };

  const clearForm = () => {
    setListTitle("");
  };

  const handleCreateList = () => {
    if (listTitle.trim() !== "") {
      onCreateList({ title: listTitle });
      clearForm();
      onClose();
    }
  };

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
      clearForm();
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
            <section className={styles["modal-section"]}>
              <h2 className={styles["modal-title"]}>Create List</h2>
              <label htmlFor="task-title" className={styles["input-title"]}>
                Task Title
              </label>
              <Input
                type="text"
                id="task-title"
                value={listTitle}
                onChange={handleTitleChange}
                className={styles["modal-input"]}
                placeholder="Enter task title"
              />
              <Button
                style="submit"
                type="submit"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateList();
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
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export { CreateTaskListModal };
