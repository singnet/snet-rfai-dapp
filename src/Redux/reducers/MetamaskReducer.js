import { metamaskActions } from "../actionCreators";

const InitialRequestDetails = {
  metamaskDetails: {
    isConnected: false,
    account: "0x0",
    networkId: 0,
  },
};

const metamaskReducer = (state = InitialRequestDetails, action) => {
  switch (action.type) {
    case metamaskActions.UPDATE_METAMASK_DETAILS: {
      return { ...state, metamaskDetails: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default metamaskReducer;
