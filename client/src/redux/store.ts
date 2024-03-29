import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk, logger));

export default createStore(rootReducer, composedEnhancer);
