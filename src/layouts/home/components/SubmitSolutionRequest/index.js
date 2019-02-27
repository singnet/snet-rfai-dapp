import React, { Component } from 'react'
import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'

//components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

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

    this.handleRequestInputChange = this.handleRequestInputChange.bind(this)
    this.handleSubmitSolution2Button = this.handleSubmitSolution2Button.bind(this)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)

console.log("SubmitSolutionRequest Constructor " + this.props.requestId + " &&& " + this.props.requestExpiry);

    this.state = {
      requestId: this.props.requestId,
      expiration: this.props.requestExpiry,
      solutionDocumentURI: '',
      blockNumber: 0,
      dialogOpen: false,
      selectedLeftNav: 'nav1',
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

  handleDialogOpen() {
    this.setState({ dialogOpen: true })
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }

  handleSubmitSolution2Button() {
    const docURIinBytes = this.context.drizzle.web3.utils.fromAscii(this.state.solutionDocumentURI);
    if(this.state.solutionDocumentURI.length > 0) {
      const stackId = this.contracts.ServiceRequest.methods["createOrUpdateSolutionProposal"].cacheSend(this.state.requestId, docURIinBytes, {from: this.props.accounts[0]})
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

  handleLeftNavClick(event, selectedLeftNav) {
    this.setState({selectedLeftNav});
  }

  renderRightPane() {

    if(this.state.selectedLeftNav === 'nav1') {
      return (
        <div className="singularity-content">
          <p>place holder for nav1</p>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'nav2') {
      return (
        <div className="singularity-content">
          <p>place holder for nav2</p>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'nav3') {
      return (
        <div className="singularity-content">
          <p>place holder for nav3</p>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'nav4') {
      return (
        <div className="singularity-content">
          <p>place holder for nav4</p>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'navNewSolution') {
      return (
        <div className="singularity-content">
          <div className="row">
              <div className="col">
                  <label>Solution Document URI:</label><div className="clearfix"></div>
                  <input className="singularity-input" name="solutionDocumentURI" type="text" placeholder="Document URI:" autoComplete='off' value={this.state.solutionDocumentURI} onChange={this.handleRequestInputChange} />
                  <div className="spacer"></div>
              </div>
          </div>
          <button type="button" className="blue" onClick={this.handleSubmitSolution2Button}>Submit</button>
        </div>
      )
    }


  }

  render() {
 
    return (
      <div>
        <form className="pure-form pure-form-stacked create-request-form">
          {/* <div className="row">
            <div className="col-md-12 create-req-header">
              <span>Submit Solution </span>
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-3 create-req-tabs">
              <ul>
                <li className={this.state.selectedLeftNav === "nav1"?'active':''}><a href="#" title="Lorem" onClick={event => this.handleLeftNavClick(event, 'nav1')}>Lorem Ipsum</a></li>
                <li className={this.state.selectedLeftNav === "nav2"?'active':''}><a href="#" title="Lorem" onClick={event => this.handleLeftNavClick(event, 'nav2')}>Lorem Ipsum</a></li>
                <li className={this.state.selectedLeftNav === "nav3"?'active':''}><a href="#" title="Lorem" onClick={event => this.handleLeftNavClick(event, 'nav3')}>Lorem Ipsum</a></li>
                <li className={this.state.selectedLeftNav === "nav4"?'active':''}><a href="#" title="Lorem" onClick={event => this.handleLeftNavClick(event, 'nav4')}>Lorem Ipsum</a></li>
                <li className={this.state.selectedLeftNav === "navNewSolution"?'active':''}><a href="#" title="New Solution" onClick={event => this.handleLeftNavClick(event, 'navNewSolution')}>New Solution</a></li>
              </ul>
            </div>
            <div className="col-md-9">
                {this.renderRightPane()}
            </div>
          </div>          
        </form>

        <Dialog PaperProps={dialogStyles} open={this.state.dialogOpen} >
          <p>{this.state.alertText}</p>
          <p><Button variant="contained" onClick={this.handleDialogClose} >Close</Button></p>
        </Dialog>
        
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