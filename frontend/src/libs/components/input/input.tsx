import { getValidClassNames } from "~/utils/get-valid-class-names/get-valid-class-names.helper";

import styles from "./styles.module.css";

type Properties = {
  className?: string | undefined;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  id?: string;
  autoFocus?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Properties> = ({
  value,
  onChange,
  placeholder,
  className,
  type = "text",
  id,
  autoFocus,
  onBlur,
}) => {
  const inputClasses = getValidClassNames(className, styles["modal-input"]);

  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
      className={inputClasses}
      placeholder={placeholder}
    />
  );
};

export { Input };
