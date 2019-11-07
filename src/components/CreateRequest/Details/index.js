import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import { useStyles } from "./styles";

import web3 from "web3";

//components
import TextField from "@material-ui/core/TextField";
import StyledButton from "../../common/StyledButton";
import AlertBox from "../../common/AlertBox";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const BN = web3.utils.BN;

class Details extends Component {
  constructor(props) {
    super(props);

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
      requestTrainingDS: "",
      requestAcptCriteria: "",
      isValidGitHanlde: false,
      showStatus: false,
      alertText: "",
      showConfirmation: false,
    };
  }

  handleRequestInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAmountInputChange = event => {
    //  Fixed to two decimal places
    if (event.target.value.match(/^\d+(\.\d{1,2})?$/)) {
      this.setState({ [event.target.name]: event.target.value });
    } else if (event.target.value === "") {
      this.setState({ [event.target.name]: "" });
    } else {
      // Just Ignore the value
    }
  };

  handleContinueButton = () => {
    this.props.showSummaryContent();
  };

  handleDialogOpen() {
    this.setState({ dialogOpen: true });
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  computeBlocksFromDates(fromDate, toDate) {
    // Considering 15 Secs as block creation time
    var blocks = 0;
    if (isNaN(Date.parse(fromDate)) || isNaN(Date.parse(toDate))) {
      return blocks;
    } else {
      var dateInMillSecs = 0;
      dateInMillSecs = Date.parse(toDate) - Date.parse(fromDate);
      blocks = Math.floor(dateInMillSecs / (1000 * 15));
    }
    return blocks > 0 ? blocks : 0;
  }

  toWei(val) {
    var factor = Math.pow(10, 8);
    var weiValBN = new BN(Math.round(val * factor));
    return weiValBN.toString();
  }

  handleCreateButton(event, needConfirmation) {
    //tokenBalance, tokenAllowance,
    const { metamaskDetails, rfaiTokenBalance } = this.props;

    if (!metamaskDetails.isTxnsAllowed) {
      this.setState({ alertText: `Needs connection to Metamask` });
      this.handleDialogOpen();
      return;
    }

    //const ipfsURL = process.env.REACT_APP_IPFS_ENDPOINT;

    //value, expiration, documentURI
    var zeroBN = new BN(0);
    var initialStakeBN = new BN(this.toWei(this.state.initialStake));
    var tokenBalanceBN = new BN(rfaiTokenBalance);

    //const docURIinBytes = this.context.drizzle.web3.utils.fromAscii(this.state.documentURI);
    const expiration =
      parseInt(this.state.blockNumber, 10) + this.computeBlocksFromDates(new Date(), this.state.expirationDate);

    //this.state.documentURI.length > 0 &&
    if (
      this.state.requestTitle.length > 0 &&
      initialStakeBN.gt(zeroBN) &&
      initialStakeBN.lte(tokenBalanceBN) &&
      parseInt(expiration, 10) > parseInt(this.state.blockNumber, 10)
    ) {
      //this.handleDialogClose();

      if (needConfirmation) {
        this.setState({ showConfirmation: true });
        return;
      }
      this.setState({ showConfirmation: false });

      // TODO: See if we can get the login User Name or Email as the Request Author
      //"author": this.state.requestAuthor,
      // var ipfsInput = {
      //   title: this.state.requestTitle,
      //   description: this.state.requestDesc,
      //   documentURI: this.state.documentURI,
      //   "training-dataset": this.state.requestTrainingDS,
      //   "acceptance-criteria": this.state.requestAcptCriteria,
      //   created: new Date().toISOString().slice(0, 10),
      // };

      // const body = {
      //   mode: "cors",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   method: "POST",
      //   body: JSON.stringify(ipfsInput),
      // };

      // fetch(ipfsURL, body)
      // .then(response => response.json())
      // .then(data =>
      //   {
      //     //console.log("ipfs hash - " + data.data.hash);
      //     const docURIinBytes = web3.utils.fromAscii(data.data.hash);
      //     const stackId = this.contracts.ServiceRequest.methods["createRequest"].cacheSend(initialStakeBN.toString(), expiration, docURIinBytes, {from: this.props.accounts[0]})

      //     //this.setState({stackId}, () => {this.createToast()});

      //   })
      //   .catch(err =>
      //     {
      //       console.log("err - " + err)
      //       this.setState({ alertText: `Oops! Something went wrong while creating the request.`})
      //       this.handleDialogOpen()
      //   })

      this.setState({ alertText: `All are okay to proceed...` });
      this.handleDialogOpen();
    } else if (this.state.requestTitle.length === 0) {
      this.setState({ alertText: `Oops! Request title is blank. Please provide a title for the request` });
      this.handleDialogOpen();
    } else if (initialStakeBN.lte(zeroBN) || initialStakeBN.gt(tokenBalanceBN)) {
      this.setState({
        alertText: `Oops! You dont have enough token balance in RFAI escrow. Please add tokens to the RFAI escrow from the Account page`,
      });
      this.handleDialogOpen();
    } else if (expiration === "" || parseInt(expiration, 10) <= parseInt(this.state.blockNumber, 10)) {
      this.setState({ alertText: `Oops! Expiration seems to be too short, increase the expiry date.` });
      this.handleDialogOpen();
    } else {
      this.setState({ alertText: "Oops! Something went wrong. Try checking your transaction details." });
      this.handleDialogOpen();
    }
  }

  render() {
    const ctrlsToDisable = false;
    const { classes } = this.props;
    const { dialogOpen } = this.state;

    return (
      <div className={classes.detailsMainContainer}>
        <div className={classes.reqTitleContainer}>
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

        <div className={classes.descriptionContainer}>
          <label>Description</label>
          <textarea
            name="requestDesc"
            rows={5}
            cols={60}
            onChange={this.handleRequestInputChange}
            disabled={ctrlsToDisable ? "disabled" : ""}
          />
          <span>Minimum 120 characters</span>
        </div>

        <div className={classes.acceptanceCriteriaContainer}>
          <InfoIcon className={classes.infoIcon} />
          <label>Acceptance Criteria</label>
          <textarea
            name="requestAcptCriteria"
            rows={5}
            cols={60}
            onChange={this.handleRequestInputChange}
            disabled={ctrlsToDisable ? "disabled" : ""}
          />
          <span>Minimum 120 characters</span>
        </div>

        <div className={classes.githubURLContainer}>
          <div className={classes.githubLinkContainer}>
            <InfoIcon className={classes.infoIcon} />
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
          <div className={classes.trainingDBContainer}>
            <InfoIcon className={classes.infoIcon} />
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
        </div>

        <div className={classes.fundingAmtContainer}>
          <InfoIcon className={classes.infoIcon} />
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

        <div>
          <InfoIcon className={classes.infoIcon} />
          <label>Expiry Date</label>
          <TextField
            name="expirationDate"
            id="expirationDate"
            type="date"
            defaultValue={this.state.expirationDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleRequestInputChange}
            disabled={ctrlsToDisable ? "disabled" : ""}
          />
        </div>
        {dialogOpen ? <AlertBox type="error" message={this.state.alertText} /> : null}

        <div className={classes.btnContainer}>
          <StyledButton type="transparent" onClick={event => this.handleBackButton(event, true)} btnText="back" />
          <StyledButton type="blue" onClick={event => this.handleCreateButton(event, true)} btnText="continue" />
        </div>

        <Dialog PaperProps={classes.dialogStyles} open={this.state.showConfirmation}>
          <p>
            Please make sure that the details entered are accurate. <br /> Click Ok to proceed and Cancel to revalidate!
          </p>
          <br />
          <p>
            Once the requested submitted successfully, will be sent for approval. You can check the status in my
            requests tab.
          </p>
          <p>
            <Button className="blue float-right ml-4" onClick={event => this.handleCreateButton(event, false)}>
              Ok
            </Button>
            <Button className="blue float-right ml-4" onClick={() => this.setState({ showConfirmation: false })}>
              Cancel
            </Button>
          </p>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  tokenBalance: state.tokenReducer.tokenBalance,
  tokenAllowance: state.tokenReducer.tokenAllowance,
  rfaiTokenBalance: state.rfaiContractReducer.rfaiTokenBalance,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Details));
