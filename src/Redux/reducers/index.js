import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import errorReducer from "./ErrorReducer";
import loaderReducer from "./LoaderReducer";
import stylesReducer from "./StylesReducer";

import requestReducer from "./RequestReducer";
import metamaskReducer from "./MetamaskReducer";

const rootReducer = combineReducers({
  userReducer,
  errorReducer,
  loaderReducer,
  stylesReducer,
  requestReducer,
  metamaskReducer,
});

export default rootReducer;
