import React, { Component } from "react";
//import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { useStyles } from "./styles";

//components
import TextField from "@material-ui/core/TextField";
//import Button from "@material-ui/core/Button";
//import Dialog from "@material-ui/core/Dialog";

class CreateRequest extends Component {
  constructor(props) {
    super(props);

    // this.helperFunctions = new HelperFunctions();

    // this.handleLeftNavClick = this.handleLeftNavClick.bind(this)

    this.handleRequestInputChange = this.handleRequestInputChange.bind(this);
    this.handleAmountInputChange = this.handleAmountInputChange.bind(this);
    this.handleBlockNumInputChange = this.handleBlockNumInputChange.bind(this);

    // this.handleLoginButton = this.handleLoginButton.bind(this)

    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleCreateButton = this.handleCreateButton.bind(this);

    // this.validateGitHandle = this.validateGitHandle.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this);

    var dt = new Date();
    // Default expiration date is set to 100 Days
    var defExpirtaionDate = new Date(Date.parse(dt) + 100 * 24 * 60 * 60 * 1000);

    this.state = {
      dialogOpen: false,
      requestTitle: "",
      requestDesc: "",
      initialStake: 0,
      expiration: 0,
      expirationDate: defExpirtaionDate.toISOString().slice(0, 10),
      documentURI: "",
      dataKeyTokenBalance: null,
      blockNumber: 0,
      requestAuthor: "",
      requestTrainingDS: "",
      requestAcptCriteria: "",
      stackId: null,
      isValidGitHanlde: false,
      showStatus: false,
      selectedLeftNav: "nav1",
      alertText: "",
      showConfirmation: false,
      tokenBalance: undefined,
      redirectTo: "",
    };

    //this.setBlockNumber();
  }

  //componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.ServiceRequest !== prevProps.ServiceRequest || prevState.dataKeyTokenBalance !== this.state.dataKeyTokenBalance) {
    //     this.setBlockNumber();
    //     this.setTokenBalance(this.props.ServiceRequest)
    // }
  }

  // setBlockNumber() {
  //   // Update the Block Number
  //   this.context.drizzle.web3.eth.getBlockNumber((err, blockNumber) => {
  //     this.setState({blockNumber});
  //   });
  // }

  // setTokenBalance(contract) {
  //   if (contract.balances[this.state.dataKeyTokenBalance] !== undefined && this.state.dataKeyTokenBalance !== null) {
  //     this.setState({
  //       tokenBalance: contract.balances[this.state.dataKeyTokenBalance].value
  //     })
  //   }
  // }

  handleRedirect(event, destURLPart) {
    this.setState({ redirectTo: destURLPart });
  }

  handleRequestInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleBlockNumInputChange(event) {
    if (event.target.value.match(/^[0-9]{1,40}$/)) {
      this.setState({ [event.target.name]: event.target.value });
    } else if (event.target.value === "") {
      this.setState({ [event.target.name]: "" });
    } else {
      // Just Ignore the value
    }
  }

  handleAmountInputChange(event) {
    //  Fixed to two decimal places
    if (event.target.value.match(/^\d+(\.\d{1,2})?$/)) {
      this.setState({ [event.target.name]: event.target.value });
    } else if (event.target.value === "") {
      this.setState({ [event.target.name]: "" });
    } else {
      // Just Ignore the value
    }
  }

  handleDialogOpen() {
    this.setState({ dialogOpen: true });
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  handleCreateButton(event, needConfirmation) {
    alert("Coming soo with updates");

    //     const ipfsURL = "https://96igw2u1hb.execute-api.us-east-1.amazonaws.com/gateway/ipfs"

    //     //value, expiration, documentURI
    //     var zeroBN = new BN(0)
    //     var initialStakeBN = new BN(this.helperFunctions.toWei(this.state.initialStake))
    //     var tokenBalanceBN = new BN(this.state.tokenBalance)

    //     //const docURIinBytes = this.context.drizzle.web3.utils.fromAscii(this.state.documentURI);
    //     const expiration = parseInt(this.state.blockNumber,10) + this.helperFunctions.computeBlocksFromDates(new Date(), this.state.expirationDate)

    //     //this.state.documentURI.length > 0 &&
    //     if( this.state.requestTitle.length > 0 &&
    //       initialStakeBN.gt(zeroBN) &&
    //       initialStakeBN.lte(tokenBalanceBN) && this.state.isValidGitHanlde === true &&
    //       parseInt(expiration,10) > parseInt(this.state.blockNumber,10)) {

    //         this.handleDialogClose();

    //         if(needConfirmation) {
    //           this.setState({showConfirmation: true})
    //           return;
    //         }
    //         this.setState({showConfirmation: false})

    //         var ipfsInput = {
    //           "title" : this.state.requestTitle,
    //           "description" : this.state.requestDesc,
    //           "documentURI": this.state.documentURI,
    //           "author": this.state.requestAuthor,
    //           "training-dataset": this.state.requestTrainingDS,
    //           "acceptance-criteria": this.state.requestAcptCriteria,
    //           "created": (new Date()).toISOString().slice(0,10)
    //         }

    //         const body = {
    //           'mode': 'cors',
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           method: 'POST',
    //           body: JSON.stringify(ipfsInput)
    //         }

    //         fetch(ipfsURL, body)
    //         .then(response => response.json())
    //         .then(data =>
    //           {
    // //console.log("ipfs hash - " + data.data.hash);
    //             const docURIinBytes = this.context.drizzle.web3.utils.fromAscii(data.data.hash);
    //             const stackId = this.contracts.ServiceRequest.methods["createRequest"].cacheSend(initialStakeBN.toString(), expiration, docURIinBytes, {from: this.props.accounts[0]})

    //             this.setState({stackId}, () => {this.createToast()});

    //           })
    //           .catch(err =>
    //             {
    //               console.log("err - " + err)
    //               this.setState({ alertText: `Oops! Something went wrong while creating the request.`})
    //               this.handleDialogOpen()
    //           })

    //     } else if (this.state.requestTitle.length === 0) {
    //       this.setState({ alertText: `Oops! Request title is blank. Please provide a title for te request`})
    //       this.handleDialogOpen()
    //     } else if (initialStakeBN.lte(zeroBN) || initialStakeBN.gt(tokenBalanceBN)) {
    //       this.setState({ alertText: `Oops! You dont have enough token balance in RFAI escrow. Please add tokens to the RFAI escrow from the Account page`})
    //       this.handleDialogOpen()
    //     } else if (!this.state.isValidGitHanlde) {
    //       this.setState({ alertText: `Oops! Invalid github handle provided. A valid github handle has to be provided.`})
    //       this.handleDialogOpen()
    //     } else if (expiration === '' || parseInt(expiration,10) <= parseInt(this.state.blockNumber,10)) {
    //       this.setState({ alertText: `Oops! Expiration seems to be too short, increase the expiry date.`})
    //       this.handleDialogOpen()
    //     } else {
    //       this.setState({ alertText: 'Oops! Something went wrong. Try checking your transaction details.'})
    //       this.handleDialogOpen()
    //     }
  }

  render() {
    const ctrlsToDisable = false;
    return (
      <div>
        <div>
          <label>Request Title</label>
          <input
            name="requestTitle"
            type="text"
            autoComplete="off"
            value={this.state.requestTitle}
            onChange={this.handleRequestInputChange}
            disabled={ctrlsToDisable ? "disabled" : ""}
          />
        </div>

        <div>
          {/* onChange={this.handleRequestInputChange} onBlur={this.validateGitHandle} */}
          <label>Requestor Name (Github handle)</label>
          <input
            name="requestAuthor"
            type="text"
            autoComplete="off"
            value={this.state.requestAuthor}
            readOnly="true"
            disabled={ctrlsToDisable ? "disabled" : ""}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="requestDesc"
            rows={2}
            cols={60}
            onChange={this.handleRequestInputChange}
            disabled={ctrlsToDisable ? "disabled" : ""}
          />

          {/* <span>340 / 500 Characters</span> */}
        </div>

        <div>
          <label>Github Link</label>
          <input
            name="documentURI"
            type="text"
            autoComplete="off"
            value={this.state.documentURI}
            onChange={this.handleRequestInputChange}
            disabled={ctrlsToDisable ? "disabled" : ""}
          />
        </div>

        <div>
          <label>Training Dataset URL</label>
          <input
            name="requestTrainingDS"
            type="text"
            autoComplete="off"
            value={this.state.requestTrainingDS}
            onChange={this.handleRequestInputChange}
            disabled={ctrlsToDisable ? "disabled" : ""}
          />
        </div>

        <div>
          <label>Acceptance Criteria</label>
          <textarea
            name="requestAcptCriteria"
            rows={2}
            cols={60}
            onChange={this.handleRequestInputChange}
            disabled={ctrlsToDisable ? "disabled" : ""}
          />

          {/* <span>340 / 500 Characters</span> */}
        </div>

        <div>
          <div>
            <div>
              {/* {this.helperFunctions.fromWei(this.state.tokenBalance)} */}
              <span>##### AGI</span>
              <label>Your Balance in Escrow</label>
            </div>
            <div>
              <label>Initial Funding Amount</label>
              <input
                name="initialStake"
                type="number"
                autoComplete="off"
                min={0}
                value={this.state.initialStake}
                onChange={this.handleAmountInputChange}
                disabled={ctrlsToDisable ? "disabled" : ""}
              />
            </div>
          </div>
        </div>

        <div>
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
            disabled={ctrlsToDisable ? "disabled" : ""}
          />
        </div>

        {this.state.dialogOpen ? (
          <div>
            <span>{this.state.alertText}</span>
          </div>
        ) : null}
        <div className="buttons">
          <button type="button" className="blue" onClick={event => this.handleCreateButton(event, true)}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(CreateRequest);
