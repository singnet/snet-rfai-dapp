//import { API } from "aws-amplify";
import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
//import { initializeAPIOptions } from "../../utility/API";

//import { fetchAuthenticatedUser } from "./UserActions";
import { loaderActions, errorActions } from "./";

export const UPDATE_REQUEST_DETAILS = "UPDATE_REQUEST_DETAILS";
export const UPDATE_REQUEST_SOLUTIONS = "UPDATE_REQUEST_SOLUTIONS";
export const UPDATE_REQUEST_STAKES = "UPDATE_REQUEST_STAKES";
export const UPDATE_REQUEST_VOTES = "UPDATE_REQUEST_VOTES";
export const UPDATE_REQUEST_SUMMARY = "UPDATE_REQUEST_SUMMARY";
export const UPDATE_RFAI_FOUNDATION_MEMBERS = "UPDATE_RFAI_FOUNDATION_MEMBERS";
export const UPDATE_REQUEST_CLAIM_SUBMITTER = "UPDATE_REQUEST_CLAIM_SUBMITTER";
export const UPDATE_REQUEST_CLAIM_STAKER = "UPDATE_REQUEST_CLAIM_STAKER";

// General function to check the status of the API Responses
function checkStatus(response) {
  if (!response.ok) {
    throw new Error(response.error);
  }
  return response;
}

// Fetching The the Requests
const fetchRequestAPI = async (requestStatus, metamaskDetails, isMyRequests) => {
  let requester = "0x0";

  try {
    if (metamaskDetails.isTxnsAllowed) {
      requester = metamaskDetails.account;
    }
    const url = `${APIEndpoints.RFAI.endpoint}${APIPaths.RFAI_REQUEST}?status=${requestStatus}&requester=${requester}&my_request=${isMyRequests}`;
    // const response = await fetch(url);
    // return response.json();

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(checkStatus)
        .then(response => {
          resolve(response.json());
        })
        .catch(error => {
          reject(error);
        });
    });
  } catch (exp) {
    throw exp;
  }
};

export const fetchRequestData = (requestStatus, metamaskDetails, isMyRequests) => async dispatch => {
  try {
    dispatch(errorActions.resetRequestDetailsError);
    dispatch(loaderActions.startRequestLoader);

    const response = await fetchRequestAPI(requestStatus, metamaskDetails, isMyRequests);

    dispatch(fetchRequestSuccess(response.data));
    dispatch(loaderActions.stopRequestLoader);
  } catch (exp) {
    dispatch(loaderActions.stopRequestLoader);
    dispatch(fetchRequestFailure(exp));
  }
};

const fetchRequestSuccess = response => dispatch => {
  dispatch(updateRequestDetails(response));
};

const fetchRequestFailure = error => dispatch => {
  dispatch(errorActions.updateRequestDetailsError(error));
};

const updateRequestDetails = data => dispatch => {
  dispatch({ type: UPDATE_REQUEST_DETAILS, payload: data });
};

// Fetching The RFAI Foundation Members
const fetchFoundationMemberAPI = async () => {
  try {
    const url = `${APIEndpoints.RFAI.endpoint}${APIPaths.RFAI_FOUNDATION_MEMBERS}`;
    const response = await fetch(url);
    return response.json();
  } catch (exp) {
    throw exp;
  }
};

export const fetchFoundationMembersData = () => async dispatch => {
  try {
    const response = await fetchFoundationMemberAPI();
    dispatch(fetchFoundationMemberSuccess(response.data));
  } catch (exp) {
    dispatch(fetchFoundationMemberError());
  }
};

const fetchFoundationMemberSuccess = response => dispatch => {
  dispatch(updateFoundationMember(response));
};

const updateFoundationMember = data => dispatch => {
  dispatch({ type: UPDATE_RFAI_FOUNDATION_MEMBERS, payload: data });
};

const fetchFoundationMemberError = () => dispatch => {
  // Foundation members is a background service to check the role of the user
  // In case of error considered as a non foundation member
  var data = {};
  dispatch({ type: UPDATE_RFAI_FOUNDATION_MEMBERS, payload: data });
};

// Fetching The the Requests Summary report for Tabs
const fetchRequestSummaryAPI = async (metamaskDetails, isMyRequests) => {
  let requester = "0x0";
  if (metamaskDetails.isTxnsAllowed) {
    requester = metamaskDetails.account;
  }
  try {
    const url = `${APIEndpoints.RFAI.endpoint}${APIPaths.RFAI_REQUEST_SUMMARY}?requester=${requester}&my_request=${isMyRequests}`;
    const response = await fetch(url);
    return response.json();
  } catch (exp) {
    throw exp;
  }
};

export const fetchRequestSummaryData = (metamaskDetails, isMyRequests) => async dispatch => {
  try {
    const response = await fetchRequestSummaryAPI(metamaskDetails, isMyRequests);
    dispatch(fetchRequestSummarySuccess(response.data));
  } catch (exp) {
    dispatch(fetchRequestSummaryError());
  }
};

const fetchRequestSummarySuccess = response => dispatch => {
  dispatch(updateRequestSummary(response));
};

const updateRequestSummary = data => dispatch => {
  dispatch({ type: UPDATE_REQUEST_SUMMARY, payload: data });
};

const fetchRequestSummaryError = () => dispatch => {
  // On Error set the summary data to default Zeros
  var data = {
    PENDING: 0,
    ACTIVE: 0,
    SOLUTION_VOTE: 0,
    COMPLETED: 0,
    INCOMPLETE: 0,
    REJECTED: 0,
    CLOSED: 0,
  };
  dispatch({ type: UPDATE_REQUEST_SUMMARY, payload: data });
};

// Fetching The the Request Solution
const fetchRequestSolutionAPI = async requestId => {
  const url = `${APIEndpoints.RFAI.endpoint}/request/${requestId}${APIPaths.RFAI_REQUEST_SOLUTION}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchRequestSolutionData = requestId => async dispatch => {
  try {
    dispatch(loaderActions.startRequestModalLoader);

    const response = await fetchRequestSolutionAPI(requestId);
    dispatch(fetchRequestSolutionSuccess(response.data));

    dispatch(loaderActions.stopRequestModalLoader);
  } catch (exp) {
    dispatch(loaderActions.stopRequestModalLoader);
  }
};

const fetchRequestSolutionSuccess = response => dispatch => {
  dispatch(updateRequestSolution(response));
};

const updateRequestSolution = data => dispatch => {
  dispatch({ type: UPDATE_REQUEST_SOLUTIONS, payload: data });
};

// Fetching The the Request Stake
const fetchRequestStakeAPI = async requestId => {
  const url = `${APIEndpoints.RFAI.endpoint}/request/${requestId}${APIPaths.RFAI_REQUEST_STAKE}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchRequestStakeData = requestId => async dispatch => {
  try {
    dispatch(loaderActions.startRequestModalLoader);

    const response = await fetchRequestStakeAPI(requestId);
    dispatch(fetchRequestStakeSuccess(response.data));

    dispatch(loaderActions.stopRequestModalLoader);
  } catch (exp) {
    dispatch(loaderActions.stopRequestModalLoader);
  }
};

const fetchRequestStakeSuccess = response => dispatch => {
  dispatch(updateRequestStake(response));
};

const updateRequestStake = data => dispatch => {
  dispatch({ type: UPDATE_REQUEST_STAKES, payload: data });
};

// Fetching The the Request Vote
const fetchRequestVoteAPI = async requestId => {
  const url = `${APIEndpoints.RFAI.endpoint}/request/${requestId}${APIPaths.RFAI_REQUEST_VOTE}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchRequestVoteData = requestId => async dispatch => {
  try {
    dispatch(loaderActions.startRequestModalLoader);

    const response = await fetchRequestVoteAPI(requestId);
    dispatch(fetchRequestVoteSuccess(response.data));

    dispatch(loaderActions.stopRequestModalLoader);
  } catch (exp) {
    dispatch(loaderActions.stopRequestModalLoader);
  }
};

const fetchRequestVoteSuccess = response => dispatch => {
  dispatch(updateRequestVote(response));
};

const updateRequestVote = data => dispatch => {
  dispatch({ type: UPDATE_REQUEST_VOTES, payload: data });
};

// Fetching The the Request Claims
const fetchRequestClaimAPI = async (metamaskDetails, claimBy) => {
  let url = "";
  let requester = "0x0";
  if (metamaskDetails.isTxnsAllowed) {
    requester = metamaskDetails.account;
  }

  if (claimBy === "submitter") {
    url = `${APIEndpoints.RFAI.endpoint}${APIPaths.RFAI_REQUEST_CLAIM_SUBMITTER}?user_address=${requester}`;
  } else {
    url = `${APIEndpoints.RFAI.endpoint}${APIPaths.RFAI_REQUEST_CLAIM_STAKER}?user_address=${requester}`;
  }

  const response = await fetch(url);
  return response.json();
};

export const fetchRequestClaimData = (metamaskDetails, claimBy) => async dispatch => {
  try {
    dispatch(loaderActions.startRequestModalLoader);

    if (claimBy === "submitter") {
      const response = await fetchRequestClaimAPI(metamaskDetails, claimBy);
      dispatch(fetchRequestSubmitterClaimSuccess(response.data));
    } else {
      // Will be for stacker
      const response = await fetchRequestClaimAPI(metamaskDetails, claimBy);
      dispatch(fetchRequestStackerClaimSuccess(response.data));
    }

    dispatch(loaderActions.stopRequestModalLoader);
  } catch (exp) {
    dispatch(loaderActions.stopRequestModalLoader);
  }
};

const fetchRequestSubmitterClaimSuccess = response => dispatch => {
  dispatch(updateRequestSubmitterClaim(response));
};

const updateRequestSubmitterClaim = data => dispatch => {
  dispatch({ type: UPDATE_REQUEST_CLAIM_SUBMITTER, payload: data });
};

const fetchRequestStackerClaimSuccess = response => dispatch => {
  dispatch(updateRequestStackerClaim(response));
};

const updateRequestStackerClaim = data => dispatch => {
  dispatch({ type: UPDATE_REQUEST_CLAIM_STAKER, payload: data });
};
