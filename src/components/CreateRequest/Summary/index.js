import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import { useStyles } from "./styles";

//components
import StyledButton from "../../common/StyledButton";
import AlertText from "../../common/AlertText";
import { Link } from "react-router-dom";
import Routes from "../../../utility/constants/Routes";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { requestSummary } = this.props;

    //request_title, request_by, request_expiry, request_stake

    const { classes } = this.props;
    return (
      <div className={classes.summaryMainContainer}>
        <AlertText type="success" message="Succesfully Created Request" />
        <div className={classes.transactionReceiptMainContainer}>
          <h4>Request Details</h4>
          <div className={classes.transactionReceiptContainer}>
            <div className={classes.receiptTitle}>
              <span>Request title</span>
            </div>
            <span>{requestSummary.request_title}</span>
          </div>
          <div className={classes.transactionReceiptContainer}>
            <div className={classes.receiptTitle}>
              <span>Request by</span>
            </div>
            <span>{requestSummary.request_by}</span>
          </div>
          <div className={classes.transactionReceiptContainer}>
            <div className={classes.receiptTitle}>
              <span>Expiry on</span>
            </div>
            <span>{requestSummary.request_expiry}</span>
          </div>
        </div>
        <div className={classes.transactionReceiptMainContainer}>
          <h4>Transaction Receipt</h4>
          <div className={classes.transactionReceiptContainer}>
            <div className={classes.receiptTitle}>
              <InfoIcon className={classes.infoIcon} />
              <span>AGI tokens spend</span>
            </div>
            <span className={classes.receiptAmt}>{requestSummary.request_stake} AGI</span>
          </div>
        </div>
        <div className={classes.btnContainer}>
          <Link to={Routes.CREATE_REQUEST} className={classes.buttonLink}>
            <StyledButton type="transparent" btnText="create new request" />
          </Link>

          <Link to={Routes.RFAI_LANDING} className={classes.buttonLink}>
            <StyledButton type="blue" btnText="view pending request" />
          </Link>
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(Summary);
