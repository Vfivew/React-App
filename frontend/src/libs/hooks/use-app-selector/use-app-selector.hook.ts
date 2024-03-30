import { useSelector } from "react-redux";

import store from "../../store/store.js";

const useAppSelector =
	useSelector.withTypes<ReturnType<typeof store.getState>>();

export { useAppSelector };
