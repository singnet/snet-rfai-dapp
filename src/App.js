import React, { Component, lazy, Suspense } from "react";
import Amplify from "aws-amplify";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { connect } from "react-redux";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

import { aws_config } from "./config/aws_config";
import theme from "./assets/Theme";
import withInAppWrapper from "./components/HOC/WithInAppHeader";
import { userActions } from "./Redux/actionCreators";
import AppLoader from "./components/common/AppLoader";
import { CircularProgress } from "@material-ui/core";
import initHotjar from "./assets/externalScripts/hotjar";
import initGDPRNotification from "./assets/externalScripts/gdpr";

import { requestActions } from "./Redux/actionCreators";

const RFAILanding = lazy(() => import("./components/RFAILanding"));

Amplify.configure(aws_config);

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

if (process.env.REACT_APP_HOTJAR_ID && process.env.REACT_APP_HOTJAR_SV) {
  initHotjar(process.env.REACT_APP_HOTJAR_ID, process.env.REACT_APP_HOTJAR_SV);
}
initGDPRNotification();

class App extends Component {
  componentDidMount = async () => {
    await this.props.fetchUserDetails();
    this.props.fetchFoundationMembers();
  };

  render() {
    const { hamburgerMenu, isInitialized } = this.props;
    if (!isInitialized) {
      return <CircularProgress />;
    }
    return (
      <ThemeProvider theme={theme}>
        <div className={hamburgerMenu ? "hide-overflow" : null}>
          <Router history={history}>
            <Suspense fallback={<CircularProgress thickness={10} />}>
              <Switch>
                <Route path="/" exact component={withInAppWrapper(RFAILanding)} />
                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Suspense>
          </Router>
        </div>
        <AppLoader />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  isInitialized: state.userReducer.isInitialized,
  hamburgerMenu: state.stylesReducer.hamburgerMenu,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: () => dispatch(userActions.fetchUserDetails),
  fetchFoundationMembers: () => dispatch(requestActions.fetchFoundationMembersData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
