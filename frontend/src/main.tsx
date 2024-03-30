import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import App from "./App.js";
import store from "./libs/store/store.js";

import "~/assets/css/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
