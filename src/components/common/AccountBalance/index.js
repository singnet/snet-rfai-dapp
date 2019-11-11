import React from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";

//components
import StyledButton from "../StyledButton";
import MetaMaskAccountBalance from "./MetaMaskAccountBalance";

const AccountBalance = (classes, showMetaMaskAccBal, button) => {
  return (
    <div className={classes.accountBalanceContainer}>
      <h3>Account Balance</h3>
      {showMetaMaskAccBal ? (
        <MetaMaskAccountBalance />
      ) : (
        <div>
          <div className={classes.warningBox}>
            <span>You need Metamask wallet to create requests.</span>
            <Typography>
              Please Login or Install to your Metamask wallet account and connect to SingularityNet.{" "}
            </Typography>
            <Typography>
              <a href="https://metamask.io/" target="_new">
                Click here{" "}
              </a>
              to install and learn more about how to use Metamask and your AGI credits with SinguarlityNet AI
              Marketplace.
            </Typography>
          </div>
          {button ? (
            <div className={classes.btnContainer}>
              <StyledButton type="blue" btnText="connect metamask" />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default withStyles(useStyles)(AccountBalance);
