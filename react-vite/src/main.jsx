import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { restoreCSRF, csrfFetch } from "./redux/.csrf";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import * as todoListActions from './redux/todolist';
import * as dailiesActions from './redux/dailies'
import * as tagActions from './redux/tags'

import "./index.css";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.todoListActions = todoListActions;
  window.dailiesActions = dailiesActions
  window.tagActions = tagActions
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
