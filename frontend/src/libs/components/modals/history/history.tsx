import moment from "moment";
import { FaTimes } from "react-icons/fa";

import { useAppDispatch, useAppSelector, useEffect } from "~/libs/hooks/hooks";
import { TaskHistory } from "~/libs/types/types";
import { actions as historyActions } from "~/modules/history/history";
import { Button } from "~/libs/components/button/button";

import styles from "./styles.module.css";

type Properties = {
  isOpen: boolean;
  onClose: () => void;
};

const History: React.FC<Properties> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.historyReducer.history);

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    dispatch(historyActions.getHistory());
  }, [dispatch, isOpen]);

  return (
    <>
      {isOpen && (
        <div className={styles["modal"]}>
          <div
            className={styles["blur-background"]}
            onClick={handleModalClick}
          ></div>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-title"]}>
              <h3 className={styles["title"]}>History</h3>
              <Button className={styles["button"]} onClick={onClose}>
                <FaTimes className={styles["icon"]} />
              </Button>
            </div>
            <ul className={styles["modal-list"]}>
              {history.map((record: TaskHistory, index: number) => (
                <li key={index} className={styles["list-item"]}>
                  <p className={styles["list-text"]}>{record.description}</p>
                  <br />
                  <span className={styles["list-data"]}>
                    {moment(record.created_at).format("MMMM Do YYYY, h:mm:ss")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export { History };
