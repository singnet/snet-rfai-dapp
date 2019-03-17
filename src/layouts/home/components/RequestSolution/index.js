import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

// Request Table Functionality
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//components
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import HelperFunctions from '../HelperFunctions'

//inline styles
const dialogStyles = {
  style: {
    backgroundColor: '#F9DBDB',
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

const tableStyles = {
  minWidth: 450,
}

const tableColStyles = {
padding: 2,
}


class RequestSolution extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.context = context
    this.helperFunctions = new HelperFunctions();

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleVoteButton = this.handleVoteButton.bind(this)

    this.handleClaimButton = this.handleClaimButton.bind(this)

    this.state = {
      requestId: this.props.requestId,
      dataKeyRequestId: null,
      dataKeyStakeMembers: [],
      dataKeySubmitters: [],
      requester: '',
      totalFund: 0,
      documentURI: '',
      expiration: 0,
      endSubmission: 0,
      endEvaluation: 0,
      status: 0,
      stakeMembers: [], 
      submitters: [],
      blockNumber: 0,
      dialogOpen: false,
      alertText: ''
    }

// bool found, uint256 requestId, address requester, uint256 totalFund, bytes documentURI, uint256 expiration, uint256 endSubmission, uint256 endEvaluation, RequestStatus status, address[] stakeMembers, address[] submitters
    this.setBlockNumber();

  }

  componentDidMount() {
    // Get the Data Key
    const dataKeyRequestId = this.contracts.ServiceRequest.methods.getServiceRequestById.cacheCall(this.state.requestId);

    this.setState({dataKeyRequestId})
    this.setRequestDetails(this.props.ServiceRequest)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || prevState.dataKeyRequestId !== this.state.dataKeyRequestId) {
      this.setRequestDetails(this.props.ServiceRequest)
    }
  }

  setBlockNumber() {
    // Update the Block Number
    this.context.drizzle.web3.eth.getBlockNumber((err, blockNumber) => {
      this.setState({blockNumber});
    });
  }

  setRequestDetails(contract) {
    if (contract.getServiceRequestById[this.state.dataKeyRequestId] !== undefined && this.state.dataKeyRequestId !== null) {

      var r = contract.getServiceRequestById[this.state.dataKeyRequestId].value;

      // bool found, uint256 requestId, address requester, uint256 totalFund, bytes documentURI, uint256 expiration, uint256 endSubmission, uint256 endEvaluation, RequestStatus status, address[] stakeMembers, address[] submitters

      this.setState({
        //tokenBalance: contract.balances[this.state.dataKeyTokenBalance].value
        requester: r.requester,
        totalFund: r.totalFund,
        documentURI: r.documentURI,
        expiration: r.expiration,
        endSubmission: r.endSubmission,
        endEvaluation: r.endEvaluation,
        status: r.status,
        stakeMembers: r.stakeMembers, 
        submitters: r.submitters
      }, () => {
        console.log("Request State Loaded ");
      });

      // Get all the Submitted Solutions
      var dataKeySubmitters = []
      var i
      for(i=0; i<r.submitters.length; i++) {
        dataKeySubmitters.push(this.contracts.ServiceRequest.methods.getSubmittedSolutionById.cacheCall(this.state.requestId, r.submitters[i]))
      }
      this.setState({dataKeySubmitters});

      var dataKeyStakeMembers = []
      for(i=0; i<r.stakeMembers.length; i++) {
        dataKeyStakeMembers.push(this.contracts.ServiceRequest.methods.getStakeById.cacheCall(this.state.requestId, r.stakeMembers[i]))
      }
      this.setState({dataKeyStakeMembers});

    }
  }
  
  handleDialogOpen() {
    this.setState({ dialogOpen: true })
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }

  handleVoteButton(event, votedFor) {

    const stackId = this.contracts.ServiceRequest.methods["vote"].cacheSend(this.state.requestId, votedFor, {from: this.props.accounts[0]})
    if (this.props.transactionStack[stackId]) {
      const txHash = this.props.trasnactionStack[stackId]
      console.log("txHash - " + txHash)
    }

  }
  
  handleClaimButton(event) {

    const stackId = this.contracts.ServiceRequest.methods["requestClaim"].cacheSend(this.state.requestId, {from: this.props.accounts[0]})
    if (this.props.transactionStack[stackId]) {
      const txHash = this.props.trasnactionStack[stackId]
      console.log("txHash - " + txHash)
    }

  }

  createRow(submitter, index) {

    if (this.props.ServiceRequest.getSubmittedSolutionById[submitter] !== undefined && submitter !== null) {

      var s = this.props.ServiceRequest.getSubmittedSolutionById[submitter].value;
      // bool found, bytes solutionDocURI, uint256 totalVotes, bool isSubmitted, bool isShortlisted, bool isClaimed
      var solDocURI = this.context.drizzle.web3.utils.toAscii(s.solutionDocURI);
      if(s.found === true)
      {
        var enableClaim = false;
        var enableVote = false;

        // if Approved && Solution Submitted and HasVotes either from Foundation Member or Stake Member and should complete evaluation
        if(this.state.submitters[index] === this.props.accounts[0] && s.totalVotes > 0 && s.isClaimed === false
          && (this.state.status === "1" && parseInt(this.state.blockNumber,10) < parseInt(this.state.expiration,10) && parseInt(this.state.blockNumber,10) > parseInt(this.state.endEvaluation,10) )
          ) {
            enableClaim = true;
          }

        if(this.state.submitters[index] !== this.props.accounts[0] 
          && (this.state.status === "1" && parseInt(this.state.blockNumber,10) < parseInt(this.state.expiration,10) && parseInt(this.state.blockNumber,10) < parseInt(this.state.endEvaluation,10) && parseInt(this.state.blockNumber,10) > parseInt(this.state.endSubmission,10) )
          ) {
            enableVote = true;
        }
        return (
          <React.Fragment>
            <TableRow key={index}> 
              <TableCell style={tableColStyles} component="th" title={this.state.submitters[index]} scope="row">
                {s.isShortlisted === true ? <b>*</b>: ""}
                {this.helperFunctions.toShortAddress(this.state.submitters[index])}
              </TableCell>
              <TableCell style={tableColStyles} align="right">{solDocURI}</TableCell>
              <TableCell style={tableColStyles} align="right">{s.totalVotes}</TableCell>
              <TableCell style={tableColStyles} align="right">
                {/* {s.totalVotes} - {s.isSubmitted} - {s.isShortlisted} - {s.isClaimed} <br/> */}                 
                <button className={enableVote ? 'blue float-right ml-4' : 'disable'} disabled={!enableVote} onClick={event => this.handleVoteButton(event, this.state.submitters[index])}>Vote</button>
                <button className={enableClaim ? 'blue float-right ml-4' : 'disable'} disabled={!enableClaim} onClick={event => this.handleClaimButton(event, this.state.requestId)}>Claim</button>
              </TableCell>                
            </TableRow>
          </React.Fragment>
        );
      }
    }
  }

  render() {
 
    return (
      <div>
        <Paper styles={rootStyles}>
          <Table styles={tableStyles}>
            <TableHead>
              <TableRow key="header">
                <TableCell style={tableColStyles}>Submitter</TableCell>
                <TableCell style={tableColStyles} align="right">Solution URI</TableCell>
                <TableCell style={tableColStyles} align="right"># of Votes</TableCell>
                <TableCell style={tableColStyles} align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.dataKeySubmitters.map((submitter, index) =>  this.createRow(submitter, index))}
              {
                this.state.dataKeySubmitters.length === 0 ? 
                <TableRow key="noDataFound">
                  <TableCell colSpan={4}>No submissions available.</TableCell>
                </TableRow>
                : null
              }
            </TableBody>
          </Table>
        </Paper>

        <Dialog PaperProps={dialogStyles} open={this.state.dialogOpen} >
          <p>{this.state.alertText}</p>
          <p><Button variant="contained" onClick={this.handleDialogClose} >Close</Button></p>
        </Dialog>
      </div>
    )
  }
}

RequestSolution.contextTypes = {
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
export default drizzleConnect(RequestSolution, mapStateToProps)