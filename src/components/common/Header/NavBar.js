import React from "react";
import { withRouter } from "react-router-dom";

import { useStyles } from "./styles";
import NavItem from "./NavItem";
import Routes from "../../../utility/constants/Routes";

const NavBar = ({ data, history }) => {
  const classes = useStyles();

  const isActiveTab = link => {
    if (history.location.pathname === `/${Routes.GET_STARTED}`) {
      return link === `/${Routes.GET_STARTED}`;
    } else if (history.location.pathname === `/${Routes.RFAI_LANDING}`) {
      return link === `/${Routes.RFAI_LANDING}`;
    } else if (history.location.pathname === `/${Routes.CREATE_REQUEST}`) {
      return link === `/${Routes.CREATE_REQUEST}`;
    } else if (history.location.pathname === `/${Routes.USER_PROFILE}/claims`) {
      return link === `/${Routes.USER_PROFILE}/claims`;
    }

    return false;
  };

  return (
    <nav>
      <ul className={classes.navUl}>
        {data.tabs.map(tab => (
          <NavItem
            key={tab.title}
            title={tab.title}
            link={tab.link}
            active={isActiveTab(tab.link)}
            newTab={tab.newTab}
          />
        ))}
      </ul>
    </nav>
  );
};

export default withRouter(NavBar);
