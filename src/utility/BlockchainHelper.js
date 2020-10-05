import Web3 from "web3";
import tokenABI from "singularitynet-token-contracts/abi/SingularityNetToken.json";
import tokenNetworks from "singularitynet-token-contracts/networks/SingularityNetToken.json";
import rfaiNetworks from "singularitynet-rfai-contracts/networks/ServiceRequest";
import rfaiABI from "singularitynet-rfai-contracts/abi/ServiceRequest";

export const blockChainEvents = {
  TRANSACTION_HASH: "transactionHash",
  RECEIPT: "receipt",
  CONFIRMATION: "confirmation",
  ERROR: "error",
};

// Will not be using this method any more
// Refer other methods on web3 usage
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
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  try {
    const tokenInstance = getTokenContractInstance();

    return new Promise((resolve, reject) => {
      const method = tokenInstance.methods
        .approve(rfaiContractAddress, amountBN.toString())
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const depositTokenToEscrow = (metamaskDetails, amountBN) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .deposit(amountBN.toString())
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const withdrawTokenFromEscrow = (metamaskDetails, amountBN) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .withdraw(amountBN.toString())
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const createRequest = (metamaskDetails, initialStakeBN, expiration, docURIinBytes) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .createRequest(initialStakeBN.toString(), expiration, docURIinBytes)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const submitSolutionForRequest = (metamaskDetails, requestId, docURIinBytes) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .createOrUpdateSolutionProposal(requestId, docURIinBytes)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const stakeForRequest = (metamaskDetails, requestId, stakeAmountBN) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .addFundsToRequest(requestId, stakeAmountBN.toString())
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const voteForSolution = (metamaskDetails, requestId, votedForSubmitter) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .vote(requestId, votedForSubmitter)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const claimRequest = (metamaskDetails, requestId) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .requestClaim(requestId)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const claimBackRequest = (metamaskDetails, requestId) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .requestClaimBack(requestId)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const approveRequest = (metamaskDetails, requestId, endSubmission, endEvaluation, newExpiration) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .approveRequest(requestId, endSubmission, endEvaluation, newExpiration)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

// Can by Owner or by Active Foundation Member only
export const rejectRequest = (metamaskDetails, requestId) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .rejectRequest(requestId)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

// Can be called by Owner/Foundation Member or Requester when it is in Open State
export const closeRequest = (metamaskDetails, requestId) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .closeRequest(requestId)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

// Can be done only owner or other member with role=1
// Role can be 0 or 1 & active will be true/false
export const addOrUpdateFoundationMembers = (metamaskDetails, member, role, active) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .addOrUpdateFoundationMembers(member, role, active)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

// Can be done only by owner
export const updateOwner = (metamaskDetails, newOwner) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .updateOwner(newOwner)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

// Can be done by only owner
export const updateConfigLimits = (metamaskDetails, minStake, maxStakers) => {
  const accountAddress = metamaskDetails.account;

  try {
    const rfaiInstance = getRFAIContractInstance();

    return new Promise((resolve, reject) => {
      const method = rfaiInstance.methods
        .updateLimits(minStake, maxStakers)
        .send({ from: accountAddress })
        .once(blockChainEvents.CONFIRMATION, async () => {
          resolve();
          await method.off();
        })
        .on(blockChainEvents.ERROR, error => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
};

export const getBlockNumber = () => {
  // Check for Metamask
  if (window.ethereum) {
    const ethereum = window.ethereum;
    const web3 = new Web3(ethereum);
    // Return the Block Number
    return new Promise((reject, resolve) => {
      web3.eth.getBlockNumber((err, blockNumber) => {
        if (err) {
          resolve(err);
        }
        resolve(blockNumber);
      });
    });
  } else {
    // Fallback to Infura to get the blocknumber
    var web3 = new Web3(process.env.REACT_APP_INFURA_ENDPOINT);
    return new Promise((reject, resolve) => {
      web3.eth.getBlockNumber((err, blockNumber) => {
        if (err) {
          resolve(err);
        }
        resolve(blockNumber);
      });
    });
  }
};

const getRFAIContractAddress = () => {
  return rfaiNetworks[process.env.REACT_APP_ETH_NETWORK].address;
};

const getTokenContractAddress = () => {
  return tokenNetworks[process.env.REACT_APP_ETH_NETWORK].address;
};

const getRFAIContractInstance = () => {
  const rfaiContractAddress = getRFAIContractAddress();

  try {
    const ethereum = window.ethereum;

    const web3 = new Web3(ethereum);
    const rfaiInstance = new web3.eth.Contract(rfaiABI, rfaiContractAddress);

    return rfaiInstance;
  } catch (error) {
    throw error;
  }
};

const getTokenContractInstance = () => {
  const tokenContractAddress = getTokenContractAddress();

  try {
    const ethereum = window.ethereum;
    const web3 = new Web3(ethereum);
    const tokenInstance = new web3.eth.Contract(tokenABI, tokenContractAddress);

    return tokenInstance;
  } catch (error) {
    throw error;
  }
};

// ******************* User Token Balance Functions ***********************
export const getTokenBalance = async metamaskDetails => {
  let tokenBalance = 0;
  const accountAddress = metamaskDetails.account;

  try {
    if (metamaskDetails.isTxnsAllowed) {
      const tokenInstance = getTokenContractInstance();
      tokenBalance = await tokenInstance.methods.balanceOf(accountAddress).call();
    }
    return tokenBalance.toString();
  } catch (_error) {
    return tokenBalance.toString();
  }
};

// ********************* Fetching The the Token Allowance *******************
export const getTokenAllowance = async metamaskDetails => {
  let tokenAllowance = 0;
  const rfaiContractAddress = getRFAIContractAddress();
  const accountAddress = metamaskDetails.account;

  try {
    if (metamaskDetails.isTxnsAllowed) {
      const tokenInstance = getTokenContractInstance();
      tokenAllowance = await tokenInstance.methods.allowance(accountAddress, rfaiContractAddress).call();
    }
    return tokenAllowance.toString();
  } catch (_error) {
    return tokenAllowance.toString();
  }
};

// Fetching The RFAI Token Balance
export const getRFAITokenBalance = async metamaskDetails => {
  let rfaiTokenBalance = 0;
  const accountAddress = metamaskDetails.account;

  try {
    if (metamaskDetails.isTxnsAllowed) {
      const rfaiInstance = getRFAIContractInstance();
      rfaiTokenBalance = await rfaiInstance.methods.balances(accountAddress).call();
    }
    return rfaiTokenBalance.toString();
  } catch (_error) {
    return rfaiTokenBalance.toString();
  }
};

// Fetching The RFAI Min Stake Configuration
export const getRFAIMinStake = async metamaskDetails => {
  let rfaiMinStake = 0;

  try {
    if (metamaskDetails.isTxnsAllowed) {
      const rfaiInstance = getRFAIContractInstance();
      rfaiMinStake = await rfaiInstance.methods.minStake().call();
    }
    return rfaiMinStake.toString();
  } catch (_error) {
    return rfaiMinStake.toString();
  }
};

// Fetching The RFAI Max Stakers Configuration
export const getRFAIMaxStakers = async metamaskDetails => {
  let rfaiMaxStakers = 0;

  try {
    if (metamaskDetails.isTxnsAllowed) {
      const rfaiInstance = getRFAIContractInstance();
      rfaiMaxStakers = await rfaiInstance.methods.maxStakers().call();
    }

    return rfaiMaxStakers.toString();
  } catch (_error) {
    return rfaiMaxStakers.toString();
  }
};

// Fetching The RFAI Owner
export const getRFAIOwner = async metamaskDetails => {
  let rfaiOwner = 0x0;

  try {
    if (metamaskDetails.isTxnsAllowed) {
      const rfaiInstance = getRFAIContractInstance();
      rfaiOwner = await rfaiInstance.methods.owner().call();
    }
    return rfaiOwner.toString();
  } catch (_error) {
    return rfaiOwner.toString();
  }
};
