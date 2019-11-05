import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";

//components
import ProgressBar from "../common/ProgressBar";
import StyledButton from "../common/StyledButton";

class CreateRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressText: ["Overview", "Details", "Summary"],
    };
  }

  render() {
    const { classes, isComplete } = this.props;
    const { progressText } = this.state;
    return (
      <Grid container spacing={24} className={classes.createRequestMainContainer}>
        <Grid item xs={12} sm={12} md={8} lg={8} className={classes.createRequestContainer}>
          <h3>Create Request</h3>
          <ProgressBar activeSection={isComplete ? 2 : 1} progressText={progressText} />
          <div className={classes.createRequestContent}>
            <Typography>
              You can request for any AI Service that would like to see built on top of the SingularityNet platform.
              Requests should be detailed enough to allow discussion and development. Requests accepted by the
              foundation will be raised as a github pull request to the RFAI repository.
            </Typography>
            <span>
              We would like to have an objective and measurable acceptance criteria (get accuracy above X% of this data,
              etc).
            </span>
            <ul>
              <p>The foundation will review all requests and will approve them. In general we look for</p>
              <li>* Clear problem description</li>
              <li>* Relevant problem which if solved will help the community</li>
              <li>* Quantitative evaluation criteria</li>
              <li>* Provide a title and description along with acceptance criteria</li>
            </ul>
            <StyledButton btnText="connect metamask" type="blue" />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} className={classes.accountBalanceContainer}>
          <h3>Account Balance</h3>
          <div className={classes.warningBox}>
            <span>You need Metamask wallet to create requests.</span>
            <Typography>
              Please Login or Install to your Metamask wallet account and connect to SingularityNet.{" "}
            </Typography>
            <Typography>
              <a href="#">Click here </a>to install and learn more about how to use Metamask and your AGI credits with
              SinguarlityNet AI Marketplace.
            </Typography>
          </div>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(useStyles)(CreateRequest);
