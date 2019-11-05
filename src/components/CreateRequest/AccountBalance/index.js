import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useStyles } from "./styles";

//components
import { txnTypes } from "../../../utility/PricingStrategy";
import StyledButton from "../../common/StyledButton";
import StyledTextField from "../../common/StyledTextField";
import AlertBox from "../../common/AlertBox";

class AccountBalance extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }

  render() {
    const { classes } = this.props;
    const { activeTab, currentNetwork, tokenBalance, escrowBalance, authorizedTokens } = this.state;

    const tabs = [
      {
        name: "Deposit",
        activeIndex: 0,
        submitAction: this.handleDeposit,
        component: (
          <StyledTextField
            label="AGI Token Amount"
            // value={amount[txnTypes.DEPOSIT] || ""}
            onChange={event => this.handleAmountChange(event, txnTypes.DEPOSIT)}
          />
        ),
      },
      {
        name: "Withdraw",
        activeIndex: 1,
        submitAction: this.handleWithDraw,
        component: (
          <StyledTextField
            label="Amount to be withdrawn in AGI"
            // value={amount[txnTypes.WITHDRAW] || ""}
            onChange={event => this.handleAmountChange(event, txnTypes.WITHDRAW)}
          />
        ),
      },
    ];
    const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0];

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
            <span>{currentNetwork}</span>
          </div>

          <div>
            <div className={classes.label}>
              <InfoIcon className={classes.infoIcon} />
              <span>Wallet ID</span>
            </div>
            <span className={classes.walletId}>{}</span>
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
            <span>{escrowBalance} AGI</span>
          </div>

          <div className={classes.bgBox}>
            <div className={classes.label}>
              <InfoIcon className={classes.infoIcon} />
              <span>Authorized Tokens</span>
            </div>
            <span>{authorizedTokens} AGI</span>
          </div>
        </div>
        <div className={classes.tabsContainer}>
          <AppBar position="static" className={classes.tabsHeader}>
            <Tabs value={activeTab} onChange={this.onTabChange}>
              {tabs.map(value => (
                <div key={value}>
                  <InfoIcon className={classes.infoIcon} />
                  <Tab key={value.name} label={value.name} />
                </div>
              ))}
            </Tabs>
          </AppBar>
          {activeComponent.component}
          <AlertBox type={alert.type} message={alert.message} />
        </div>
        <div className={classes.btnContainer}>
          <StyledButton type="blue" btnText={activeComponent.name} disabled onClick={activeComponent.submitAction} />
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(AccountBalance);
