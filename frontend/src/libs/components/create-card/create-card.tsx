import { Draggable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";

import { useAppDispatch, useState } from "~/libs/hooks/hooks";
import { CreateTaskModal } from "~/libs/components/modals/create-task/create-task-modal";
import { actions as taskActions } from "~/modules/task/task";
import { CreateTask } from "~/libs/types/types";

import styles from "./styles.module.css";

type Properties = {
  classNames?: string[];
  columnId: number;
};

const CreateCard: React.FC<Properties> = ({
  classNames = [],
  columnId,
}: Properties) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTask = (task: CreateTask) => {
    task.columnId = columnId;
    dispatch(taskActions.createTask(task));
  };

  return (
    <Draggable
      key={"create-card"}
      draggableId={"create-card"}
      index={0}
      isDragDisabled={true}
    >
      {(provided) => (
        <div
          className={`${styles["edit-wrapper"]} ${classNames.join(" ")}`}
          ref={provided.innerRef}
        >
          <section className={styles["add-card"]} onClick={openModal}>
            <FaPlus className={styles["icon"]} />
            <h3>Add new card</h3>
          </section>

          <CreateTaskModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onCreateTask={handleCreateTask}
          />
        </div>
      )}
    </Draggable>
  );
};

export { CreateCard };
