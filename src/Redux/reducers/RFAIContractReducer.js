import { rfaiContractActions } from "../actionCreators";

const InitialRequestDetails = {
  rfaiTokenBalance: 0,
};

const tokenReducer = (state = InitialRequestDetails, action) => {
  switch (action.type) {
    case rfaiContractActions.UPDATE_RFAI_TOKEN_BALANCE: {
      return { ...state, rfaiTokenBalance: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default tokenReducer;
