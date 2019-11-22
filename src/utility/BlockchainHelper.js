import Web3 from "web3";
import rfai from "../config/ServiceRequest.json";
import tokenABI from "singularitynet-token-contracts/abi/SingularityNetToken.json";
import tokenNetworks from "singularitynet-token-contracts/networks/SingularityNetToken.json";

export const waitForTransaction = async hash => {
  let receipt;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);
  const web3 = new Web3(window.web3.currentProvider);

  while (!receipt) {
    // eslint-disable-next-line no-await-in-loop
    try {
      receipt = await web3.eth.getTransactionReceipt(hash);
      //console.log(" receipt - ", receipt);
    } catch (error) {
      // Do Nothing
      //console.log("error - ", error);
    }
  }

  return new Promise((resolve, reject) => {
    if (!receipt.status) {
      reject(receipt);
    }
    resolve(receipt);
  });
};

export const approveToken = (metamaskDetails, amountBN) => {
  const tokenContractAddress = getTokenContractAddress();
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const tokenInstance = window.web3.eth.contract(tokenABI).at(tokenContractAddress);

  return new Promise(async (resolve, reject) => {
    await tokenInstance.approve(rfaiContractAddress, amountBN.toString(), { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const depositTokenToEscrow = (metamaskDetails, amountBN) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.deposit(amountBN.toString(), { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const withdrawTokenFromEscrow = (metamaskDetails, amountBN) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.withdraw(amountBN.toString(), { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const createRequest = (metamaskDetails, initialStakeBN, expiration, docURIinBytes) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.createRequest(
      initialStakeBN.toString(),
      expiration,
      docURIinBytes,
      { from: accountAddress },
      (err, hash) => {
        if (err) {
          reject(hash);
        }
        resolve(hash);
      }
    );
  });
};

export const submitSolutionForRequest = (metamaskDetails, requestId, docURIinBytes) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.createOrUpdateSolutionProposal(
      requestId,
      docURIinBytes,
      { from: accountAddress },
      (err, hash) => {
        if (err) {
          reject(hash);
        }
        resolve(hash);
      }
    );
  });
};

export const stakeForRequest = (metamaskDetails, requestId, stakeAmountBN) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.addFundsToRequest(requestId, stakeAmountBN.toString(), { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const voteForSolution = (metamaskDetails, requestId, votedForSubmitter) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.vote(requestId, votedForSubmitter, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const claimRequest = (metamaskDetails, requestId) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.requestClaim(requestId, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const claimBackRequest = (metamaskDetails, requestId) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.requestClaimBack(requestId, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const approveRequest = (metamaskDetails, requestId, endSubmission, endEvaluation, newExpiration) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.approveRequest(
      requestId,
      endSubmission,
      endEvaluation,
      newExpiration,
      { from: accountAddress },
      (err, hash) => {
        if (err) {
          reject(hash);
        }
        resolve(hash);
      }
    );
  });
};

// Can by Owner or by Active Foundation Member only
export const rejectRequest = (metamaskDetails, requestId) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.rejectRequest(requestId, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

// Can be called by Owner/Foundation Member or Requester when it is in Open State
export const closeRequest = (metamaskDetails, requestId) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.closeRequest(requestId, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

// Can be done only owner or other member with role=1
// Role can be 0 or 1 & active will be true/false
export const addOrUpdateFoundationMembers = (metamaskDetails, member, role, active) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.addOrUpdateFoundationMembers(member, role, active, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

// Can be done only by owner
export const updateOwner = (metamaskDetails, newOwner) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.updateOwner(newOwner, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

// Can be done by only owner
export const updateConfigLimits = (metamaskDetails, minStake, maxStakers) => {
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  const ethereum = window.ethereum;
  window.web3 = new window.Web3(ethereum);

  const rfaiInstance = window.web3.eth.contract(rfai.abi).at(rfaiContractAddress);

  return new Promise(async (resolve, reject) => {
    await rfaiInstance.updateLimits(minStake, maxStakers, { from: accountAddress }, (err, hash) => {
      if (err) {
        reject(hash);
      }
      resolve(hash);
    });
  });
};

export const getBlockNumber = () => {
  // Check for Metamask
  if (window.ethereum) {
    const ethereum = window.ethereum;
    window.web3 = new window.Web3(ethereum);
    // Return the Block Number
    return new Promise(async (reject, resolve) => {
      await window.web3.eth.getBlockNumber((err, blockNumber) => {
        if (err) {
          resolve(err);
        }
        resolve(blockNumber);
      });
    });
  } else {
    // Fallback to Infura to get the blocknumber
    var web3 = new Web3(process.env.REACT_APP_INFURA_ENDPOINT);
    return new Promise(async (reject, resolve) => {
      await web3.eth.getBlockNumber((err, blockNumber) => {
        if (err) {
          resolve(err);
        }
        resolve(blockNumber);
      });
    });
  }
};

const getRFAIContractAddress = () => {
  return rfai.networks[process.env.REACT_APP_ETH_NETWORK].address;
};

const getTokenContractAddress = () => {
  return tokenNetworks[process.env.REACT_APP_ETH_NETWORK].address;
};
