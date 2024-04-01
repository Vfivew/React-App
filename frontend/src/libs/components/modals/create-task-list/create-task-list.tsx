import { useState } from "../../../hooks/hooks.js";
import { CreateColumnData } from "../../../types/types";
import { Button } from "~/libs/components/button/button.js";
import { Input } from "~/libs/components/input/input.js";

import styles from "./styles.module.css";
import { FaTimes } from "react-icons/fa";

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
  const [isError, setIsError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListTitle(event.target.value);
  };

  const clearForm = () => {
    setListTitle("");
    setIsError(false);
  };

  const handleCreateList = () => {
    if (listTitle.trim() !== "") {
      onCreateList({ title: listTitle });
      setIsError(false);
      clearForm();
      onClose();
    }
    else {
      setIsError(true);
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
            <div className={styles["modal-section"]}>
              <section className={styles["modal-title-wrapper"]}>
                <h2 className={styles["modal-title"]}>Create List</h2>
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
                value={listTitle}
                onChange={handleTitleChange}
                className={styles["modal-input"]}
                placeholder="task title"
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

export { CreateTaskListModal };
