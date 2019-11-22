//import { API } from "aws-amplify";
import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
//import { initializeAPIOptions } from "../../utility/API";

//import { fetchAuthenticatedUser } from "./UserActions";
import { loaderActions } from "./";

export const UPDATE_REQUEST_DETAILS = "UPDATE_REQUEST_DETAILS";
export const UPDATE_REQUEST_SOLUTIONS = "UPDATE_REQUEST_SOLUTIONS";
export const UPDATE_REQUEST_STAKES = "UPDATE_REQUEST_STAKES";
export const UPDATE_REQUEST_VOTES = "UPDATE_REQUEST_VOTES";
export const UPDATE_REQUEST_SUMMARY = "UPDATE_REQUEST_SUMMARY";
export const UPDATE_RFAI_FOUNDATION_MEMBERS = "UPDATE_RFAI_FOUNDATION_MEMBERS";

// Fetching The the Requests
const fetchRequestAPI = async (requestStatus, metamaskDetails, isMyRequests) => {
  let requester = "0x0";

  if (metamaskDetails.isTxnsAllowed) {
    requester = metamaskDetails.account;
  }

  const url = `${APIEndpoints.RFAI.endpoint}${APIPaths.RFAI_REQUEST}?status=${requestStatus}&requester=${requester}&my_request=${isMyRequests}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchRequestData = (requestStatus, metamaskDetails, isMyRequests) => async dispatch => {
  try {
    dispatch(loaderActions.startRequestLoader);

    const response = await fetchRequestAPI(requestStatus, metamaskDetails, isMyRequests);

    dispatch(fetchRequestSuccess(response.data));
    dispatch(loaderActions.stopRequestLoader);
  } catch (exp) {
    dispatch(loaderActions.stopRequestLoader);
  }
};

const fetchRequestSuccess = response => dispatch => {
  dispatch(updateRequestDetails(response));
};

const updateRequestDetails = data => dispatch => {
  dispatch({ type: UPDATE_REQUEST_DETAILS, payload: data });
};

// Fetching The RFAI Foundation Members
const fetchFoundationMemberAPI = async () => {
  const url = `${APIEndpoints.RFAI.endpoint}${APIPaths.RFAI_FOUNDATION_MEMBERS}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchFoundationMembersData = () => async dispatch => {
  try {
    const response = await fetchFoundationMemberAPI();
    dispatch(fetchFoundationMemberSuccess(response.data));
  } catch (exp) {
    throw exp;
  }
};

const fetchFoundationMemberSuccess = response => dispatch => {
  dispatch(updateFoundationMember(response));
};

const updateFoundationMember = data => dispatch => {
  dispatch({ type: UPDATE_RFAI_FOUNDATION_MEMBERS, payload: data });
};

// Fetching The the Requests Summary report for Tabs
const fetchRequestSummaryAPI = async (metamaskDetails, isMyRequests) => {
  let requester = "0x0";

  if (metamaskDetails.isTxnsAllowed) {
    requester = metamaskDetails.account;
  }

  const url = `${APIEndpoints.RFAI.endpoint}${APIPaths.RFAI_REQUEST_SUMMARY}?requester=${requester}&my_request=${isMyRequests}`;
  const response = await fetch(url);
  return response.json();
};

export const fetchRequestSummaryData = (metamaskDetails, isMyRequests) => async dispatch => {
  try {
    const response = await fetchRequestSummaryAPI(metamaskDetails, isMyRequests);
    dispatch(fetchRequestSummarySuccess(response.data));
  } catch (exp) {
    throw exp;
  }
};

const fetchRequestSummarySuccess = response => dispatch => {
  dispatch(updateRequestSummary(response));
};

const updateRequestSummary = data => dispatch => {
  dispatch({ type: UPDATE_REQUEST_SUMMARY, payload: data });
};

// Fetching The the Request Solution
const fetchRequestSolutionAPI = async requestId => {
  // const apiName = APIEndpoints.RFAI.name;
  // const apiPath = `${APIPaths.RFAI_REQUEST_SOLUTION}?requestId=${requestId}`;
  // const apiOptions = initializeAPIOptions(token);
  // return API.get(apiName, apiPath, apiOptions);

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
  // const apiName = APIEndpoints.RFAI.name;
  // const apiPath = `${APIPaths.RFAI_REQUEST_STAKE}?requestId=${requestId}`;
  // const apiOptions = initializeAPIOptions(token);
  // return API.get(apiName, apiPath, apiOptions);

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
  // const apiName = APIEndpoints.RFAI.name;
  // const apiPath = `${APIPaths.RFAI_REQUEST_VOTE}?requestId=${requestId}`;
  // const apiOptions = initializeAPIOptions(token);

  // return API.get(apiName, apiPath, apiOptions);

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
