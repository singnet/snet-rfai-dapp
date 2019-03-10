import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

class RequestIPFSData extends Component {
  constructor(props, context) {
    super(props)

    this.state = {
      requestId: this.props.requestId,
      IPFSHash: this.props.IPFSHash,
      itemField: this.props.getField,
      title: 'No title provided',
      description: 'No decription provided',
      documentURI: 'No URL provided'
    }
  }

  componentDidMount() {
    this.fetchAndStoreIPFSData();
  }

  componentDidUpdate(prevProps, prevState) {}

  fetchAndStoreIPFSData() {

    const uniqueRequestId = "request_" + this.state.requestId

    if (typeof(Storage) !== "undefined") {

      if (localStorage.getItem(uniqueRequestId) !== null ) {

console.log(uniqueRequestId + "---" + localStorage.getItem(uniqueRequestId));
        var dataJson = JSON.parse(localStorage.getItem(uniqueRequestId))
console.log("dataJson.title - " + dataJson.title)
console.log("dataJson.description - " + dataJson.description)

        this.setState({title: dataJson.title})
        this.setState({description: dataJson.description})
        this.setState({documentURI: dataJson.documentURI})


      } else {

        // Read from IPFS Service and store in the local storage
        this.getMetaDataFromIPFS();

      }

    } else {

      // Read from IPFS Service and store in the local storage
      this.getMetaDataFromIPFS();

    }


  }

 
 getMetaDataFromIPFS() {

    const uniqueRequestId = "request_" + this.state.requestId
    var ipfsInput = { "hash" : this.state.IPFSHash}
    const ipfsURL = "https://96igw2u1hb.execute-api.us-east-1.amazonaws.com/gateway/read-ipfs"

    const fetchOptions = {
      'mode': 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify(ipfsInput)
    }

    fetch(ipfsURL, fetchOptions)
    .then(response => response.json())
    .then(data => 
      {
console.log("ipfs hash - " + data.data.title);
        
        this.setState({title: data.data.title})
        this.setState({description: data.data.description})
        this.setState({documentURI: data.data.documentURI})

        if (typeof(Storage) !== "undefined") {
console.log("Setting Local Storage -- " + JSON.stringify(data.data));
          localStorage.setItem(uniqueRequestId, JSON.stringify(data.data));
        }

      })
      .catch(err => 
        {
          console.log("Error while fetching IPFS Data- " + err)
      })

  }


  render() {

    var ipfsReturnHTML = <span>{this.state.title}</span>;

    if(this.state.itemField === "description") {
      ipfsReturnHTML = <span>{this.state.description}</span>;
    }

    if(this.state.itemField === "documentURI") {
      ipfsReturnHTML = <span>{this.state.documentURI}</span>;
    }

    return (
      ipfsReturnHTML
    )
    
  }
}

RequestIPFSData.contextTypes = {
  drizzle: PropTypes.object
}

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SingularityNetToken: state.contracts.SingularityNetToken,
    ServiceRequest: state.contracts.ServiceRequest,
    drizzleStatus: state.drizzleStatus,
    transactionStack: state.transactionStack,
    transactions: state.transactions
  }
}

export default drizzleConnect(RequestIPFSData, mapStateToProps)