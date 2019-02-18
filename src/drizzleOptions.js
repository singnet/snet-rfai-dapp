import SingularityNetToken from './../build/contracts/SingularityNetToken.json'
import ServiceRequest from './../build/contracts/ServiceRequest.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    SingularityNetToken,
    ServiceRequest
  ],
  events: {
    ServiceRequest: ['AddFoundationMember', 'CreateRequest', 'ExtendRequest', 'ApproveRequest', 'FundRequest', 'AddSolutionRequest',  'VoteRequest', 'ClaimRequest', 'CloseRequest', 'RejectRequest']
  },
  polls: {
    accounts: 1500//,
    //blocks: 1000
  }//,
  //syncAlways: ture
}

export default drizzleOptions