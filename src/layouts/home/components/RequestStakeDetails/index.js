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
import Paper from '@material-ui/core/Paper'
import HelperFunctions from '../HelperFunctions'

//inline styles
const rootStyles = {
  style: {
    width: '100%',
    marginTop: 3,
    overflowX: 'auto',
  }
}

const tableStyles = {
    minWidth: 480,
}

class RequestStakeDetails extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.context = context
    this.helperFunctions = new HelperFunctions();

    this.handleClaimBackButton = this.handleClaimBackButton.bind(this)

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

    this.setBlockNumber();

    // bool found, uint256 requestId, address requester, uint256 totalFund, bytes documentURI, uint256 expiration, uint256 endSubmission, uint256 endEvaluation, RequestStatus status, address[] stakeMembers, address[] submitters
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
      this.setBlockNumber();
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
        console.log("Request State Loaded for Stake Members");
      });

      // Get all the Stake Members & their contributions
      var dataKeyStakeMembers = []
      for(var i=0; i<r.stakeMembers.length; i++) {
        dataKeyStakeMembers.push(this.contracts.ServiceRequest.methods.getStakeById.cacheCall(this.state.requestId, r.stakeMembers[i]))
      }
      this.setState({dataKeyStakeMembers});
    }
  }

  handleClaimBackButton(event, requestId) {

    const stackId = this.contracts.ServiceRequest.methods["requestClaimBack"].cacheSend(requestId, {from: this.props.accounts[0]})
      if (this.props.transactionStack[stackId]) {
        const txHash = this.props.trasnactionStack[stackId]
        console.log("txHash - " + txHash);
      }
  }

  createRow(staker, index) {

    if (this.props.ServiceRequest.getStakeById[staker] !== undefined && staker !== null) {

      var s = this.props.ServiceRequest.getStakeById[staker].value;
      // bool found, uint256 stake
      if(s.found === true)
      {
        var enableClaimBack = false;

        // if Closed/Rejected/Approved -> Expired
        if(this.state.stakeMembers[index] === this.props.accounts[0] && s.stake > 0 
          && ( this.state.status === "2" || this.state.status === "4" || (this.state.status === "1" && parseInt(this.state.expiration,10) < parseInt(this.state.blockNumber,10)))
          ) {
            enableClaimBack = true;
          }

        return (
          <React.Fragment>
            <TableRow key={index}> 
                <TableCell component="th" title={this.state.stakeMembers[index]} scope="row">{this.helperFunctions.toShortAddress(this.state.stakeMembers[index])}</TableCell>
                <TableCell align="right">{this.helperFunctions.fromWei(s.stake)}</TableCell>
                <TableCell align="right">
                  <button className={enableClaimBack ? 'blue float-right ml-4' : 'disable'} disabled={!enableClaimBack} onClick={event => this.handleClaimBackButton(event, this.state.requestId)}>Claim Back</button>
                </TableCell>
              </TableRow>
          </React.Fragment>
        );
      }
    }
  }

  render() {
    return (
      <div className="singularity-dialog-table-class">
        <Paper styles={rootStyles}>
          <Table style={tableStyles} elevation={0}>
            <TableHead>
              <TableRow key="headerkey">
                <TableCell>Backing Account</TableCell>
                <TableCell align="right">Amount (AGI)</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.dataKeyStakeMembers.map((staker, index) =>  this.createRow(staker, index))}
              {
                this.state.totalFund === "0" ?
                <TableRow key="noDataFound">
                  <TableCell colSpan={3}>No backing details available.</TableCell>
                </TableRow>
                : null
              }

            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

RequestStakeDetails.contextTypes = {
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
export default drizzleConnect(RequestStakeDetails, mapStateToProps)