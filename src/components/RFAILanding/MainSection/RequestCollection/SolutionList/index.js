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

const SolutionList = ({ open, handleClose, requestId, requestDetails, requestSolutions, loading }) => {
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
            title={"View Solutions"}
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
                    <p className={classes.loaderText}>LOADING SOLUTIONS..</p>
                  </div>
                </div>
              )}
              {requestSolutions.length === 0 && (
                <div className={classes.noDataFound}>
                  <span>No solutions found.</span>
                </div>
              )}
              {!loading && requestSolutions.length > 0 && (
                // <Grid container className={classes.backRequestContainer}>
                //   <Gird item xs={12} sm={12} md={12} lg={12} className={classes.backRequestHeader}>
                //     <Gird item xs={12} sm={12} md={12} lg={12}></div>
                //   </Grid>
                //   <Gird item xs={12} sm={12} md={12} lg={12} className={classes.backRequestDetails}></Grid>
                // </Grid>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Submitted by</TableCell>
                      <TableCell>Submitted on</TableCell>
                      <TableCell>Solution URI</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requestSolutions.map(sol => (
                      <TableRow key={sol.solution_submitter}>
                        <TableCell component="th" scope="row">
                          <span className={classes.mobileTableHeader}>Submitted by:</span>
                          {sol.solution_submitter} <br />
                          {sol.solution_submitter_name}
                        </TableCell>
                        <TableCell>
                          <span className={classes.mobileTableHeader}>Submitted on:</span>
                          {sol.created}
                        </TableCell>
                        <TableCell className={classes.solutionsURLData}>
                          <span className={classes.mobileTableHeader}>Solution URI:</span>
                          {sol.solution_docURI}
                        </TableCell>
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

const mapStateToProps = (state, ownProps) => {
  const { requestId } = ownProps;

  return {
    loading: state.loaderReducer.RequestModalCallStatus,
    requestDetails: requestDetailsById(state, requestId),
  };
};

export default connect(mapStateToProps)(SolutionList);
