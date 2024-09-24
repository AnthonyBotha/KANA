import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import avatarReducer from "./avatar";
import avatarPartsReducer from "./avatarpart";
import todoListReducer from "./todolist";
import userInventoryReducer from "./inventory";

const rootReducer = combineReducers({
  session: sessionReducer,
  avatar: avatarReducer,
  avatarParts: avatarPartsReducer,
  todoList: todoListReducer,
  inventory: userInventoryReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
