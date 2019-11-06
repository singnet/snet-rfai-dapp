import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import InfoIcon from "@material-ui/icons/Info";
import { useStyles } from "./styles";

//components
import StyledButton from "../../common/StyledButton";
import AlertBox from "../../common/AlertBox";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: true,
    };
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

        {dialogOpen ? <AlertBox type="error" message="Some error message" /> : null}

        <div className={classes.btnContainer}>
          <StyledButton type="transparent" onClick={event => this.handleBackButton(event, true)} btnText="back" />
          <StyledButton type="blue" onClick={event => this.handleContinueButton(event, true)} btnText="continue" />
        </div>
      </div>
    );
  }
}
export default withStyles(useStyles)(Details);
