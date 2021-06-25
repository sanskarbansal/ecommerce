import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer, composedEnhancer);
