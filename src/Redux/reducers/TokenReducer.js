import { tokenActions } from "../actionCreators";

const InitialRequestDetails = {
  tokenBalance: 0,
  tokenAllowance: 0,
};

const tokenReducer = (state = InitialRequestDetails, action) => {
  switch (action.type) {
    case tokenActions.UPDATE_TOKEN_BALANCE: {
      return { ...state, tokenBalance: action.payload };
    }
    case tokenActions.UPDATE_TOKEN_ALLOWANCE: {
      return { ...state, tokenAllowance: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default tokenReducer;
