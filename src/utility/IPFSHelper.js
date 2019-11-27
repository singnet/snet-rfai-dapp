import web3 from "web3";

export const saveIPFSDocument = ipfsInput => {
  const ipfsURL = process.env.REACT_APP_IPFS_ENDPOINT;
  const body = {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(ipfsInput),
  };

  return new Promise((resolve, reject) => {
    // Store the document into IPFS
    fetch(ipfsURL, body)
      .then(response => response.json())
      .then(data => {
        // console.log("ipfs hash - " + data.data.hash);
        const docURIinBytes = web3.utils.fromAscii(data.data.hash);
        // console.log("docURIinBytes - ", docURIinBytes);
        resolve(docURIinBytes);
      })
      .catch(err => {
        // console.log("ipfs err - " + err);
        reject(err);
      });
  });
};

//const stackId = this.contracts.ServiceRequest.methods["createRequest"].cacheSend(initialStakeBN.toString(), expiration, docURIinBytes, {from: this.props.accounts[0]})
