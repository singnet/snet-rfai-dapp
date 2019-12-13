import rfaiNetworks from "singularitynet-rfai-contracts/networks/ServiceRequest";
import rfaiABI from "singularitynet-rfai-contracts/abi/ServiceRequest";

export const UPDATE_RFAI_TOKEN_BALANCE = "UPDATE_RFAI_TOKEN_BALANCE";
export const UPDATE_RFAI_OWNER = "UPDATE_RFAI_OWNER";
export const UPDATE_RFAI_MIN_STAKE = "UPDATE_RFAI_MIN_STAKE";
export const UPDATE_RFAI_MAX_STAKERS = "UPDATE_RFAI_MAX_STAKERS";

const getRFAIContractAddress = () => {
  return rfaiNetworks[process.env.REACT_APP_ETH_NETWORK].address;
};

// Fetching The RFAI Token Balance
export const updateRFAITokenBalance = metamaskState => async dispatch => {
  var rfaiTokenBalance = 0;
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskState.account;

  if (metamaskState.isTxnsAllowed) {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      window.web3 = new window.Web3(ethereum);

      const rfaiInstance = window.web3.eth.contract(rfaiABI).at(rfaiContractAddress);

      await rfaiInstance.balances(accountAddress, { from: accountAddress }, (err, result) => {
        //console.log("RFAI Balance result - ", result.toString());
        rfaiTokenBalance = result.toString();
        dispatch({ type: UPDATE_RFAI_TOKEN_BALANCE, payload: rfaiTokenBalance });
      });
    }
  } else {
    dispatch({ type: UPDATE_RFAI_TOKEN_BALANCE, payload: rfaiTokenBalance });
  }
};

// Fetching The RFAI Min Stake Configuration
export const updateRFAIMinStake = metamaskState => async dispatch => {
  var rfaiMinStake = 0;
  const rfaiContractAddress = getRFAIContractAddress();

  if (metamaskState.isTxnsAllowed) {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      window.web3 = new window.Web3(ethereum);

      const rfaiInstance = window.web3.eth.contract(rfaiABI).at(rfaiContractAddress);

      await rfaiInstance.minStake((err, result) => {
        rfaiMinStake = result.toString();
        dispatch({ type: UPDATE_RFAI_MIN_STAKE, payload: rfaiMinStake });
      });
    }
  } else {
    dispatch({ type: UPDATE_RFAI_MIN_STAKE, payload: rfaiMinStake });
  }
};

// Fetching The RFAI Max Stakers Configuration
export const updateRFAIMaxStakers = metamaskState => async dispatch => {
  var rfaiMaxStakers = 0;
  const rfaiContractAddress = getRFAIContractAddress();

  if (metamaskState.isTxnsAllowed) {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      window.web3 = new window.Web3(ethereum);

      const rfaiInstance = window.web3.eth.contract(rfaiABI).at(rfaiContractAddress);

      await rfaiInstance.maxStakers((err, result) => {
        rfaiMaxStakers = result.toString();
        dispatch({ type: UPDATE_RFAI_MAX_STAKERS, payload: rfaiMaxStakers });
      });
    }
  } else {
    dispatch({ type: UPDATE_RFAI_MAX_STAKERS, payload: rfaiMaxStakers });
  }
};

// Fetching The RFAI Owner
export const updateRFAIOwner = metamaskState => async dispatch => {
  var rfaiOwner = 0x0;
  const rfaiContractAddress = getRFAIContractAddress();

  if (metamaskState.isTxnsAllowed) {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      window.web3 = new window.Web3(ethereum);

      const rfaiInstance = window.web3.eth.contract(rfaiABI).at(rfaiContractAddress);

      await rfaiInstance.owner((err, result) => {
        rfaiOwner = result.toString();
        dispatch({ type: UPDATE_RFAI_OWNER, payload: rfaiOwner });
      });
    }
  } else {
    dispatch({ type: UPDATE_RFAI_OWNER, payload: rfaiOwner });
  }
};
