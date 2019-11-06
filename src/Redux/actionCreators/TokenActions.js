import tokenABI from "singularitynet-token-contracts/abi/SingularityNetToken.json";
import tokenNetworks from "singularitynet-token-contracts/networks/SingularityNetToken.json";
import rfai from "../../config/ServiceRequest.json";

export const UPDATE_TOKEN_BALANCE = "UPDATE_TOKEN_BALANCE";
export const UPDATE_TOKEN_ALLOWANCE = "UPDATE_TOKEN_ALLOWANCE";

const getTokenContractAddress = () => {
  return tokenNetworks[process.env.REACT_APP_ETH_NETWORK].address;
};

const getRFAIContractAddress = () => {
  return rfai.networks[process.env.REACT_APP_ETH_NETWORK].address;
};

// Fetching The the Token Balance
export const updateTokenBalance = metamaskState => async dispatch => {
  var tokenBalance = 0;
  const tokenContractAddress = getTokenContractAddress();
  const accountAddress = metamaskState.account;
  //tokenABI

  // console.log("tokenContractAddress - ", tokenContractAddress);
  // console.log("tokenABI - ", tokenABI);
  // console.log("metamaskState - ", metamaskState);
  // console.log("metamaskState.account - ", metamaskState.account);

  if (metamaskState.isTxnsAllowed) {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      window.web3 = new window.Web3(ethereum);

      const tokenInstance = window.web3.eth.contract(tokenABI).at(tokenContractAddress);

      await tokenInstance.balanceOf(accountAddress, { from: accountAddress }, (err, result) => {
        //console.log("tokenBalance result - ", result.toString());
        tokenBalance = result.toString();
        dispatch({ type: UPDATE_TOKEN_BALANCE, payload: tokenBalance });
      });
    }
  } else {
    dispatch({ type: UPDATE_TOKEN_BALANCE, payload: tokenBalance });
  }
};

// Fetching The the Token Allowance
export const updateTokenAllowance = metamaskState => async dispatch => {
  var tokenAllowance = 0;
  const tokenContractAddress = getTokenContractAddress();
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskState.account;
  //tokenABI

  // console.log("tokenContractAddress - ", tokenContractAddress);
  // console.log("tokenABI - ", tokenABI);
  // console.log("metamaskState - ", metamaskState);
  // console.log("metamaskState.account - ", metamaskState.account);
  // console.log("rfaiContractAddress - ", rfaiContractAddress);

  if (metamaskState.isTxnsAllowed) {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      window.web3 = new window.Web3(ethereum);

      const tokenInstance = window.web3.eth.contract(tokenABI).at(tokenContractAddress);

      await tokenInstance.allowance(accountAddress, rfaiContractAddress, { from: accountAddress }, (err, result) => {
        //console.log("tokenAllowance result - ", result.toString());
        tokenAllowance = result.toString();
        dispatch({ type: UPDATE_TOKEN_ALLOWANCE, payload: tokenAllowance });
      });
    }
  } else {
    dispatch({ type: UPDATE_TOKEN_ALLOWANCE, payload: tokenAllowance });
  }
};

// export const updateTokenBalance = (metamaskState) => async dispatch => {

//   const tokenBalance = await fetchTokenBalance(metamaskState);

//   dispatch({ type: UPDATE_TOKEN_BALANCE, payload: tokenBalance });
// };
