import { ReactNode } from "react";

import { useEffect, useRef, useState } from "~/libs/hooks/hooks";
import { DropDownAction } from "~/libs/types/types";
import { Button } from "~/libs/components/button/button";

import styles from "./styles.module.css";

type Properties = {
  options: DropDownAction[];
  onSelect: (option: DropDownAction) => void;
  classNames?: string[];
  children: ReactNode;
};

const ReactDropdown: React.FC<Properties> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: DropDownAction) => {
    props.onSelect(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`${props.classNames?.join(" ")} ${styles["dropdown-wrapper"]}`}
      ref={dropdownRef}
    >
      <Button
        className={styles["button"]}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        style="plain"
      >
        <span className={styles["button-text"]}>{props.children}</span>
      </Button>

      {isOpen && (
        <div
          id="dropdown"
          className={styles["dropdown"]}
          style={{ top: "calc(100% + 8px)", right: 0 }}
        >
          <ul
            className={styles["list"]}
            aria-labelledby="dropdownDefaultButton"
          >
            {props.options.map((option, index) => (
              <li key={index}>
                <Button
                  onClick={() => handleOptionClick(option)}
                  className={styles["list-button"]}
                >
                  {option.title}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { ReactDropdown };
