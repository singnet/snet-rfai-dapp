import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import { useStyles } from "./styles";

import { requestActions } from "../../../Redux/actionCreators";

import RequestCollection from "./RequestCollection";
import isEmpty from "lodash/isEmpty";

class MainSection extends Component {
  state = {
    listView: false,
  };

  componentDidMount = async () => {
    const { fetchFoundationMembers, foundationMembers } = this.props;

    if (isEmpty(foundationMembers)) {
      // Load the foundation Members
      await fetchFoundationMembers();
    }
  };

  toggleView = () => {
    this.setState(prevState => ({ listView: !prevState.listView }));
  };

  render() {
    const { classes, requestSummary } = this.props;

    return (
      <Grid container spacing={24} className={classes.mainSection}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.servieMainContainer}>
          <RequestCollection requestSummary={requestSummary} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  requestSummary: state.requestReducer.requestSummary,
  foundationMembers: state.requestReducer.foundationMembers,
});

const mapDispatchToProps = dispatch => ({
  fetchFoundationMembers: () => dispatch(requestActions.fetchFoundationMembersData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(MainSection));
