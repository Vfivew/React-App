import { useState } from "~/libs/hooks/hooks.js";
import { Input } from "~/libs/components/input/input.js";

import styles from "./styles.module.css";

type Properties = {
  initialTitle: string;
  onSave: (title: string) => void;
  focusInput: boolean;
};

const EditableTitle: React.FC<Properties> = ({
  initialTitle,
  onSave,
  focusInput,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(initialTitle);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleTitleSave = () => {
    setIsEditing(false);
    onSave(editedTitle);
  };

  return (
    <>
      {isEditing || focusInput ? (
        <Input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleSave}
          autoFocus
          className={styles["edit-input"]}
        />
      ) : (
        <h3 className={styles["title"]} onClick={handleEdit}>
          {editedTitle}
        </h3>
      )}
    </>
  );
};

export { EditableTitle };
