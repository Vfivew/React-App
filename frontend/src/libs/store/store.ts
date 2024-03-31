import { configureStore } from "@reduxjs/toolkit";

import { columnReducer, historyReducer, taskReducer } from "./reducers/reducers";

const store = configureStore({
  reducer: { taskReducer, columnReducer, historyReducer },
});

export default store;
