import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

//components
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress';
import LaunchIcon from '../../../../images/launch.svg'

//inline styles
const progressStyles = {
    margin: 2,
}

const styles = {
  backgroundColor: 'white',
  padding: 20
}


class TransactionResult extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.context = context

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)

    this.state = {
      dialogOpen: false,
      stackId: this.props.stackId,
      txnHash: "Waiting for acceptance",
      txnReceipt: null,
      txnStatus: null,
      loadingIndicator: true,
      alertText: ''
    }

  }

  componentDidMount() {
    this.setTransaction();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.transactionStack !== prevProps.transactionStack || this.props.transactions !== prevProps.transactions) {
      this.setTransaction();
    }
  }

  setTransaction() {
console.log("setTransaction this.props.transactionStack[this.state.stackId] - " + this.props.transactionStack[this.state.stackId]);
    if (this.props.transactionStack[this.state.stackId]) {
console.log(" this.props.transactionStack[this.state.stackId] - " + this.props.transactionStack[this.state.stackId]);
      const txnHash = this.props.transactionStack[this.state.stackId]
console.log("txnHash - " + txnHash)
      this.setState({txnHash});
      // Status Will Changes from Pending to Success - Logic can be implemented accordingly
      if(this.props.transactions[txnHash]) {

        const txnStatus = this.props.transactions[txnHash].status
        this.setState({txnStatus});
  console.log("txnStatus - " + txnStatus);
        if(txnStatus !== "pending" ) {
          this.setState({loadingIndicator: false});

          if(this.props.callBack) {
            this.props.callBack();
          }
        }
      }

    }
  }


  handleDialogOpen() {
    this.setState({ dialogOpen: true })
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }


  render() {
 
    const txnURL = "http://ropsten.etherscan.io/tx/" + this.state.txnHash;
    return (
      <div>      

      <Paper style={styles} elevation={0} className="singularity-dialog">
        <div>
          <div> 
            { this.state.loadingIndicator && <CircularProgress style={progressStyles} /> } 
          </div>
          <div className="singularity-status-text">
            <p><label className="singularity-gen-label">Txn Status:</label> {this.state.txnStatus === null ? "Approve Txn in Metamask" : this.state.txnStatus} <a href={txnURL} target="_new"><img src={LaunchIcon} alt="Txn Hash" /></a></p>
            {/* <p><label className="singularity-gen-label">Txn Hash:</label> {this.state.txnHash}</p>           */}
          </div>
        </div>
        </Paper>

      </div>
    )
  }
}

TransactionResult.contextTypes = {
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
export default drizzleConnect(TransactionResult, mapStateToProps)