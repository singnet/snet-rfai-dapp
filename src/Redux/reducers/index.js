import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import errorReducer from "./ErrorReducer";
import loaderReducer from "./LoaderReducer";
import stylesReducer from "./StylesReducer";

import requestReducer from "./RequestReducer";

const rootReducer = combineReducers({
  userReducer,
  errorReducer,
  loaderReducer,
  stylesReducer,
  requestReducer,
});

export default rootReducer;
