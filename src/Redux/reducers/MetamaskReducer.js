import { metamaskActions } from "../actionCreators";

const InitialRequestDetails = {
  metamaskDetails: {
    isConnected: false,
    account: "0x0",
    networkId: 0,
    isTxnsAllowed: false,
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

// Get the current state of MetaMask Connection
export const metamaskState = state => {
  return state.metamaskReducer.metamaskDetails;
};

export default metamaskReducer;
