import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import web3 from 'web3'

//components
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

import TransactionResult from '../TransactionResult'
import HelperFunctions from '../HelperFunctions'
import { toast } from 'react-toastify';

//inline styles
const dialogStyles = {
  style: {
    backgroundColor: '#F9DBDB',
    padding: 20
  }
}

const BN = web3.utils.BN

class CreateRequest extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.context = context
    this.helperFunctions = new HelperFunctions();

    this.handleLeftNavClick = this.handleLeftNavClick.bind(this)

    this.handleRequestInputChange = this.handleRequestInputChange.bind(this)
    this.handleAmountInputChange = this.handleAmountInputChange.bind(this)
    this.handleBlockNumInputChange = this.handleBlockNumInputChange.bind(this)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleCreateButton = this.handleCreateButton.bind(this)


    var dt = new Date()
    // Default expiration date is set to 100 Days
    var defExpirtaionDate = new Date(Date.parse(dt) + (100*24*60*60*1000))

    this.state = {
      dialogOpen: false,
      requestTitle: '',
      requestDesc: '',
      initialStake: 0,
      expiration: 0,
      expirationDate: defExpirtaionDate.toISOString().slice(0,10),
      documentURI: '',
      dataKeyTokenBalance: null,
      tknBalance: 0,
      blockNumber: 0,
      requestAuthor: '',
      requestTrainingDS: '',
      requestAcptCriteria: '',
      stackId: null,
      isValidGitHanlde: false,
      showStatus: false,
      selectedLeftNav: 'nav1',
      alertText: ''
    }

    this.setBlockNumber();

  }

  componentDidMount() {
    // Get the Data Key
    const dataKeyTokenBalance = this.contracts.ServiceRequest.methods.balances.cacheCall(this.props.accounts[0]);

    this.setState({dataKeyTokenBalance})
    this.setTokenBalance(this.props.ServiceRequest)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.ServiceRequest !== prevProps.ServiceRequest || prevState.dataKeyTokenBalance !== this.state.dataKeyTokenBalance) {
        this.setBlockNumber();
        this.setTokenBalance(this.props.ServiceRequest)
    }

    if(prevState.requestAuthor !== this.state.requestAuthor && this.state.requestAuthor !== '') {
      this.validateGitHandle(this.state.requestAuthor)
    }
  }


  setBlockNumber() {
    // Update the Block Number
    this.context.drizzle.web3.eth.getBlockNumber((err, blockNumber) => {
      this.setState({blockNumber});
    });
  }

  setTokenBalance(contract) {
    if (contract.balances[this.state.dataKeyTokenBalance] !== undefined && this.state.dataKeyTokenBalance !== null) {
      this.setState({
        tokenBalance: contract.balances[this.state.dataKeyTokenBalance].value
      })
    }
  }
  
  handleRequestInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  validateGitHandle(gitHandle) {
    const gitURL = "https://api.github.com/users/" + gitHandle
    const reqOptions = {
      'mode': 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      method: 'GET'
    }
    fetch(gitURL, reqOptions)
        .then(response => 
            {
              if(response.ok) {
                this.setState({isValidGitHanlde: true})
              }
              else {
                this.setState({isValidGitHanlde: false})
              }
            })
        .catch(err => 
            {
              this.setState({isValidGitHanlde: false})
          })
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

  handleAmountInputChange(event) {
    //  Fixed to two decimal places
    if (event.target.value.match(/^\d+(\.\d{1,2})?$/)) {
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

  handleCreateButton() {

    const ipfsURL = "https://96igw2u1hb.execute-api.us-east-1.amazonaws.com/gateway/ipfs"
    //"http://ipfs.singularitynet.io/api/v0/cat?arg=QmVqtqGcTM63EktBx4XQgekw9epn8fDED11M7bXpWMPKty"
    //"https://96igw2u1hb.execute-api.us-east-1.amazonaws.com/gateway/ipfs"

    //value, expiration, documentURI 
    var zeroBN = new BN(0)
    var initialStakeBN = new BN(this.helperFunctions.toWei(this.state.initialStake))
    var tokenBalanceBN = new BN(this.state.tokenBalance)

    //const docURIinBytes = this.context.drizzle.web3.utils.fromAscii(this.state.documentURI);
    const expiration = parseInt(this.state.blockNumber,10) + this.helperFunctions.computeBlocksFromDates(new Date(), this.state.expirationDate)

    if(this.state.documentURI.length > 0 && this.state.requestTitle.length > 0 && 
      initialStakeBN.gt(zeroBN) && 
      initialStakeBN.lte(tokenBalanceBN) && this.state.isValidGitHanlde === true && 
      parseInt(expiration,10) > parseInt(this.state.blockNumber,10)) {

        this.handleDialogClose();

        var ipfsInput = { 
          "title" : this.state.requestTitle, 
          "description" : this.state.requestDesc,
          "documentURI": this.state.documentURI,
          "author": this.state.requestAuthor,
          "training-dataset": this.state.requestTrainingDS,
          "acceptance-criteria": this.state.requestAcptCriteria,
          "created": (new Date()).toISOString().slice(0,10)
        }

        const body = {
          'mode': 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          method: 'POST',
          body: JSON.stringify(ipfsInput)
        }

        fetch(ipfsURL, body)
        .then(response => response.json())
        .then(data => 
          {
console.log("ipfs hash - " + data.data.hash);
            const docURIinBytes = this.context.drizzle.web3.utils.fromAscii(data.data.hash);
            const stackId = this.contracts.ServiceRequest.methods["createRequest"].cacheSend(initialStakeBN.toString(), expiration, docURIinBytes, {from: this.props.accounts[0]})

            this.setState({stackId}, () => {this.createToast()});

          })
          .catch(err => 
            {
              console.log("err - " + err)
              this.setState({ alertText: `Oops! Something went wrong while creating the request.`})
              this.handleDialogOpen()
          })

    } else if (this.state.requestTitle.length === 0) {
      this.setState({ alertText: `Oops! It is invalid request title.`})
      this.handleDialogOpen()
    } else if (initialStakeBN.lte(zeroBN) || initialStakeBN.gte(tokenBalanceBN)) {
      this.setState({ alertText: `Oops! You dont have enough token balance in RFAI Escrow.`})
      this.handleDialogOpen()
    } else if (!this.state.isValidGitHanlde) {
      this.setState({ alertText: `Oops! Invalid Github handle.`})
      this.handleDialogOpen()
    } else if (expiration === '' || parseInt(expiration,10) <= parseInt(this.state.blockNumber,10)) {
      this.setState({ alertText: `Oops! Expiration seems to be too short, increase the expiry date.`})
      this.handleDialogOpen()  
    } else if (this.state.documentURI.length === 0) {
      this.setState({ alertText: `Oops! It is invalid document URI.`})
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
        <div className="singularity-content create-req-overview-content">
          <p>
            You can request for any AI Service that would like to see built on top of the SingularityNet platform. Requests should be detailed enough to allow discussion and development and should be in the form of a github pull requests to <a href="https://faucet.ropsten.be/" target="_blank">repo</a>. You can view the template for the request <a href="https://faucet.ropsten.be/" target="_blank">here</a>
          </p>
          <p>
            We would like to have an objective and measurable acceptance criteria (get accuracy above X% of this data, etc). The foundation will review and approve requests which will appear on here
          </p>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'nav2') {
      return (
        <div className="singularity-content">
          <div>
          The foundation will review all requests and will approve them. In general we look for 
            <li>Clear problem description</li>
            <li>Relevant problem which if solved will help the community</li>
            <li>Quantitative evaluation criteria</li>
          </div>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'nav3') {
      return (
        <div className="singularity-content">
          <div>
              <li>Raise a github pull request based on the template to </li>
              <li>Provide a title and description along with the URL of the github pull request</li>
              <li>In order to incentivize people to develop solutions we require that you back your requests with AGI tokens. The tokens will be distributed to the accepted solutions. See the Submission Evaluation process for more details</li>
              <li>Provide an expiry date for the request. Meaning the date post which you can withdraw your funds if no submission has been made</li>
          </div>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'nav4') {
      return (
        <div className="singularity-content">
          <div>
              <li>Raise a github pull request based on the template to </li>
              <li>Provide a title and description along with the URL of the github pull request</li>
              <li>In order to incentivize people to develop solutions we require that you back your requests with AGI tokens. The tokens will be distributed to the accepted solutions. See the Submission Evaluation process for more details</li>
              <li>Provide an expiry date for the request. Meaning the date post which you can withdraw your funds if no submission has been made</li>
          </div>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'navCreateRequest') {
      return (
        <div className="singularity-content create-req-submit-req-content">
          <div className="row">
          <input name="requestTitle" type="text" autoComplete='off' value={this.state.requestTitle} onChange={this.handleRequestInputChange} />
            <label>Request Title</label>
          </div>

          <div className="row">
          <input name="requestAuthor" type="text" autoComplete='off' value={this.state.requestAuthor} onChange={this.handleRequestInputChange} />         
            <label>Requestor Name (Github handle)</label>
          </div>

          <div className="row description">
            <textarea name="requestDesc" rows={2} cols={60} onChange={this.handleRequestInputChange}/>
            <label>Description</label>
            { /* <span>340 / 500 Characters</span> */ }
          </div>

          <div className="row">
            <input name="documentURI" type="text" autoComplete='off' value={this.state.documentURI} onChange={this.handleRequestInputChange} />            
            <label>Github Link</label>
          </div>

          <div className="row">
            <input name="requestTrainingDS" type="text" autoComplete='off' value={this.state.requestTrainingDS} onChange={this.handleRequestInputChange} />         
            <label>Training Dataset URL</label>
          </div>

          <div className="row acceptance-criteria">
            <textarea name="requestAcptCriteria" rows={2} cols={60} onChange={this.handleRequestInputChange}/>
            <label>Acceptance Criteria</label>
            { /* <span>340 / 500 Characters</span> */ }
          </div>

          <div className="row">
            <div className="col-md-12 escrow-bal-init-fund-amt">
              <div className="col-md-6 escrow-bal">
                <span>{this.helperFunctions.fromWei(this.state.tokenBalance)} AGI</span>
                <label>Your Balance in Escrow</label>
              </div>
              <div className="col-md-6">
                <input name="initialStake" type="number" autoComplete='off' min={0} value={this.state.initialStake} onChange={this.handleAmountInputChange} />            
                <label>Initial Funding Amount</label>
              </div>
            </div>
          </div>

          <div className="row">
            <label>Submission Deadline</label>
            <TextField
                name="expirationDate"
                id="expirationDate"
                type="date"
                className="singularity-textfield calender"
                defaultValue={this.state.expirationDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleRequestInputChange}
              />
          </div>

          {
            this.state.dialogOpen ?
            <div className="row">
              <span className="error-message">{this.state.alertText}</span>
            </div> : null
          }
          <div className="buttons">
            <button type="button" className="blue" onClick={this.handleCreateButton}>Submit</button>
          </div>
          
        </div>
      )
    }

  }

  render() {
 
    return (
      <div>
        {/* <Paper style={styles} elevation={5}> */}
          <form className="pure-form pure-form-stacked create-request-form">
            <div className="row">
              <div className="col-md-12 create-req-header">
                <h5>Create Request </h5>
              </div>
            </div>
            <div className="row create-new-req">
              <div className="col-md-3 create-req-tabs">
                <ul>
                  <li className={this.state.selectedLeftNav === "nav1"?'active':''}>
                    <a href="#" onClick={event => this.handleLeftNavClick(event, 'nav1')}>Overview</a>
                  </li>
                  <li className={this.state.selectedLeftNav === "nav2"?'active':''}>
                    <a href="#" onClick={event => this.handleLeftNavClick(event, 'nav2')}>Evaluation</a>
                  </li>
                  <li className={this.state.selectedLeftNav === "nav3"?'active':''}>
                    <a href="#" onClick={event => this.handleLeftNavClick(event, 'nav3')}>Process</a>
                  </li>
                  <li className={this.state.selectedLeftNav === "navCreateRequest"?'active':''}>
                    <a href="#" title="New Request" onClick={event => this.handleLeftNavClick(event, 'navCreateRequest')}>Submit Request</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-9">
                  {this.renderRightPane()}
              </div>
            </div>          
          </form>
        {/* </Paper> */}

      {/* <Dialog PaperProps={dialogStyles} open={this.state.dialogOpen} >
        <p>{this.state.alertText}</p>
        <p><Button variant="contained" onClick={this.handleDialogClose} >Close</Button></p>
      </Dialog> */}

      </div>
    )
  }
}

CreateRequest.contextTypes = {
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
export default drizzleConnect(CreateRequest, mapStateToProps)