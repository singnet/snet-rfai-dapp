import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useStyles } from "./styles";

//components
import StyledButton from "../../common/StyledButton";
import StyledTextField from "../../common/StyledTextField";
import AlertBox, { alertTypes } from "../../common/AlertBox";

import { tokenActions } from "../../../Redux/actionCreators";

import { rfaiContractActions } from "../../../Redux/actionCreators";
import { loaderActions } from "../../../Redux/actionCreators";
import { NetworkNames } from "../../../utility/constants/NetworkNames";

import { LoaderContent } from "../../../utility/constants/LoaderContent";

import {
  _waitForTransaction,
  approveToken,
  depositTokenToEscrow,
  withdrawTokenFromEscrow,
} from "../../../utility/BlockchainHelper";

import web3 from "web3";

const BN = web3.utils.BN;

class AccountBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      amount: 0,
      alert: {
        type: alertTypes.ERROR,
        message: undefined,
      },
    };

    const { metamaskDetails, updateTokenBalance, updateTokenAllowance, updateRFAITokenBalance } = this.props;

    updateTokenBalance(metamaskDetails);
    updateTokenAllowance(metamaskDetails);
    updateRFAITokenBalance(metamaskDetails);
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

  handleTabChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  depositToken = async () => {
    const { metamaskDetails, tokenAllowance, startLoader, stopLoader } = this.props;
    const { updateTokenBalance, updateTokenAllowance, updateRFAITokenBalance } = this.props;

    const amount = this.state.amount;
    // BigNumber Equivalents
    const amountBN = new BN(amount);
    const tokenAllowanceBN = new BN(tokenAllowance);

    let txHash;
    let bAllowanceCalled = false;
    try {
      // Need to have an Token Approval before Deposit
      if (tokenAllowanceBN.lt(amountBN)) {
        txHash = await approveToken(metamaskDetails, amount);
        this.setState({ alert: { type: alertTypes.INFO, message: "Transaction is in Progress" } });
        startLoader();
        bAllowanceCalled = true;
        await _waitForTransaction(txHash);
      }

      // Initiate the Deposit Token to RFAI Escrow
      txHash = await depositTokenToEscrow(metamaskDetails, amount);
      if (!bAllowanceCalled) startLoader();

      await _waitForTransaction(txHash);

      this.setState({ alert: { type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" } });

      stopLoader();

      // Initiate the Redux Actions
      updateTokenBalance(metamaskDetails);
      updateTokenAllowance(metamaskDetails);
      updateRFAITokenBalance(metamaskDetails);
    } catch (err) {
      this.setState({ alert: { type: alertTypes.ERROR, message: "Transaction has failed." } });
      stopLoader();
    }
  };

  withdrawToken = async () => {
    const { metamaskDetails, startLoader, stopLoader } = this.props;
    const { updateTokenBalance, updateTokenAllowance, updateRFAITokenBalance } = this.props;

    const amount = this.state.amount;
    // BigNumber Equivalents
    //const amountBN = new BN(amount)
    //const tokenAllowanceBN = new BN(tokenAllowance)

    let txHash;
    try {
      // Initiate the Deposit Token to RFAI Escrow
      txHash = await withdrawTokenFromEscrow(metamaskDetails, amount);
      startLoader();
      await _waitForTransaction(txHash);

      this.setState({ alert: { type: alertTypes.SUCCESS, message: "Transaction has been completed successfully" } });
      stopLoader();

      // Initiate the Redux Actions
      updateTokenBalance(metamaskDetails);
      updateTokenAllowance(metamaskDetails);
      updateRFAITokenBalance(metamaskDetails);
    } catch (err) {
      this.setState({ alert: { type: alertTypes.ERROR, message: "Transaction has failed." } });
      stopLoader();
    }
  };

  handleDepositWithdraw = async (event, actionType) => {
    const { metamaskDetails, tokenBalance, rfaiTokenBalance } = this.props;

    if (!metamaskDetails.isTxnsAllowed) {
      return;
    }
    const amount = this.state.amount;

    // BigNumber Equivalents
    const amountBN = new BN(amount);
    const zeroBN = new BN(0);
    const tokenBalanceBN = new BN(tokenBalance);
    const rfaiTokenBalanceBN = new BN(rfaiTokenBalance);

    if (amountBN.lte(zeroBN)) {
      this.setState({ alert: { type: alertTypes.ERROR, message: "Invalid amount." } });
      return;
    }

    if (actionType === "Deposit") {
      if (amountBN.gt(tokenBalanceBN)) {
        this.setState({ alert: { type: alertTypes.ERROR, message: "Not enough balance in wallet" } });
        return;
      }

      await this.depositToken();
    } else if (actionType === "Withdraw") {
      if (amountBN.gt(rfaiTokenBalanceBN)) {
        this.setState({ alert: { type: alertTypes.ERROR, message: "Not enough balance in RFAI escrow" } });
        return;
      }

      await this.withdrawToken();
    } else {
      this.setState({ alert: { type: alertTypes.ERROR, message: "Invalid operation" } });
      return;
    }
  };

  render() {
    const { classes, metamaskDetails, tokenBalance, tokenAllowance, rfaiTokenBalance } = this.props;
    const { activeTab, alert } = this.state;

    const tabs = [
      {
        name: "Deposit",
        activeIndex: 0,
        component: (
          <StyledTextField
            name="amount"
            label="AGI Token Amount"
            value={this.state.amount}
            onChange={event => this.handleAmountInputChange(event)}
          />
        ),
      },
      {
        name: "Withdraw",
        activeIndex: 1,
        component: (
          <StyledTextField
            name="amount"
            label="Amount to be withdrawn in AGI"
            value={this.state.amount}
            onChange={event => this.handleAmountInputChange(event)}
          />
        ),
      },
    ];
    const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0];

    const networkNames = NetworkNames.filter(nw => nw.networkId.toString() === metamaskDetails.networkId.toString());

    return (
      <div className={classes.metamaskAccBalanceContainer}>
        <Typography className={classes.description}>
          Information about the linked walled and network. Also explain about each balance. Lorem ipsum dolor sit amet,
          ad cum illum nonumy, dicit laoreet his et.{" "}
        </Typography>
        <div className={classes.accountDetails}>
          <div>
            <div className={classes.label}>
              <InfoIcon className={classes.infoIcon} />
              <span>Wallet</span>
            </div>
            <span>Metamask</span>
          </div>

          <div>
            <div className={classes.label}>
              <InfoIcon className={classes.infoIcon} />
              <span>Current Network</span>
            </div>
            <span>
              {metamaskDetails.networkId} - {networkNames.length > 0 ? networkNames[0].networkName : ""}
            </span>
          </div>

          <div>
            <div className={classes.label}>
              <InfoIcon className={classes.infoIcon} />
              <span>Wallet ID</span>
            </div>
            <span className={classes.walletId}>{metamaskDetails.account}</span>
          </div>

          <div className={classes.bgBox}>
            <div className={classes.label}>
              <InfoIcon className={classes.infoIcon} />
              <span>Total Balance</span>
            </div>
            <span>{tokenBalance} AGI</span>
          </div>

          <div className={classes.bgBox}>
            <div className={classes.label}>
              <InfoIcon className={classes.infoIcon} />
              <span>Escrow Balance</span>
            </div>
            <span>{rfaiTokenBalance} AGI</span>
          </div>

          <div className={classes.bgBox}>
            <div className={classes.label}>
              <InfoIcon className={classes.infoIcon} />
              <span>Authorized Tokens</span>
            </div>
            <span>{tokenAllowance} AGI</span>
          </div>
        </div>
        <div className={classes.tabsContainer}>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={activeTab} onChange={this.handleTabChange}>
              {tabs.map(value => (
                <Tab key={value.activeIndex} label={value.name} value={value.activeIndex} />
              ))}
            </Tabs>
          </AppBar>
          {activeComponent.component}
          <AlertBox type={alert.type} message={alert.message} />
        </div>
        <div className={classes.btnContainer}>
          <StyledButton
            type="blue"
            btnText={activeComponent.name}
            onClick={event => this.handleDepositWithdraw(event, activeComponent.name)}
          />
        </div>
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

const mapDispatchToProps = dispatch => ({
  updateTokenBalance: metamaskDetails => dispatch(tokenActions.updateTokenBalance(metamaskDetails)),
  updateTokenAllowance: metamaskDetails => dispatch(tokenActions.updateTokenAllowance(metamaskDetails)),
  updateRFAITokenBalance: metamaskDetails => dispatch(rfaiContractActions.updateRFAITokenBalance(metamaskDetails)),
  startLoader: () => dispatch(loaderActions.startAppLoader(LoaderContent.DEPOSIT)),
  stopLoader: () => dispatch(loaderActions.stopAppLoader),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(AccountBalance));
