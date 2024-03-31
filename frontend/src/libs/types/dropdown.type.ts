import { Priority } from "../enums/enums";

type DropDown = {
  action: keyof typeof Priority;
  title: JSX.Element;
};

export { type DropDown };
