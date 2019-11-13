import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Paper from "@material-ui/core/Paper";

import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";
import StyledDropdown from "../../../../common/StyledDropdown";
import { requestDetailsById } from "../../../../../Redux/reducers/RequestReducer";

const ApproveRejectRequest = ({ open, handleClose, requestId, actionType, requestDetails }) => {
  const classes = useStyles();

  const handleCancel = () => {
    handleClose();
  };

  const handleApprove = () => {
    // Place holder to integrate with Blockchian
    handleClose();
  };

  const handleReject = () => {
    // Place holder to integrate with Blockchian
    handleClose();
  };
  const currentBlockNumber = "123456789";

  // eslint-disable-next-line no-unused-vars
  const [endSubmission, setEndSubmission] = useState(currentBlockNumber);
  // eslint-disable-next-line no-unused-vars
  const [endEvaluation, setEndEvaluation] = useState(currentBlockNumber);
  // eslint-disable-next-line no-unused-vars
  const [newExpiration, setNewExpiration] = useState(currentBlockNumber);

  //   const handleBlockNumInputChange = async (event) => {
  //     // if (event.target.value.match(/^[0-9]{1,40}$/)) {
  //     //   setState({ [event.target.name]: event.target.value })
  //     // } else if(event.target.value === '') {
  //     //   setState({ [event.target.name]: '' })
  //     // } else {
  //     //   // Just Ignore the value
  //     // }

  //   }

  if (!requestDetails) {
    return <div />;
  }

  return (
    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title={actionType + " Request"}
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            <Paper className={classes.root}>
              <div className={classes.requestTitle}>
                <span>Request Title: </span>
                <p>{requestDetails.request_title}</p>
              </div>
              <div className={classes.requestedByAndExpiryContainer}>
                <div className={classes.requestedBy}>
                  <span>Request By</span>
                  <p>{requestDetails.requester}</p>
                </div>
                <div className={classes.expirySet}>
                  <span>{actionType === "Approve" ? "Expiry Set By Requester" : "Tokens Awarded"}</span>
                  <p>{requestDetails.expiration}</p>
                </div>
              </div>
              <div className={classes.currentBlockNumber}>
                <span>Current Block Number: </span>
                <p>{currentBlockNumber}</p>
              </div>

              {actionType === "Approve" ? (
                <div className={classes.inputFieldContainer}>
                  <div>
                    <label>End Submission Block:</label>
                    <input
                      name="endSubmission"
                      type="number"
                      autoComplete="off"
                      min={currentBlockNumber}
                      onChange={(event, value) => setEndSubmission(value)}
                    />
                  </div>

                  <div>
                    <label>End Evaluation Block:</label>
                    <input
                      name="endEvaluation"
                      type="number"
                      autoComplete="off"
                      min={currentBlockNumber}
                      onChange={(event, value) => setEndEvaluation(value)}
                    />
                  </div>

                  <div>
                    <label>Expiration Block:</label>
                    <input
                      name="newExpiration"
                      type="number"
                      autoComplete="off"
                      min={currentBlockNumber}
                      onChange={(event, value) => setNewExpiration(value)}
                    />
                  </div>
                </div>
              ) : (
                <div className={classes.rejectionInput}>
                  <span>Reason for Rejection</span>
                  <StyledDropdown />
                </div>
              )}
            </Paper>
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="cancel" type="transparent" onClick={handleCancel} />
            {actionType === "Approve" && <StyledButton btnText="Approve Request" onClick={handleApprove} />}
            {actionType === "Reject" && <StyledButton btnText="Reject Request" type="redBg" onClick={handleReject} />}
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

// const mapStateToProps = state => ({
//   loading: state.loaderReducer.RequestModalCallStatus,
// });

export default connect(mapStateToProps)(ApproveRejectRequest);
