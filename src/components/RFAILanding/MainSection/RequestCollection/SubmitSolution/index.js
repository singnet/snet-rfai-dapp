import React from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";

import { requestDetailsById } from "../../../../../Redux/reducers/RequestReducer";

import Paper from "@material-ui/core/Paper";

import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";

const SubmitSolution = ({ open, handleClose, requestId, requestDetails, loading }) => {
  const classes = useStyles();

  const handleCancel = () => {
    handleClose();
  };

  if (!requestDetails) {
    return <div />;
  }

  return (
    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title={"Submit Solution"}
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            <Paper className={classes.root}>
              <div className={classes.requestTitleContainer}>
                <span className={classes.requestTitle}>Request Title : </span>
                <span className={classes.titleName}>{requestDetails.request_title}</span>
              </div>
              {loading && (
                <div className={classes.circularProgressContainer}>
                  <div className={classes.loaderChild}>
                    <CircularProgress className={classes.circularProgress} />
                    <p className={classes.loaderText}>LOADING SOLUTION..</p>
                  </div>
                </div>
              )}
              {!loading && (
                <div>
                  <div>
                    <p>
                      All submissions are evaluated by the SingularityNet foundation to ensure that the acceptance
                      criteria as specified in the request is met and the problem is solved for. Please keep in mind the
                      mentioned points:
                    </p>
                  </div>
                  <div className="overview-content">
                    <ul>
                      <li>The specified acceptance criteria in the request must be met</li>
                      <li>Any performance metrics specified against provided test datasets should be met</li>
                      <li>Submission should pass the curation process for AI services on the platform</li>
                      <li>Provide the github repo of your code</li>
                      <li>
                        Sign your request using the same address used to publish the service. This is an important step
                        to ensure that you are the owner of the service.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <label>Solution URL</label>
                    <input type="text" name="SolURI" />
                  </div>
                </div>
              )}
            </Paper>
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="Close" type="transparent" onClick={handleCancel} />
            <StyledButton btnText="Submit Solution" type="blue" />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { requestId } = ownProps;

  return {
    loading: state.loaderReducer.RequestModalCallStatus,
    requestDetails: requestDetailsById(state, requestId),
  };
};

export default connect(mapStateToProps)(SubmitSolution);
