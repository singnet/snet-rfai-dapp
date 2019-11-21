import { requestActions } from "../actionCreators";

const InitialRequestDetails = {
  requestDetails: {},
  foundationMembers: {},
  requestSummary: {
    Open: 0,
    Active: 0,
    Closed: 0,
    Expired: 0,
    Rejected: 0,
    Completed: 0,
  },
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

// Get the Request Details for a Given Request Id
export const requestDetailsById = (state, requestId) => {
  const selectedRequestDetails = state.requestReducer.requestDetails.find(req => req.request_id === requestId);
  return selectedRequestDetails;
};

export default requestReducer;
