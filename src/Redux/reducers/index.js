import { combineReducers } from "redux";
import userReducer from "./UserReducer";
import errorReducer from "./ErrorReducer";
import loaderReducer from "./LoaderReducer";
import stylesReducer from "./StylesReducer";

import requestReducer from "./RequestReducer";
import metamaskReducer from "./MetamaskReducer";
import tokenReducer from "./TokenReducer";
import rfaiContractReducer from "./RFAIContractReducer";

const rootReducer = combineReducers({
  userReducer,
  errorReducer,
  loaderReducer,
  stylesReducer,
  requestReducer,
  metamaskReducer,
  tokenReducer,
  rfaiContractReducer,
});

export default rootReducer;
