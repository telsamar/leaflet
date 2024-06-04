import { createStore } from "redux";
import reducer from "./data/reducers";

const store = createStore(
  reducer,
);

export default store;
