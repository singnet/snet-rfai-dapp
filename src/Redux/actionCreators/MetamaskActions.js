export const UPDATE_METAMASK_DETAILS = "UPDATE_METAMASK_DETAILS";

export const updateMetamaskDetails = (isConnected, account, networkId, isTxnsAllowed) => dispatch => {
  const data = {
    isConnected,
    account,
    networkId,
    isTxnsAllowed,
  };

  dispatch({ type: UPDATE_METAMASK_DETAILS, payload: data });
};
