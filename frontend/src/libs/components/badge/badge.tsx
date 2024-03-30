import { ReactNode } from "react";

import { getValidClassNames } from "~/utils/get-valid-class-names/get-valid-class-names.helper";

import styles from "./styles.module.css";

type Properties = {
  classNames?: string[];
  children: ReactNode;
};

const Badge: React.FC<Properties> = (props) => {
  const badgeStyles = getValidClassNames(styles["badge"], props.classNames);

  return <div className={badgeStyles}>{props.children}</div>;
};

export { Badge };
