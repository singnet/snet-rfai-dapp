import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

//components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

import HelperFunctions from '../HelperFunctions'
import TransactionResult from '../TransactionResult'
import { toast } from 'react-toastify';

//inline styles
const dialogStyles = {
  style: {
    backgroundColor: '#F9DBDB',
    padding: 20
  }
}

class ApproveRequest extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.context = context
    this.helperFunctions = new HelperFunctions();

    this.handleRequestInputChange = this.handleRequestInputChange.bind(this)
    this.handleBlockNumInputChange = this.handleBlockNumInputChange.bind(this)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleApproveButton = this.handleApproveButton.bind(this)

    console.log("ApproveRequest Constructor " + this.props.requestId + " &&& " + this.props.requestExpiry);

    this.state = {
      requestId: this.props.requestId,
      endSubmission: 0,
      endEvaluation: 0,
      newExpiration: this.props.requestExpiry,
      expiration: this.props.requestExpiry,
      blockNumber: 0,
      stackId: null,
      dialogOpen: false,
      alertText: ''
    }

    //uint256 requestId, uint256 endSubmission, uint256 endEvaluation, uint256 newExpiration
    this.setBlockNumber();

  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  setBlockNumber() {
    // Update the Block Number
    this.context.drizzle.web3.eth.getBlockNumber((err, blockNumber) => {
      this.setState({blockNumber});
    });
  }
  
  handleRequestInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlockNumInputChange(event) {
    if (event.target.value.match(/^[0-9]{1,40}$/)) {
      this.setState({ [event.target.name]: event.target.value })
    } else if(event.target.value === '') {
      this.setState({ [event.target.name]: '' })
    } else {
      // Just Ignore the value
    }
  }

  handleDialogOpen() {
    this.setState({ dialogOpen: true })
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }

  handleApproveButton() {

    // Do client side validations before calling approve request    
    if(parseInt(this.state.endSubmission,10) > 0 && parseInt(this.state.endSubmission,10) > parseInt(this.state.blockNumber,10) && 
      parseInt(this.state.endEvaluation,10) > 0  && parseInt(this.state.endEvaluation,10) > parseInt(this.state.blockNumber,10) && 
      parseInt(this.state.newExpiration,10) > 0 && parseInt(this.state.newExpiration,10) > parseInt(this.state.blockNumber,10) && 
      parseInt(this.state.endEvaluation,10) > parseInt(this.state.endSubmission,10) && 
      parseInt(this.state.newExpiration,10) > parseInt(this.state.endEvaluation,10))
    {
      this.handleDialogClose();
      
      // Call Approve Method to approve the request
      const stackId = this.contracts.ServiceRequest.methods["approveRequest"].cacheSend(this.state.requestId, this.state.endSubmission, this.state.endEvaluation, this.state.newExpiration, {from: this.props.accounts[0]})
      this.setState({stackId}, () => {this.createToast()});

    } else if(this.state.endSubmission === 0 || parseInt(this.state.endEvaluation,10) <= parseInt(this.state.endSubmission,10) || parseInt(this.state.endSubmission,10) <= parseInt(this.state.blockNumber,10)) {
      this.setState({ alertText: `Oops! Invalid End of Submission block number.`})
      this.handleDialogOpen()
    } else if(this.state.endEvaluation === 0 || parseInt(this.state.newExpiration,10) <= parseInt(this.state.endEvaluation,10) || parseInt(this.state.endEvaluation,10) <= parseInt(this.state.blockNumber,10)) {
      this.setState({ alertText: `Oops! Invalid End of Evaluation block number.`})
      this.handleDialogOpen()
    } else if(this.state.newExpiration === 0 || parseInt(this.state.newExpiration,10) <= parseInt(this.state.blockNumber,10)) {
      this.setState({ alertText: `Oops! Invalid Expiration block number.`})
      this.handleDialogOpen()
    } else {
      this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
      this.handleDialogOpen()
    }

  }

  createToast() {
    const tId = this.helperFunctions.generateRandomKey("at")
    toast.info(<TransactionResult toastId={tId} key={this.state.stackId} stackId={this.state.stackId} />, { toastId: tId, autoClose: false });
  }
  
  render() {
 
    return (
      <div>
        <form className="pure-form pure-form-stacked">
          <div className="singularity-content">
            <div className="row">
              <div className="col-md-12">
                <label>End submission block number:</label>
                <div className="clearfix"></div>
                <input className="singularity-input" name="endSubmission" type="number" placeholder="End of Submission:" autoComplete='off' value={this.state.endSubmission} min={this.state.blockNumber} onChange={this.handleBlockNumInputChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label>End evaluation block number:</label><div className="clearfix"></div>
                <input className="singularity-input" name="endEvaluation" type="number" placeholder="End of Evaluation:" autoComplete='off' value={this.state.endEvaluation} min={this.state.blockNumber} onChange={this.handleBlockNumInputChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">          
                <label>Expiration block number:</label><div className="clearfix"></div>
                <input className="singularity-input" name="newExpiration" type="number" placeholder="Expiration block number:" autoComplete='off' value={this.state.newExpiration} min={this.state.blockNumber} onChange={this.handleBlockNumInputChange} />          
              </div>
            </div>
            <div className="row">            
              <div className="col-md-12">
                <label>Current Blocknumber: {this.state.blockNumber}</label> 
                <div className="clearfix"></div>
              </div>
            </div>
            {
              this.state.dialogOpen ?
              <div className="row">
                <span className="error-message">{this.state.alertText}</span>
              </div> : null
            }
            <div className="row">
              <div className="col-md-12 text-center">
                <button type="button" className="blue" onClick={this.handleApproveButton}>Submit</button>
              </div>
            </div>
          </div>
        </form>

        {/* <Dialog PaperProps={dialogStyles} open={this.state.dialogOpen} >
          <p>{this.state.alertText}</p>
          <p><Button variant="contained" onClick={this.handleDialogClose} >Close</Button></p>
        </Dialog> */}
        
      </div>
    )
  }
}

ApproveRequest.contextTypes = {
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
export default drizzleConnect(ApproveRequest, mapStateToProps)