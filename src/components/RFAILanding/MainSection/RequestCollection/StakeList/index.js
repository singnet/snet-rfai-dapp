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
import { fromWei } from "../../../../../utility/GenHelperFunctions";
// Table dependencies
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useStyles } from "./styles";
import StyledButton from "../../../../common/StyledButton";
import ErrorBox from "../../../../common/ErrorBox";

const StakeList = ({
  open,
  handleClose,
  showBackRequest,
  requestId,
  requestDetails,
  requestStakes,
  selectedTab,
  loading,
  metamaskDetails,
  isLoggedIn,
  requestStakesFailed,
}) => {
  const classes = useStyles();
  const actionToDisable = !(metamaskDetails.isTxnsAllowed && isLoggedIn);

  const handleCancel = () => {
    handleClose();
  };

  if (!requestDetails) {
    return <div />;
  }

  if (requestStakesFailed) {
    return (
      <div>
        <Modal open={open} onClose={handleCancel} className={classes.Modal}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.CardHeader}
              title={"View Backers"}
              action={
                <IconButton onClick={handleCancel}>
                  <CloseIcon />
                </IconButton>
              }
            />
            <div className={classes.requestTitleContainer}>
              <span className={classes.requestTitle}>Request Title : </span>
              <span className={classes.titleName}>{requestDetails.request_title}</span>
            </div>
            <CardContent className={classes.CardContent}>
              <Paper className={classes.root}>
                <ErrorBox />
              </Paper>
            </CardContent>
            <CardActions className={classes.CardActions}>
              <StyledButton btnText="Close" type="transparent" onClick={handleCancel} />
            </CardActions>
          </Card>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <Modal open={open} onClose={handleCancel} className={classes.Modal}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.CardHeader}
            title={"View Backers"}
            action={
              <IconButton onClick={handleCancel}>
                <CloseIcon />
              </IconButton>
            }
          />
          <div className={classes.requestTitleContainer}>
            <span className={classes.requestTitle}>Request Title : </span>
            <span className={classes.titleName}>{requestDetails.request_title}</span>
          </div>
          <CardContent className={classes.CardContent}>
            <Paper className={classes.root}>
              <div className={classes.viewBackersDescription}>
                <p>
                  All users must back the request with AGIX tokens in order to gain voting privileges. Backer’s votes
                  define which solutions will be alloted their backed AGIX tokens.
                </p>
              </div>
              {loading && (
                <div className={classes.circularProgressContainer}>
                  <div className={classes.loaderChild}>
                    <CircularProgress className={classes.circularProgress} />
                    <p className={classes.loaderText}>LOADING BACKERS..</p>
                  </div>
                </div>
              )}
              {requestStakes.length === 0 && (
                <div className={classes.noDataFound}>
                  <span>No backers found.</span>
                </div>
              )}
              {!loading && requestStakes.length > 0 && (
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Backed by</TableCell>
                      <TableCell align="right">Backed on</TableCell>
                      <TableCell align="right">Tokens Awarded</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requestStakes.map(stake => (
                      <TableRow key={stake.stake_member}>
                        <TableCell component="th" scope="row">
                          <span className={classes.mobileTableHeader}>Backed by:</span>
                          {stake.stake_member} <br />
                          {stake.stake_member_name}
                        </TableCell>
                        <TableCell align="right">
                          <span className={classes.mobileTableHeader}>Backed on:</span>
                          {stake.created_at}
                        </TableCell>
                        <TableCell align="right">
                          <span className={classes.mobileTableHeader}>Tokens Awarded:</span>
                          {fromWei(stake.stake_amount)} AGIX
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
            {(selectedTab === 1 || selectedTab === 2) && (
              <StyledButton btnText="back request" type="blue" onClick={showBackRequest} disabled={actionToDisable} />
            )}
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

StakeList.defaultProps = {
  requestStakes: [],
};

const mapStateToProps = (state, ownProps) => {
  const { requestId } = ownProps;

  return {
    isLoggedIn: state.userReducer.login.isLoggedIn,
    loading: state.loaderReducer.RequestModalCallStatus,
    metamaskDetails: state.metamaskReducer.metamaskDetails,
    requestDetails: requestDetailsById(state, requestId),
    requestStakesFailed: state.errorReducer.requestStakes,
  };
};

export default connect(mapStateToProps)(StakeList);
