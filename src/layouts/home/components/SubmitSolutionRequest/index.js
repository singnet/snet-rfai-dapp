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
        <div className="singularity-content submit-solution-tabs-content">
          <div className="row top-section">
            <div className="col-md-12 overview-content">
              <img src="http://placehold.it/210x210" title="Image" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>            
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>            
            </div>
          </div>
          <div className="row your-submission-div">
            <div className="col-md-12">
              <span>Your Submission</span>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              <div className="github-link-div">
                <span>Github Link</span>
                <span>https://www.lipsum.com/</span>
              </div>
              <p className="error-txt">error state message</p>
              <div className="buttons">
                <button className="cncl-btn">cancel</button>
                <button className="blue submit-btn">submit</button>
              </div>
            </div>
          </div>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'nav2') {
      return (
        <div className="singularity-content">
          <p>Request life cycle from creation to completion</p>
        </div>
      )
    } else if(this.state.selectedLeftNav === 'nav3') {
      return (
        <div className="singularity-content">
          <p>Evaluation crriteria and approach</p>
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
        <div className="row solution-submit-sub-header">
          <div className="col-md-12">
            <span className="bold">Digit Recognizer</span>
          </div>
        </div>
          <div className="row  solution-submit-tabs">
            <div className="col-md-3 create-req-tabs">
              <ul>
                <li className={this.state.selectedLeftNav === "nav1"?'active':''}>
                  <a href="#" title="Lorem" onClick={event => this.handleLeftNavClick(event, 'nav1')}>Overview</a>
                </li>
                <li className={this.state.selectedLeftNav === "nav2"?'active':''}>
                  <a href="#" title="Lorem" onClick={event => this.handleLeftNavClick(event, 'nav2')}>Process flow</a>
                </li>
                <li className={this.state.selectedLeftNav === "nav3"?'active':''}>
                  <a href="#" title="Lorem" onClick={event => this.handleLeftNavClick(event, 'nav3')}>Evaluation</a>
                </li>
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