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

const SolutionList = ({ open, handleClose, requestId, requestTitle, requestSolutions, loading }) => {
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
            title={requestTitle + "- Solutions"}
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
              {requestSolutions.length === 0 && (
                <div>
                  <span>No solutions found.</span>
                </div>
              )}
              {!loading && requestSolutions.length > 0 && (
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Submitted by</TableCell>
                      <TableCell>Submitted on</TableCell>
                      <TableCell align="right">Solution URI</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requestSolutions.map(sol => (
                      <TableRow key={sol.solution_submitter}>
                        <TableCell component="th" scope="row">
                          {sol.solution_submitter} <br />
                          {sol.solution_submitter_name}
                        </TableCell>
                        <TableCell>{sol.created}</TableCell>
                        <TableCell align="right">{sol.solution_docURI}</TableCell>
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

SolutionList.defaultProps = {
  requestSolutions: [],
};

const mapStateToProps = state => ({
  loading: state.loaderReducer.RequestModalCallStatus,
});

export default connect(mapStateToProps)(SolutionList);
