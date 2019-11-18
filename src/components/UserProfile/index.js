import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";

import UserProfileSettings from "./UserProfileSettings";
import UserProfileHeader from "./UserProfileHeader";
import UserProfileClaims from "./UserProfileClaims";
import { useStyles } from "./styles";
//import UserProfileAccount from "./UserProfileAccount";
import AccountBalance from "../common/AccountBalance";
import Notification from "../Notification";

import Routes from "../../utility/constants/Routes";

// const UserProfileTabs = {
//   account: 0,
//   settings: 1,
// };

const activeIndexEnum = {
  [`/${Routes.USER_PROFILE}/account`]: 0,
  [`/${Routes.USER_PROFILE}/settings`]: 1,
  [`/${Routes.USER_PROFILE}/claims`]: 2,
};

class UserProfile extends Component {
  state = {
    activeTab: 0,
  };

  getActiveTab = () => {
    const { pathname } = window.location;
    const activeIndex = activeIndexEnum[`${pathname.toLowerCase()}`];
    if (activeIndex) {
      return activeIndex;
    }
    return 0;
  };

  componentDidMount = () => {
    // const { activeTab } = this.props.match.params;
    // if (activeTab && UserProfileTabs[activeTab.toLowerCase()]) {
    //   this.setState({ activeTab: UserProfileTabs[activeTab.toLowerCase()] });
    // }
    let activeTab = this.getActiveTab();
    this.setState({ activeTab });
  };

  onTabChange = (activeTab, activePath) => {
    this.setState({ activeTab });
    //history.push(activePath);
  };

  render() {
    const { classes, history, nickname, metamaskDetails } = this.props;
    const { activeTab } = this.state;

    const tabs = [
      {
        name: "Account",
        activeIndex: 0,
        path: `/${Routes.USER_PROFILE}/account`,
        component: <AccountBalance showMetaMaskAccBal={metamaskDetails.isTxnsAllowed} />,
      },
      {
        name: "Settings",
        activeIndex: 1,
        path: `/${Routes.USER_PROFILE}/settings`,
        component: <UserProfileSettings history={history} />,
      },
      { name: "Claims", activeIndex: 2, path: `/${Routes.USER_PROFILE}/claims`, component: <UserProfileClaims /> },
    ];
    const activeComponent = tabs.filter(el => el.activeIndex === activeTab)[0].component;
    return (
      <Fragment>
        <Notification />
        <div className={classes.UserProfileContainer}>
          <UserProfileHeader nickname={nickname} />
          <div>
            <AppBar position="static" className={classes.tabsHeader}>
              <Tabs value={activeTab}>
                {tabs.map(value => (
                  <Tab
                    key={value.name}
                    label={value.name}
                    onClick={() => this.onTabChange(value.activeIndex, value.path)}
                  />
                ))}
              </Tabs>
            </AppBar>
            {activeComponent}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  nickname: state.userReducer.nickname,
  metamaskDetails: state.metamaskReducer.metamaskDetails,
});

export default connect(mapStateToProps)(withStyles(useStyles)(UserProfile));
