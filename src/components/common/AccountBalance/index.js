import React from "react";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { connect } from "react-redux";
//components
import StyledButton from "../StyledButton";
import MetaMaskAccountBalance from "./MetaMaskAccountBalance";

const AccountBalance = ({ classes, metamaskDetails }) => {
  const isTxnsAllowed = metamaskDetails.isTxnsAllowed;

  return (
    <div className={classes.accountBalanceContainer}>
      <h3>Account Balance</h3>
      {isTxnsAllowed ? (
        <MetaMaskAccountBalance description />
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
          {!isTxnsAllowed ? (
            <div className={classes.btnContainer}>
              <StyledButton type="blue" btnText="connect metamask" />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  metamaskDetails: state.metamaskReducer.metamaskDetails,
});

//export default withStyles(useStyles)(AccountBalance);
export default connect(mapStateToProps)(withStyles(useStyles)(AccountBalance));
