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

// Table dependencies
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";

const VoteList = ({ open, handleClose, requestId, requestTitle, requestVotes, loading }) => {
  const classes = useStyles();

  const handleCancel = () => {
    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title={requestTitle + "- Votes"}
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent className={classes.CardContent}>
            <Paper className={classes.root}>
              {loading && (
                <div className={classes.circularProgressContainer}>
                  <div className={classes.loaderChild}>
                    <CircularProgress className={classes.circularProgress} />
                    <p className={classes.loaderText}>LOADING SOLUTIONS..</p>
                  </div>
                </div>
              )}
              {requestVotes.length === 0 && (
                <div className={classes.noDataFound}>
                  <span>No solutions found.</span>
                </div>
              )}
              {!loading && requestVotes.length > 0 && (
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Vote by</TableCell>
                      <TableCell>Voted on</TableCell>
                      <TableCell align="right">Solution Submitter</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requestVotes.map(vot => (
                      <TableRow key={vot.solution_voter + "-" + vot.solution_submitter}>
                        <TableCell component="th" scope="row">
                          {vot.solution_voter} <br />
                          {vot.solution_voter_name}
                        </TableCell>
                        <TableCell>{vot.created}</TableCell>
                        <TableCell align="right">{vot.solution_submitter}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>
          </CardContent>
          <CardActions className={classes.CardActions}>
            <StyledButton btnText="Close" type="transparent" onClick={handleCancel} />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

VoteList.defaultProps = {
  requestVotes: [],
};

const mapStateToProps = state => ({
  loading: state.loaderReducer.RequestModalCallStatus,
});

export default connect(mapStateToProps)(VoteList);
