import { useDispatch } from "react-redux";
import store from "~/libs/store/store.js";

const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

export { useAppDispatch };
