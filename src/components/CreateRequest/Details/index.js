import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import { useStyles } from "./styles";

import web3 from "web3";

//components
import TextField from "@material-ui/core/TextField";
import StyledButton from "../../common/StyledButton";
import Dialog from "@material-ui/core/Dialog";

import AlertBox, { alertTypes } from "../../common/AlertBox";
import { rfaiContractActions, loaderActions } from "../../../Redux/actionCreators";
import { LoaderContent } from "../../../utility/constants/LoaderContent";

import { saveIPFSDocument } from "../../../utility/IPFSHelper";
import { waitForTransaction, createRequest, getBlockNumber } from "../../../utility/BlockchainHelper";
import { toWei, isValidInputAmount, computeBlocksFromDates } from "../../../utility/GenHelperFunctions";

const BN = web3.utils.BN;

class Details extends Component {
  constructor(props) {
    super(props);

    var dt = new Date();
    // Default expiration date is set to 100 Days
    var defExpirtaionDate = new Date(Date.parse(dt) + 100 * 24 * 60 * 60 * 1000);

    this.state = {
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
      showStatus: false,
      showConfirmation: false,
      alert: {
        type: alertTypes.ERROR,
        message: undefined,
      },
    };

    this.setBlockNumber();
  }

  componentDidMount = () => {
    const { metamaskDetails, updateRFAITokenBalance } = this.props;
    // Initiate the RFAI Token Balance
    updateRFAITokenBalance(metamaskDetails);
  };

  // TODO: Need to check why we are getting Block NUmber in Reject
  setBlockNumber = async () => {
    try {
      let blockNumber = await getBlockNumber();
      this.setState({ blockNumber });
    } catch (err) {
      this.setState({ blockNumber: err });
    }
  };

  handleRequestInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAmountInputChange = event => {
    if (isValidInputAmount(event.target.value)) {
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

  initiateCreateRequest = async () => {
    const { metamaskDetails, startLoader, stopLoader, updateRFAITokenBalance } = this.props;

    const expiration =
      parseInt(this.state.blockNumber, 10) + computeBlocksFromDates(new Date(), this.state.expirationDate);

    var initialStakeBN = new BN(toWei(this.state.initialStake));

    var ipfsInput = {
      title: this.state.requestTitle,
      description: this.state.requestDesc,
      documentURI: this.state.documentURI,
      "training-dataset": this.state.requestTrainingDS,
      "acceptance-criteria": this.state.requestAcptCriteria,
      created: new Date().toISOString().slice(0, 10),
    };

    try {
      // Get the bytes of IPFS hash - Will be an input to request creation
      let docURIinBytes = await saveIPFSDocument(ipfsInput);
      // console.log("IPFS loaded successfully - ", docURIinBytes);
      let txHash = await createRequest(metamaskDetails, initialStakeBN, expiration, docURIinBytes);

      this.setState({ alert: { type: alertTypes.INFO, message: "Transaction is in Progress" } });
      startLoader(LoaderContent.CREATE_REQUEST);

      await waitForTransaction(txHash);

      this.setState({ alert: { type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" } });

      stopLoader();

      // Dispatch the RFAI Escrow Balance Update
      updateRFAITokenBalance(metamaskDetails);

      this.showSummaryComponent(txHash);
    } catch (err) {
      this.setState({ alert: { type: alertTypes.ERROR, message: "Transaction has failed." } });
      stopLoader();
    }
  };

  showSummaryComponent = txHash => {
    const { metamaskDetails, showSummary } = this.props;

    const summaryData = {
      request_title: this.state.requestTitle,
      request_by: metamaskDetails.account,
      request_expiry: this.state.expirationDate,
      request_stake: this.state.initialStake,
    };

    // Call the Parent Create Request Event
    showSummary(summaryData);
  };

  handleCreateButton = async (event, needConfirmation) => {
    //tokenBalance, tokenAllowance,
    const { metamaskDetails, rfaiTokenBalance } = this.props;

    if (!metamaskDetails.isTxnsAllowed) {
      this.setState({ alert: { type: alertTypes.ERROR, message: `Needs connection to Metamask` } });
      return;
    }

    //value, expiration, documentURI
    const zeroBN = new BN(0);
    const initialStakeBN = new BN(toWei(this.state.initialStake));
    const rfaiTokenBalanceBN = new BN(rfaiTokenBalance);

    const expiration =
      parseInt(this.state.blockNumber, 10) + computeBlocksFromDates(new Date(), this.state.expirationDate);

    if (
      this.state.requestTitle.length > 0 &&
      initialStakeBN.gt(zeroBN) &&
      initialStakeBN.lte(rfaiTokenBalanceBN) &&
      parseInt(expiration, 10) > parseInt(this.state.blockNumber, 10)
    ) {
      if (needConfirmation) {
        this.setState({ showConfirmation: true });
        return;
      }
      this.setState({ showConfirmation: false });

      // Initiate the createRequest
      await this.initiateCreateRequest();
    } else if (this.state.requestTitle.length === 0) {
      this.setState({
        alert: {
          type: alertTypes.ERROR,
          message: `Oops! Request title is blank. Please provide a title for the request`,
        },
      });
    } else if (initialStakeBN.lte(zeroBN) || initialStakeBN.gt(rfaiTokenBalanceBN)) {
      this.setState({
        alert: {
          type: alertTypes.ERROR,
          message: `Oops! You dont have enough token balance in RFAI escrow. Please add tokens to the RFAI escrow from the Account page`,
        },
      });
    } else if (expiration === "" || parseInt(expiration, 10) <= parseInt(this.state.blockNumber, 10)) {
      this.setState({
        alert: { type: alertTypes.ERROR, message: `Oops! Expiration seems to be too short, increase the expiry date.` },
      });
    } else {
      this.setState({
        alert: {
          type: alertTypes.ERROR,
          message: "Oops! Something went wrong. Try checking your transaction details.",
        },
      });
    }
  };

  render() {
    const ctrlsToDisable = false;
    const { classes, metamaskDetails, isLoggedIn } = this.props;
    const { alert } = this.state;

    const actionToDisable = !(metamaskDetails.isTxnsAllowed && isLoggedIn);

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
            <label>Additional documents Link</label>
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
            type="text"
            autoComplete="off"
            value={this.state.initialStake}
            onChange={this.handleAmountInputChange}
            disabled={ctrlsToDisable ? "disabled" : ""}
          />
        </div>

        <div className={classes.expiryDateContainer}>
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
        <AlertBox type={alert.type} message={alert.message} />

        <div className={classes.btnContainer}>
          <StyledButton type="transparent" onClick={event => this.handleBackButton(event, true)} btnText="back" />
          <StyledButton
            type="blue"
            onClick={event => this.handleCreateButton(event, true)}
            btnText="continue"
            disabled={actionToDisable}
          />
        </div>

        <Dialog PaperProps={classes.dialogStyles} open={this.state.showConfirmation}>
          <div className={classes.dialogStylesContent}>
            <p>
              Please make sure that the details entered are accurate. <br /> Click Ok to proceed and Cancel to
              revalidate!
            </p>
            <p>
              Once the requested submitted successfully, will be sent for approval. You can check the status in pending
              requests tab.
            </p>
            <p>
              <StyledButton type="blue" onClick={event => this.handleCreateButton(event, false)} btnText="Ok" />
              <StyledButton type="red" onClick={() => this.setState({ showConfirmation: false })} btnText="Cancel" />
            </p>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.login.isLoggedIn,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
  tokenBalance: state.tokenReducer.tokenBalance,
  tokenAllowance: state.tokenReducer.tokenAllowance,
  rfaiTokenBalance: state.rfaiContractReducer.rfaiTokenBalance,
});

const mapDispatchToProps = dispatch => ({
  updateRFAITokenBalance: metamaskDetails => dispatch(rfaiContractActions.updateRFAITokenBalance(metamaskDetails)),
  startLoader: loaderContent => dispatch(loaderActions.startAppLoader(loaderContent)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Details));
