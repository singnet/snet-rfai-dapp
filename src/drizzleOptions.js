import SingularityNetToken from './build_contracts/SingularityNetToken.json'
import ServiceRequest from './build_contracts/ServiceRequest.json'

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
    accounts: 3000,
    blocks: 3000
  }//,
  //syncAlways: ture
}

export default drizzleOptions