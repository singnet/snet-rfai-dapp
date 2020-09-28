import { getRFAITokenBalance, getRFAIMinStake, getRFAIMaxStakers, getRFAIOwner } from "../../utility/BlockchainHelper";

export const UPDATE_RFAI_TOKEN_BALANCE = "UPDATE_RFAI_TOKEN_BALANCE";
export const UPDATE_RFAI_OWNER = "UPDATE_RFAI_OWNER";
export const UPDATE_RFAI_MIN_STAKE = "UPDATE_RFAI_MIN_STAKE";
export const UPDATE_RFAI_MAX_STAKERS = "UPDATE_RFAI_MAX_STAKERS";

// Fetching The RFAI Token Balance
export const updateRFAITokenBalance = metamaskState => async dispatch => {
  let rfaiTokenBalance = 0;

  try {
    rfaiTokenBalance = await getRFAITokenBalance(metamaskState);
    dispatch({ type: UPDATE_RFAI_TOKEN_BALANCE, payload: rfaiTokenBalance });
  } catch (error) {
    dispatch({ type: UPDATE_RFAI_TOKEN_BALANCE, payload: rfaiTokenBalance });
  }
};

// Fetching The RFAI Min Stake Configuration
export const updateRFAIMinStake = metamaskState => async dispatch => {
  let rfaiMinStake = 0;

  try {
    rfaiMinStake = await getRFAIMinStake(metamaskState);
    dispatch({ type: UPDATE_RFAI_MIN_STAKE, payload: rfaiMinStake });
  } catch (error) {
    dispatch({ type: UPDATE_RFAI_MIN_STAKE, payload: rfaiMinStake });
  }
};

// Fetching The RFAI Max Stakers Configuration
export const updateRFAIMaxStakers = metamaskState => async dispatch => {
  let rfaiMaxStakers = 0;

  try {
    rfaiMaxStakers = await getRFAIMaxStakers(metamaskState);
    dispatch({ type: UPDATE_RFAI_MAX_STAKERS, payload: rfaiMaxStakers });
  } catch (error) {
    dispatch({ type: UPDATE_RFAI_MAX_STAKERS, payload: rfaiMaxStakers });
  }
};

// Fetching The RFAI Owner
export const updateRFAIOwner = metamaskState => async dispatch => {
  let rfaiOwner = 0x0;

  try {
    rfaiOwner = await getRFAIOwner(metamaskState);
    dispatch({ type: UPDATE_RFAI_OWNER, payload: rfaiOwner });
  } catch (error) {
    dispatch({ type: UPDATE_RFAI_OWNER, payload: rfaiOwner });
  }
};
