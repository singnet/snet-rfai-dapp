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

// Table dependencies
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";

const StakeRequest = ({ open, handleClose, requestId, requestDetails, requestStakes, loading }) => {
  const classes = useStyles();

  const handleCancel = () => {
    handleClose();
  };

  const currentBlockNumber = "123456789";

  if (!requestDetails) {
    return <div />;
  }

  return (
    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title={"Back the Request"}
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
                    <p className={classes.loaderText}>LOADING BACKERS..</p>
                  </div>
                </div>
              )}
              {!loading && (
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Requested By</TableCell>
                      <TableCell align="right">Tokens Awarded</TableCell>
                      <TableCell align="right">Backers</TableCell>
                      <TableCell align="right">Expiry</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="td" scope="row">
                        {requestDetails.requester}
                      </TableCell>
                      <TableCell align="right">{requestDetails.total_stake}</TableCell>
                      <TableCell align="right">{requestDetails.num_stakers}</TableCell>
                      <TableCell align="right">{requestDetails.expiration}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
              <div className={classes.inputContainer}>
                <div className={classes.escrowBalContainer}>
                  <label>Escrow Balance</label>
                  <input name="escrowBalance" type="number" autoComplete="off" min={currentBlockNumber} />
                </div>
                <div className={classes.fundingAmtContainer}>
                  <label>Funding Amount</label>
                  <input name="fundingAmt" type="number" autoComplete="off" min={currentBlockNumber} />
                </div>
              </div>
            </Paper>
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="Close" type="transparent" onClick={handleCancel} />
            <StyledButton btnText="submit funds" type="blue" />
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

export default connect(mapStateToProps)(StakeRequest);
