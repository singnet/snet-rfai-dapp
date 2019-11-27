import rfaiNetworks from "singularitynet-rfai-contracts/networks/ServiceRequest";
import rfaiABI from "singularitynet-rfai-contracts/abi/ServiceRequest";
export const UPDATE_RFAI_TOKEN_BALANCE = "UPDATE_RFAI_TOKEN_BALANCE";

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
