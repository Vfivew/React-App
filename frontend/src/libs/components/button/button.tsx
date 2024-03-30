import { getValidClassNames } from "~/utils/get-valid-class-names/get-valid-class-names.helper";

import styles from "./styles.module.css";

type Properties = {
  className?: string | undefined;
  onClick?: (e: any) => void;
  type?: "button" | "submit";
  children: React.ReactNode;
  style?: "submit" | "cancel" | "plain";
};

const Button: React.FC<Properties> = ({
  className,
  onClick,
  type = "button",
  children,
  style ="plain"
}) => {
  const buttonStyles = getValidClassNames(styles["button"], styles[style], className);

  return (
    <button className={buttonStyles} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export { Button };
