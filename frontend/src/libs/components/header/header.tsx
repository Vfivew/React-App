import { FaPlus, FaRandom } from "react-icons/fa";

import { CreateTaskListModal } from "~/libs/components/modals/create-task-list/create-task-list";
import { History } from "~/libs/components/modals/history/history";
import { actions as columnActions } from "~/modules/column/column";
import { useAppDispatch, useState } from "~/libs/hooks/hooks";
import { CreateColumnData } from "~/libs/types/types";
import { Button } from "../button/button";

import styles from "./styles.module.css";

type Properties = {
  classNames?: string[];
  title: string;
};

const Header: React.FC<Properties> = (props: Properties) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  const handleCreateTaskList = (createdTaskList: CreateColumnData) => {
    dispatch(columnActions.createColumn(createdTaskList));
  };

  return (
    <>
      <header className={styles["header"]}>
        <div className={styles["header-inner"]}>
          <h1 className={styles["title"]}>{props.title}</h1>
          <div className={styles["button-wrapper"]}>
            <Button className={styles["button"]} onClick={openHistoryModal}>
              <FaRandom className={styles["icon"]} />
              <p>History</p>
            </Button>
            <Button className={styles["button"]} onClick={openModal}>
              <FaPlus className={styles["icon"]} />
              <p>Create new list</p>
            </Button>
          </div>
        </div>
      </header>
      <div className={styles["history"]}></div>
      <CreateTaskListModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateList={handleCreateTaskList}
      />
      <History isOpen={isHistoryModalOpen} onClose={closeHistoryModal} />
    </>
  );
};

export { Header };
