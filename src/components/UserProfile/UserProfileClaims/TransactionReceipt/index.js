import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import { useStyles } from "./styles";

//components
import StyledButton from "../../../common/StyledButton";
import AlertText from "../../../common/AlertText";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.summaryMainContainer}>
        <div className={classes.transactionReceiptMainContainer}>
          <h4>Claim</h4>
          <div className={classes.transactionReceiptContainer}>
            <div className={classes.receiptTitle}>
              <span>Request title</span>
            </div>
            <span />
          </div>
        </div>
        <AlertText type="success" message="Succesfully Created Request" />
        <div className={classes.transactionReceiptMainContainer}>
          <h4>Transaction Receipt</h4>
          <div className={classes.transactionReceiptContainer}>
            <div>
              <div className={classes.receiptTitle}>
                <InfoIcon className={classes.infoIcon} />
                <span>AGI tokens received</span>
              </div>
              <span className={classes.receiptAmt}>4 AGI</span>
            </div>
            <div>
              <div className={classes.receiptTitle}>
                <InfoIcon className={classes.infoIcon} />
                <span>Updated Balance</span>
              </div>
              <span className={classes.receiptAmt}>21 AGI</span>
            </div>
          </div>
        </div>
        <div className={classes.btnContainer}>
          <StyledButton type="blueText" btnText="close" />
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(Summary);
