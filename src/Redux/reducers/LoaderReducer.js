import { loaderActions } from "../actionCreators";

const InitialLoaderState = {
  app: { loading: false, loaderHeader: "", loaderText: "" },
  aiServieList: false,
  RequestCallStatus: false,
  RequestModalCallStatus: false,
};

const loaderReducer = (state = InitialLoaderState, action) => {
  switch (action.type) {
    case loaderActions.START_APP_LOADER: {
      return { ...state, ...action.payload };
    }
    case loaderActions.STOP_APP_LOADER: {
      return { ...state, ...action.payload };
    }
    case loaderActions.START_AISERVICE_LIST_LOADER: {
      return { ...state, aiServieList: true };
    }
    case loaderActions.STOP_AISERVICE_LIST_LOADER: {
      return { ...state, aiServieList: false };
    }
    case loaderActions.START_REQUEST_LOADER: {
      return { ...state, RequestCallStatus: true };
    }
    case loaderActions.STOP_REQUEST_LOADER: {
      return { ...state, RequestCallStatus: false };
    }
    case loaderActions.START_REQUEST_MODAL_LOADER: {
      return { ...state, RequestModalCallStatus: true };
    }
    case loaderActions.STOP_REQUEST_MODAL_LOADER: {
      return { ...state, RequestModalCallStatus: false };
    }
    default: {
      return state;
    }
  }
};

export default loaderReducer;
