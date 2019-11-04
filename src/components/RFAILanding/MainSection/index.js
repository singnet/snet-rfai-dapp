import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";

//import Filter from "./Filter";
//import ServiceCollection from "./ServiceCollection";
import { useStyles } from "./styles";
import { serviceActions } from "../../../Redux/actionCreators";

import { requestActions } from "../../../Redux/actionCreators";

import { filterAttributes, generateFilterObject } from "../../../utility/constants/Pagination";
//import { isDesktop } from "../../../utility/constants/UXProperties";

import RequestCollection from "./RequestCollection";

class MainSection extends Component {
  state = {
    listView: false,
  };

  componentDidMount = async () => {
    const { fetchFilterData, fetchRequestSummaryData, fetchFoundationMembers } = this.props;
    this.handleFetchService(this.props.pagination);
    filterAttributes.map(attribute => fetchFilterData(attribute));

    await fetchRequestSummaryData();
    await fetchFoundationMembers();
  };

  handlePaginationChange = async pagination => {
    await this.props.updatePagination(pagination);
    this.handleFetchService(this.props.pagination);
  };

  handleFetchService = pagination => {
    const { currentFilter, fetchService } = this.props;
    let filterObj = [];
    for (let i in currentFilter) {
      if (currentFilter[i].length > 0) {
        filterObj = generateFilterObject(currentFilter);
        break;
      }
    }
    fetchService(pagination, filterObj);
  };

  toggleView = () => {
    this.setState(prevState => ({ listView: !prevState.listView }));
  };

  render() {
    //const { classes, services, pagination, currentFilter, requestSummary } = this.props;

    const { classes, requestSummary } = this.props;

    //const { listView } = this.state;
    return (
      <Grid container spacing={24} className={classes.mainSection}>
        {/* <Grid item xs={12} sm={3} md={3} lg={3} className={classes.filterMainContainer}>
          <Filter />
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.servieMainContainer}>
          <RequestCollection requestSummary={requestSummary} />

          {/* <ServiceCollection
            toolbarProps={{
              listView,
              total_count: pagination.total_count,
              handleSearchChange: this.handlePaginationChange,
              toggleView: this.toggleView,
              currentPagination: pagination,
              currentFilter,
              showToggler: isDesktop,
            }}
            cardGroupProps={{
              data: services,
              listView,
            }}
            paginationProps={{
              limit: pagination.limit,
              offset: pagination.offset,
              total_count: pagination.total_count,
              handleChange: this.handlePaginationChange,
            }}
          /> */}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  services: state.serviceReducer.services,
  pagination: state.serviceReducer.pagination,
  isLoggedIn: state.userReducer.login.isLoggedIn,
  currentFilter: state.serviceReducer.activeFilterItem,
  requestSummary: state.requestReducer.requestSummary,
  foundationMembers: state.requestReducer.foundationMembers,
});

const mapDispatchToProps = dispatch => ({
  updatePagination: pagination => dispatch(serviceActions.updatePagination(pagination)),
  fetchService: (pagination, filterObj) => dispatch(serviceActions.fetchService(pagination, filterObj)),
  fetchFilterData: attribute => dispatch(serviceActions.fetchFilterData(attribute)),
  fetchFoundationMembers: () => dispatch(requestActions.fetchFoundationMembersData()),
  fetchRequestSummaryData: () => dispatch(requestActions.fetchRequestSummaryData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(MainSection));
