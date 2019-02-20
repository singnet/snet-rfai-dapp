import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import web3 from 'web3'

//components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'

// Exapandable pannels
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import ApproveRequest from '../../components/ApproveRequest'
import StakeRequest from '../../components/StakeRequest'

import RequestSolution from '../../components/RequestSolution'

import RequestStakeDetails from '../../components/RequestStakeDetails'
import HelperFunctions from '../HelperFunctions'


//inline styles
// const styles = {
//   backgroundColor: '#F9DBDB',
//   padding: 20
// }

const dialogStyles = {
  style: {
    backgroundColor: '#F9DBDB',
    padding: 20
  }
}

const dialogApproveStyles = {
  style: {
    backgroundColor: 'white',
    padding: 20
  }
}

const rootStyles = {
  style: {
    width: '100%',
    marginTop: 3,
    overflowX: 'auto',
  }
}

const rowStyles = {
  style: {
    backgroundColor: 'white',
  }
}

const BN = web3.utils.BN

class RequestListV2 extends Component {

  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.context = context
    this.helperFunctions = new HelperFunctions();

    this.handleApproveButton = this.handleApproveButton.bind(this)
    this.handleRejectButton = this.handleRejectButton.bind(this)
    this.handleCloseButton = this.handleCloseButton.bind(this)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)

    this.handleApproveRequestDialogClose = this.handleApproveRequestDialogClose.bind(this)


    this.handleStakeButton = this.handleStakeButton.bind(this)
    this.handleStakeRequestDialogClose = this.handleStakeRequestDialogClose.bind(this)

    this.handleSubmitSolutionButton = this.handleSubmitSolutionButton.bind(this)
    this.handleSubmitSolutionDialogClose = this.handleSubmitSolutionDialogClose.bind(this)

    this.handleSubmitSolution2Button = this.handleSubmitSolution2Button.bind(this)
    this.handleRequestInputChange = this.handleRequestInputChange.bind(this)

    this.handleShowStakeButton = this.handleShowStakeButton.bind(this);
    this.handleShowStakeDialogClose = this.handleShowStakeDialogClose.bind(this)

    this.handleVoteButton = this.handleVoteButton.bind(this)
    this.handleVoteDialogClose = this.handleVoteDialogClose.bind(this)


    this.state = {
      dataKeyNextRequestId: null,
      nextRequestId: 0,
      dataKeyRequestKeys: [],
      requests: [],
      compRequestStatus: props.compRequestStatus,
      dialogOpen: false,
      dialogOpenApproveRequest: false,
      dialogOpenStakeRequest: false,
      dialogOpenSubmitSolutionRequest: false,
      dialogOpenShowStake: false,
      dialogOpenVoteRequest: false,
      blockNumber: 0,

      alertText: '',
      expanded: null,

      solutionDocumentURI: '',
      approveRequestId: 0,
      approveRequestExpiry: 0,
      selectedRequestId: 0,
      selectedRequestExpiry: 0,

      dataKeyMemberKeys: null,
      foundationMembers: [],
      isFoundationMember: false,
      foundationMemberRole: 0
    }

    this.setBlockNumber();

  }

  componentDidMount() {
    const dataKeyNextRequestId = this.contracts.ServiceRequest.methods.nextRequestId.cacheCall();
    this.setState({dataKeyNextRequestId})
    this.setRequests(this.props.ServiceRequest)

    const dataKeyMemberKeys = this.contracts.ServiceRequest.methods.getFoundationMemberKeys.cacheCall();
    this.setState({dataKeyMemberKeys})
    this.setFoundationMembers(this.props.ServiceRequest)

    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || this.state.dataKeyNextRequestId !== prevState.dataKeyNextRequestId || this.state.nextRequestId !== prevState.nextRequestId) {
      this.setState({ defaultState: false })
      this.setBlockNumber()
      this.setRequests(this.props.ServiceRequest)
    }

    if (this.props.ServiceRequest !== prevProps.ServiceRequest || this.state.dataKeyMemberKeys !== prevState.dataKeyMemberKeys) {
      this.setFoundationMembers(this.props.ServiceRequest)
    }

  }

  setBlockNumber() {
    // Update the Block Number
    this.context.drizzle.web3.eth.getBlockNumber((err, blockNumber) => {
      this.setState({blockNumber});
    });
  }

  setRequests(contract) {

    if (contract.nextRequestId[this.state.dataKeyNextRequestId] !== undefined && this.state.dataKeyNextRequestId !== null) {
      const nextRequestId = contract.nextRequestId[this.state.dataKeyNextRequestId].value
      this.setState({nextRequestId})

      var dataKeyRequestKeys = []
      for(var i=0; i< this.state.nextRequestId; i++) {
        dataKeyRequestKeys.push(this.contracts.ServiceRequest.methods.getServiceRequestById.cacheCall(i))
      }
      this.setState({dataKeyRequestKeys});

    }
  }

  setFoundationMembers(contract) {

    if (contract.getFoundationMemberKeys[this.state.dataKeyMemberKeys] !== undefined && this.state.dataKeyMemberKeys !== null) {

      this.setState({
        foundationMembers: contract.getFoundationMemberKeys[this.state.dataKeyMemberKeys].value
      }, () => {
        const exists = this.state.foundationMembers.some(m => m === this.props.accounts[0])
        this.setState({isFoundationMember : exists});
      });


    }
  }

  handleDialogOpen() {
    this.setState({ dialogOpen: true })
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }

  handleApproveButton(event, requestId, expiry) {
    // , approveRequestId: requestId, approveRequestExpiry: expiry
    this.setState({approveRequestId: requestId, approveRequestExpiry: expiry}, () => {
      this.setState( {dialogOpenApproveRequest: true});
    })
  }

  handleStakeButton(event, requestId, expiry) {

    this.setState({selectedRequestId: requestId, selectedRequestExpiry: expiry}, () => {
      this.setState( {dialogOpenStakeRequest: true});
    })
  }

  handleVoteButton(event, requestId, expiry) {

    this.setState({selectedRequestId: requestId, selectedRequestExpiry: expiry}, () => {
      this.setState( {dialogOpenVoteRequest: true});
    })
  }

  
  handleSubmitSolutionButton(event, requestId, expiry) {
    this.setState({selectedRequestId: requestId, selectedRequestExpiry: expiry}, () => {
      this.setState( {dialogOpenSubmitSolutionRequest: true});
    })
  }


  handleRejectButton(event, requestId) {
    const stackId = this.contracts.ServiceRequest.methods["rejectRequest"].cacheSend(requestId, {from: this.props.accounts[0]})
      if (this.props.transactionStack[stackId]) {
        const txHash = this.props.trasnactionStack[stackId]
        console.log("txHash - " + txHash);
      }
  }

  handleCloseButton(event, requestId) {
    const stackId = this.contracts.ServiceRequest.methods["closeRequest"].cacheSend(requestId, {from: this.props.accounts[0]})
      if (this.props.transactionStack[stackId]) {
        const txHash = this.props.trasnactionStack[stackId]
        console.log("txHash - " + txHash);
      }
  }

  handleSubmitSolution2Button() {
    const docURIinBytes = this.context.drizzle.web3.utils.fromAscii(this.state.solutionDocumentURI);
    if(this.state.solutionDocumentURI.length > 0) {
      const stackId = this.contracts.ServiceRequest.methods["createOrUpdateSolutionProposal"].cacheSend(this.state.selectedRequestId, docURIinBytes, {from: this.props.accounts[0]})
      if (this.props.transactionStack[stackId]) {
        const txHash = this.props.trasnactionStack[stackId]
        console.log("txHash - " + txHash);
      }
    } else if (this.state.solutionDocumentURI.length === 0) {
      this.setState({ alertText: 'Oops! Invalid solution document URI.'})
      this.handleDialogOpen()
    } else {
      this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
      this.handleDialogOpen()
    }

    
  }

  handleShowStakeButton(event, requestId) {
    this.setState({selectedRequestId: requestId}, () => {
      this.setState( {dialogOpenShowStake: true});
    })
  }

  handleApproveRequestDialogClose() {
    this.setState({ dialogOpenApproveRequest: false })
  }

  handleStakeRequestDialogClose() {
    this.setState({ dialogOpenStakeRequest: false })
  }

  handleVoteDialogClose() {
    this.setState({ dialogOpenVoteRequest: false })
  }

  handleSubmitSolutionDialogClose() {
    this.setState({ dialogOpenSubmitSolutionRequest: false })
  }

  handleRequestInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleShowStakeDialogClose() {
    this.setState( {dialogOpenShowStake: false});
  }


  createActionRow(req, index) {

    if (this.props.ServiceRequest.getServiceRequestById[req] !== undefined && req !== null) {
      var r = this.props.ServiceRequest.getServiceRequestById[req].value;

      var enableStake = false;
      var enableSubmitSol = false;
      var enableVote = false;
      
      // TODO: Add condition check for Stake Members cannot Submit Solution and vice versa

      //block.number < req.expiration && block.number <= req.endSubmission
      if(parseInt(this.state.blockNumber,10) < parseInt(r.expiration,10) && parseInt(this.state.blockNumber,10) <= parseInt(r.endSubmission,10)) {
        enableSubmitSol = true;
      }

      //block.number < req.expiration && block.number < req.endEvaluation
      if(parseInt(this.state.blockNumber,10) < parseInt(r.expiration,10) &&  parseInt(this.state.blockNumber,10) <= parseInt(r.endEvaluation,10)) {
        enableStake = true;
      }

      //block.number < req.expiration && block.number > req.endSubmission && block.number <= req.endEvaluation
      if(parseInt(this.state.blockNumber,10) < parseInt(r.expiration,10) && parseInt(this.state.blockNumber,10) > parseInt(r.endSubmission,10) && parseInt(this.state.blockNumber,10) <= parseInt(r.endEvaluation,10)) {
        enableVote = true;
      }

      if(this.state.compRequestStatus === "999" && parseInt(r.expiration,10) < parseInt(this.state.blockNumber,10)) {
        return (
            <ExpansionPanelActions>
                <div className="row">
                    <div className="col">
                      <button className="blue float-right ml-4" data-toggle="modal" data-target="#exampleModal" onClick={event => this.handleVoteButton(event, r.requestId, r.expiration)}>View Solution</button>
                    </div>
                </div>
            </ExpansionPanelActions>
        )
      } else if(r.status === "0") {
        return (
            <ExpansionPanelActions>
                <div className="row">
                    <div className="col">
                        <button className="blue float-right ml-4" disabled={!this.state.isFoundationMember} data-toggle="modal" data-target="#exampleModal" onClick={event => this.handleApproveButton(event, r.requestId, r.expiration)}>Approve Request</button>
                        <button className="red float-right ml-4" disabled={!this.state.isFoundationMember} onClick={event => this.handleRejectButton(event, r.requestId)}>Reject Request</button>                                   
                    </div>
                </div>
            </ExpansionPanelActions>
        )
      } else if(r.status === "1" && parseInt(r.expiration,10) > parseInt(this.state.blockNumber,10)) {
        return (
            <ExpansionPanelActions>
                <div className="row">
                    <div className="col">
                        <button className="blue float-right ml-4" data-toggle="modal" data-target="#exampleModal" disabled={!enableSubmitSol} onClick={event => this.handleSubmitSolutionButton(event, r.requestId, r.expiration)}> Submit Solution</button>
                        <button className="blue float-right ml-4" data-toggle="modal" data-target="#exampleModal" disabled={!enableStake} onClick={event => this.handleStakeButton(event, r.requestId, r.expiration)}>Stake Request</button>
                        <button className="blue float-right ml-4" data-toggle="modal" data-target="#exampleModal" onClick={event => this.handleVoteButton(event, r.requestId, r.expiration)}>View / Vote Solution</button>
                        <button className="red float-right ml-4" disabled={!this.state.isFoundationMember} onClick={event => this.handleCloseButton(event, r.requestId)}>Close Request</button>                                   
                    </div>
                </div>
            </ExpansionPanelActions>
        )
      } else if(r.status === "2") {
        return (
            <ExpansionPanelActions>
                <div className="row">
                    <div className="col">
                    {/* <button className="blue float-right ml-4" data-toggle="modal" data-target="#exampleModal" onClick={event => this.handleVoteButton(event, r.requestId, r.expiration)}>View Solution</button> */}
                    </div>
                </div>
            </ExpansionPanelActions>
        )
      } else if(r.status === "4") {
        return (
            <ExpansionPanelActions>
                <div className="row">
                    <div className="col">
                      {/* <button className="blue float-right ml-4" data-toggle="modal" data-target="#exampleModal" onClick={event => this.handleVoteButton(event, r.requestId, r.expiration)}>View Solution</button> */}
                    </div>
                </div>
            </ExpansionPanelActions>
        )
      }
    }
  }

  createDetailsRow(req, index) {

    if (this.props.ServiceRequest.getServiceRequestById[req] !== undefined && req !== null) {

      var r = this.props.ServiceRequest.getServiceRequestById[req].value;
      var docURI = this.context.drizzle.web3.utils.toAscii(r.documentURI);
      if(this.state.compRequestStatus === "999" && parseInt(r.expiration,10) < parseInt(this.state.blockNumber,10)) {
        return (
          <ExpansionPanelDetails>
              <div className="row singularity-stake-details">
                  <div className="col-8">
                      <div><span class="singularity-label">Requester:</span> <span>{r.requester}</span></div>
                      <div><span class="singularity-label">documentURI:</span> <span>{docURI}</span></div>
                      <div><span class="singularity-label">Expiry:</span> <span>{r.expiration}</span></div>
                  </div>                                        
              </div>
          </ExpansionPanelDetails>
        )
      } else if(r.status === "0") {
        return (
            <ExpansionPanelDetails>
              <div className="row singularity-stake-details">
                    <div className="col-8">
                        <div><span class="singularity-label">Requester:</span> <span>{r.requester}</span></div>
                        <div><span class="singularity-label">documentURI:</span> <span>{docURI}</span></div>
                        <div><span class="singularity-label">Expiry:</span> <span>{r.expiration}</span></div>
                    </div>                                        
                </div>
            </ExpansionPanelDetails>
        )
      } else if(r.status === "1" && parseInt(r.expiration,10) > parseInt(this.state.blockNumber,10)) {
        return (
            <ExpansionPanelDetails>
              <div className="row singularity-stake-details">
                    <div className="col-8">
                        <div><span class="singularity-label">Requester:</span> <span>{r.requester}</span></div>
                        <div><span class="singularity-label">documentURI:</span> <span>{docURI}</span></div>
                        <div><span class="singularity-label">Expiry:</span> <span>{r.expiration}</span></div>
                    </div>                                        
                </div>
            </ExpansionPanelDetails>
        )
      } else if(r.status === "2") {
        return (
            <ExpansionPanelDetails>
                <div className="row singularity-stake-details">
                    <div className="col-8">
                        <div><span class="singularity-label">Requester:</span> <span>{r.requester}</span></div>
                        <div><span class="singularity-label">documentURI:</span> <span>{docURI}</span></div>
                        <div><span class="singularity-label">Expiry:</span> <span>{r.expiration}</span></div>
                    </div>                                        
                </div>
            </ExpansionPanelDetails>
        )
      } else if(r.status === "4") {
        return (
            <ExpansionPanelDetails>
                <div className="row singularity-stake-details">
                    <div className="col-8">
                        <div><span class="singularity-label">Requester:</span>  <span>{r.requester}</span></div>
                        <div>d<span class="singularity-label">ocumentURI:</span>  <span>{docURI}</span></div>
                        <div><span class="singularity-label">Expiry:</span>  <span>{r.expiration}</span></div>
                    </div>                                        
                </div>
            </ExpansionPanelDetails>
        )
      }
    }

  }

  createRow(req, index) {

    const {expanded} = this.state;

    if (this.props.ServiceRequest.getServiceRequestById[req] !== undefined && req !== null) {

      var r = this.props.ServiceRequest.getServiceRequestById[req].value;
      // Numbers are hard coded to check for Expiry as we dont manage expiry status for a request explicitly
      if((r.status === this.state.compRequestStatus && r.status !== "1") || 
        (this.state.compRequestStatus === "1" && r.status === "1" && parseInt(r.expiration,10) > parseInt(this.state.blockNumber,10) ) ||
        (this.state.compRequestStatus === "999" && parseInt(r.expiration,10)<parseInt(this.state.blockNumber,10) ) )
      {
        return (
            <ExpansionPanel expanded={expanded === r.requestId} onChange={this.handleChange(r.requestId)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>

                <div className="card" style={rowStyles.style}>
                    <div className="card-header" style={rowStyles.style}>
                        <div className="row singularity-stake-details">
                            <div className="col-3"><span className="float-left text-left">{r.requestId}</span></div>
                            <div className="col-5"><span className="float-left text-left">{r.requester}</span></div>
                            <div className="col-3">
                              <span className="float-right text-right">
                                <button className="blue float-right ml-4" data-toggle="modal" data-target="#exampleModal" onClick={event => this.handleShowStakeButton(event, r.requestId)}>{this.helperFunctions.fromWei(r.totalFund)}</button>
                              </span>
                            </div>
                            <div className="col-1">
                            </div>
                        </div>
                    </div>
                </div>

                {/* <Typography color="primary">{r.requestId}</Typography>
                <Typography color="secondary">{r.requester}</Typography>
                <Typography >
                  <button className="blue float-right ml-4" data-toggle="modal" data-target="#exampleModal" onClick={event => this.handleShowStakeButton(event, r.requestId)}>{this.helperFunctions.fromWei(r.totalFund)}</button>
                </Typography> */}
              </ExpansionPanelSummary>
              {this.createDetailsRow(req, index)}
              <Divider />
              {this.createActionRow(req, index)}
            </ExpansionPanel>
        );
      }
    }
  }

  generateRequests() {

    const requestsHTML = this.state.dataKeyRequestKeys.map((req, index) =>  { 
      return this.createRow(req, index)
    })
    
    return requestsHTML;
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {

    return (
      <div >
        <Paper styles={rootStyles}>

          <ExpansionPanel expanded={false}>
            <ExpansionPanelSummary>

              <div className="accordion-header card">
                  <div className="card-header">
                        <div className="row singularity-stake-details">
                          <div className="col-3"><span className="float-left text-left">Request Id</span></div>
                          <div className="col-5"><span className="float-left text-left">Requester</span></div>
                          <div className="col-3"><span className="float-right text-right">Total Funds (AGI)</span></div>
                          <div className="col-1">
                          </div>
                      </div>
                  </div>
              </div>

              {/* <Typography className={classes.heading}>Request Id</Typography>
                <Typography className={classes.secondaryHeading}>Requester</Typography>
                <Typography className={classes.secondaryHeading}>Total Funds (AGI)</Typography> */}

            </ExpansionPanelSummary>
          </ExpansionPanel>
          {/* this.generateRequests() */ this.state.dataKeyRequestKeys.map((req, index) =>  this.createRow(req, index)) } 

        </Paper>

        <Dialog PaperProps={dialogStyles} open={this.state.dialogOpen} >
          <p>{this.state.alertText}</p>
          <p><Button variant="contained" onClick={this.handleDialogClose} >Close</Button></p>
        </Dialog>

        <Dialog PaperProps={dialogApproveStyles} open={this.state.dialogOpenApproveRequest} >

          <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Approve Request</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleApproveRequestDialogClose}>
                              <span aria-hidden="true">&times;</span>
                          </button>
                          <div className="clear"></div><br/>
                      </div>
                      <div className="modal-body">
                      <ApproveRequest requestId={this.state.approveRequestId} requestExpiry={this.state.approveRequestExpiry} />
                      </div>
                  </div>
              </div>
        </Dialog>


        <Dialog PaperProps={dialogApproveStyles} open={this.state.dialogOpenStakeRequest} >
          <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Stake Request</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleStakeRequestDialogClose}>
                              <span aria-hidden="true">&times;</span>
                          </button>
                          <div className="clear"></div><br/>
                      </div>
                      <div className="modal-body">
                      <StakeRequest requestId={this.state.selectedRequestId} requestExpiry={this.state.selectedRequestExpiry} />
                      </div>
                  </div>
              </div>
          </Dialog>

          <Dialog PaperProps={dialogApproveStyles} open={this.state.dialogOpenSubmitSolutionRequest} >
          <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Submit Solution</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleSubmitSolutionDialogClose}>
                              <span aria-hidden="true">&times;</span>
                          </button>
                          <div className="clear"></div><br/>
                      </div>
                      <div className="modal-body">
                        <div className="main-content">
                            <div > 
                                <p><strong>Submit Solution to Request Id - {this.state.selectedRequestId} </strong></p>
                                <form className="pure-form pure-form-stacked">
                                  <div class="singularity-content">
                                    <div class="row">
                                        <div class="col">
                                            <label>Solution Document URI:</label><div class="clearfix"></div>
                                            <input className="singularity-input" name="solutionDocumentURI" type="text" placeholder="Document URI:" autoComplete='off' value={this.state.solutionDocumentURI} onChange={this.handleRequestInputChange} />
                                            <div class="spacer"></div>
                                        </div>
                                    </div>
                                    <button type="button" class="blue" onClick={this.handleSubmitSolution2Button}>Submit</button>
                                  </div>
                                </form>
                            </div>
                        </div>
                  </div>
              </div>
            </div>
          </Dialog>

          <Dialog PaperProps={dialogApproveStyles} open={this.state.dialogOpenShowStake} >
           <div role="document"> {/* className="modal-dialog"  */}
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Request Stake Details</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleShowStakeDialogClose}>
                              <span aria-hidden="true">&times;</span>
                          </button>
                          <div className="clear"></div><br/>
                      </div>
                      <div className="modal-body">
                        <RequestStakeDetails requestId={this.state.selectedRequestId} />
                      </div>
                  </div>
            </div>
          </Dialog>

          <Dialog PaperProps={dialogApproveStyles} open={this.state.dialogOpenVoteRequest} >
           <div role="document"> {/* className="modal-dialog"  */}
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Request Solutions and Vote</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleVoteDialogClose}>
                              <span aria-hidden="true">&times;</span>
                          </button>
                          <div className="clear"></div><br/>
                      </div>
                      <div className="modal-body">
                        <RequestSolution requestId={this.state.selectedRequestId}/>
                      </div>
                  </div>
            </div>
          </Dialog>

      </div>




    )
  }
}

RequestListV2.contextTypes = {
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

export default drizzleConnect(RequestListV2, mapStateToProps)
