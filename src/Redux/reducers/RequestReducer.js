import { requestActions } from "../actionCreators";

const InitialRequestDetails = {
  requestDetails: {},
  foundationMembers: {},
  requestSummary: {},
  requestSolutions: {},
  requestStakes: {},
  requestVotes: {},
};

const requestReducer = (state = InitialRequestDetails, action) => {
  switch (action.type) {
    case requestActions.UPDATE_REQUEST_DETAILS: {
      return { ...state, requestDetails: action.payload };
    }
    case requestActions.UPDATE_RFAI_FOUNDATION_MEMBERS: {
      return { ...state, foundationMembers: action.payload };
    }
    case requestActions.UPDATE_REQUEST_SUMMARY: {
      return { ...state, requestSummary: action.payload };
    }
    case requestActions.UPDATE_REQUEST_SOLUTIONS: {
      return { ...state, requestSolutions: action.payload };
    }
    case requestActions.UPDATE_REQUEST_STAKES: {
      return { ...state, requestStakes: action.payload };
    }
    case requestActions.UPDATE_REQUEST_VOTES: {
      return { ...state, requestVotes: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default requestReducer;
