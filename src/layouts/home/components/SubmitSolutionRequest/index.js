import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

//components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'


import RequestIPFSData from '../RequestIPFSData'
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

class SubmitSolutionRequest extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.context = context
    this.helperFunctions = new HelperFunctions();

    this.handleRequestInputChange = this.handleRequestInputChange.bind(this)
    this.handleSubmitSolution2Button = this.handleSubmitSolution2Button.bind(this)
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)

    console.log("SubmitSolutionRequest Constructor " + this.props.requestId + " &&& " + this.props.requestExpiry);

    this.state = {
      requestId: this.props.requestId,
      expiration: this.props.requestExpiry,
      requestDocURI: this.props.requestDocURI,
      solutionDocumentURI: '',
      blockNumber: 0,
      stackId: null,
      dialogOpen: false,
      selectedLeftNav: 'nav1',
      alertText: ''
    }
    //uint256 requestId, uint256 endSubmission, uint256 endEvaluation, uint256 newExpiration

    this.setBlockNumber();
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

  handleDialogOpen() {
    this.setState({ dialogOpen: true })
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }

  handleSubmitSolution2Button() {
    const docURIinBytes = this.context.drizzle.web3.utils.fromAscii(this.state.solutionDocumentURI);
    if(this.state.solutionDocumentURI.length > 0) {

      this.handleDialogClose();

      const stackId = this.contracts.ServiceRequest.methods["createOrUpdateSolutionProposal"].cacheSend(this.state.requestId, docURIinBytes, {from: this.props.accounts[0]})
      this.setState({stackId}, () => {this.createToast()});

    } else if (this.state.solutionDocumentURI.length === 0) {
      this.setState({ alertText: 'Oops! Invalid solution document URI.'})
      this.handleDialogOpen()
    } else {
      this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
      this.handleDialogOpen()
    }
  }

  handleLeftNavClick(event, selectedLeftNav) {
    this.setState({selectedLeftNav});
  }

  createToast() {
    const tId = this.helperFunctions.generateRandomKey("at")
    toast.info(<TransactionResult toastId={tId} key={this.state.stackId} stackId={this.state.stackId} />, { toastId: tId, autoClose: false });
  }

  renderRightPane() {
    if(this.state.selectedLeftNav === 'nav1') {
      return (
        <div className="singularity-content submit-solution-tabs-content">
          <div className="row top-section">
            <div className="col-md-12 overview-content">
              <p>All submissions are evaluated by the SingularityNet foundation to ensure that the acceptance criteria as specified in the request is met and the problem is solved for.</p>
            </div>
          </div>
          <div className="row your-submission-div">
            <div className="col-md-12">
              <span>Your Submission</span>
              <p></p>
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              <div className="github-link-div">
                <span>Github Link</span>
                <span><input className="singularity-input" name="solutionDocumentURI" type="text" placeholder="Solution document URI:" autoComplete='off' value={this.state.solutionDocumentURI} onChange={this.handleRequestInputChange} /></span>
              </div>
              {
                this.state.dialogOpen ? <p className="error-txt"><label className="error-msg">{this.state.alertText}</label></p> : null
              }
              <div className="buttons">
                {/* <button className="cncl-btn">cancel</button> */}
                <button type="button" className="blue submit-btn" onClick={this.handleSubmitSolution2Button}>submit</button>
              </div>
            </div>
          </div>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'nav2') {
      return (
        <div className="singularity-content submit-solution-tabs-content">
        <div className="row top-section">
        <div className="overview-content">
          <p>
            <li>The specified acceptance criteria in the request must be met</li>
            <li>Any performance metrics specified against provided test datasets should be met</li>
            <li>Submission should pass the curation process for AI services on the platform</li>
          </p>
        </div>
        </div>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'nav3') {
      return (
        <div className="singularity-content submit-solution-tabs-content">
        <div className="row top-section">
        <div className="overview-content">
          <li>Provide the github repo of your code</li>
          <li>Sign your request using the same address used to publish the service. This is an important step to ensure that you are the owner of the service.</li>
        </div>
        </div>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'nav4') {
      return (
        <div className="singularity-content">
          <p>Additional Place Holder - Not configued in the menu</p>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'navNewSolution') {
      return (
        <div className="singularity-content">
          <div className="row">
              <div className="col">
                  <label>Solution Document URI:</label><div className="clearfix"></div>
                  {/* <input className="singularity-input" name="solutionDocumentURI" type="text" placeholder="Document URI:" autoComplete='off' value={this.state.solutionDocumentURI} onChange={this.handleRequestInputChange} /> */}
                  <div className="spacer"></div>
              </div>
          </div>
          {/* <button type="button" className="blue" onClick={this.handleSubmitSolution2Button}>Submit</button> */}
        </div>
      )
    }
  }

  render() { 
    return (
      <div>
        <form className="pure-form pure-form-stacked create-request-form">
        <div className="row solution-submit-sub-header">
          <div className="col-md-12">
            <span className="bold"><RequestIPFSData key="ss_{this.state.requestId}" requestId={this.state.requestId} IPFSHash={this.state.requestDocURI} getField="title" /></span>
          </div>
        </div>
          <div className="row  solution-submit-tabs">
            <div className="col-md-3 create-req-tabs">
              <ul>
                <li className={this.state.selectedLeftNav === "nav1"?'active':''}>
                  <a href="#" title="Lorem" onClick={event => this.handleLeftNavClick(event, 'nav1')}>Overview</a>
                </li>
                <li className={this.state.selectedLeftNav === "nav2"?'active':''}>
                  <a href="#" title="Lorem" onClick={event => this.handleLeftNavClick(event, 'nav2')}>Evaluation</a>
                </li>
                <li className={this.state.selectedLeftNav === "nav3"?'active':''}>
                  <a href="#" title="Lorem" onClick={event => this.handleLeftNavClick(event, 'nav3')}>Process</a>
                </li>
              </ul>
            </div>
            <div className="col-md-9">
              {this.renderRightPane()}
            </div>
          </div>          
        </form>
        
      </div>
    )
  }
}

SubmitSolutionRequest.contextTypes = {
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
export default drizzleConnect(SubmitSolutionRequest, mapStateToProps)