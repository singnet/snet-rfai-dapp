import { rfaiContractActions } from "../actionCreators";

const InitialRequestDetails = {
  rfaiTokenBalance: 0,
  rfaiMinStake: 0,
  rfaiMaxStakers: 0,
  rfaiOwner: 0x0,
};

const rfaiContractReducer = (state = InitialRequestDetails, action) => {
  switch (action.type) {
    case rfaiContractActions.UPDATE_RFAI_TOKEN_BALANCE: {
      return { ...state, rfaiTokenBalance: action.payload };
    }
    case rfaiContractActions.UPDATE_RFAI_MIN_STAKE: {
      return { ...state, rfaiMinStake: action.payload };
    }
    case rfaiContractActions.UPDATE_RFAI_MAX_STAKERS: {
      return { ...state, rfaiMaxStakers: action.payload };
    }
    case rfaiContractActions.UPDATE_RFAI_OWNER: {
      return { ...state, rfaiOwner: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default rfaiContractReducer;
