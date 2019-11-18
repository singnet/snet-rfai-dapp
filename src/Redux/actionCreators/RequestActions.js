import { API } from "aws-amplify";
import { APIEndpoints, APIPaths } from "../../config/APIEndpoints";
import { initializeAPIOptions } from "../../utility/API";

import { fetchAuthenticatedUser } from "./UserActions";
import { loaderActions } from "./";

export const UPDATE_REQUEST_DETAILS = "UPDATE_REQUEST_DETAILS";
export const UPDATE_REQUEST_SOLUTIONS = "UPDATE_REQUEST_SOLUTIONS";
export const UPDATE_REQUEST_STAKES = "UPDATE_REQUEST_STAKES";
export const UPDATE_REQUEST_VOTES = "UPDATE_REQUEST_VOTES";
export const UPDATE_REQUEST_SUMMARY = "UPDATE_REQUEST_SUMMARY";
export const UPDATE_RFAI_FOUNDATION_MEMBERS = "UPDATE_RFAI_FOUNDATION_MEMBERS";

// Fetching The the Requests
const fetchRequestAPI = (token, requestStatus) => {
  // TODO: Need to pass this value once we have Web3 Integrated
  const requester = "0xf15BB7b899250a67C02fcEDA18706B79aC997884";

  const apiName = APIEndpoints.RFAI.name;
  const apiPath = `${APIPaths.RFAI_REQUEST}?status=${requestStatus}&requester=${requester}`;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, apiPath, apiOptions);

  // const response = await fetch(apiPath);
  // return response;
};

export const fetchRequestData = requestStatus => async dispatch => {
  try {
    dispatch(loaderActions.startRequestLoader);

    const { token } = await fetchAuthenticatedUser();
    const response = await fetchRequestAPI(token, requestStatus);
    dispatch(fetchRequestSuccess(response));
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
const fetchFoundationMemberAPI = token => {
  const apiName = APIEndpoints.RFAI.name;
  const apiPath = `${APIPaths.RFAI_FOUNDATION_MEMBERS}`;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, apiPath, apiOptions);
};

export const fetchFoundationMembersData = () => async dispatch => {
  try {
    const { token } = await fetchAuthenticatedUser();
    const response = await fetchFoundationMemberAPI(token);
    dispatch(fetchFoundationMemberSuccess(response));
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
const fetchRequestSummaryAPI = token => {
  const apiName = APIEndpoints.RFAI.name;
  const apiPath = `${APIPaths.RFAI_REQUEST_SUMMARY}`;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, apiPath, apiOptions);
};

export const fetchRequestSummaryData = () => async dispatch => {
  try {
    const { token } = await fetchAuthenticatedUser();
    const response = await fetchRequestSummaryAPI(token);
    dispatch(fetchRequestSummarySuccess(response));
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
const fetchRequestSolutionAPI = (token, requestId) => {
  const apiName = APIEndpoints.RFAI.name;
  const apiPath = `${APIPaths.RFAI_REQUEST_SOLUTION}?requestId=${requestId}`;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, apiPath, apiOptions);
};

export const fetchRequestSolutionData = requestId => async dispatch => {
  try {
    dispatch(loaderActions.startRequestModalLoader);
    const { token } = await fetchAuthenticatedUser();
    const response = await fetchRequestSolutionAPI(token, requestId);
    dispatch(fetchRequestSolutionSuccess(response));
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
const fetchRequestStakeAPI = (token, requestId) => {
  const apiName = APIEndpoints.RFAI.name;
  const apiPath = `${APIPaths.RFAI_REQUEST_STAKE}?requestId=${requestId}`;
  const apiOptions = initializeAPIOptions(token);
  return API.get(apiName, apiPath, apiOptions);
};

export const fetchRequestStakeData = requestId => async dispatch => {
  try {
    dispatch(loaderActions.startRequestModalLoader);
    const { token } = await fetchAuthenticatedUser();
    const response = await fetchRequestStakeAPI(token, requestId);
    dispatch(fetchRequestStakeSuccess(response));
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
const fetchRequestVoteAPI = (token, requestId) => {
  const apiName = APIEndpoints.RFAI.name;
  const apiPath = `${APIPaths.RFAI_REQUEST_VOTE}?requestId=${requestId}`;
  const apiOptions = initializeAPIOptions(token);

  return API.get(apiName, apiPath, apiOptions);
};

export const fetchRequestVoteData = requestId => async dispatch => {
  try {
    dispatch(loaderActions.startRequestModalLoader);
    const { token } = await fetchAuthenticatedUser();
    const response = await fetchRequestVoteAPI(token, requestId);

    dispatch(fetchRequestVoteSuccess(response));
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
