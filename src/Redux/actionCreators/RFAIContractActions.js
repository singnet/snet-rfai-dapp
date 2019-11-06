import rfai from "../../config/ServiceRequest.json";

export const UPDATE_RFAI_TOKEN_BALANCE = "UPDATE_RFAI_TOKEN_BALANCE";

const getRFAIContractAddress = () => {
  return rfai.networks[process.env.REACT_APP_ETH_NETWORK].address;
};

// Fetching The RFAI Token Balance
export const updateRFAITokenBalance = metamaskState => async dispatch => {
  var rfaiTokenBalance = 0;
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskState.account;

  // console.log("RFAIABI - ", rfai.abi);
  // console.log("metamaskState - ", metamaskState);
  // console.log("metamaskState.account - ", metamaskState.account);

  if (metamaskState.isTxnsAllowed) {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      window.web3 = new window.Web3(ethereum);

      const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

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
