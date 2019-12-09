import React from "react";
import { NavLink } from "react-router-dom";
import { useStyles } from "./styles";
import Routes from "../../../utility/constants/Routes";

const NavItem = ({ title, link }) => {
  const classes = useStyles();

  const isActiveTab = (unused, { pathname }) => {
    if (pathname === `/${Routes.GET_STARTED}`) {
      return link === `/${Routes.GET_STARTED}`;
    } else if (pathname === `/${Routes.RFAI_LANDING}`) {
      return link === `/${Routes.RFAI_LANDING}`;
    } else if (pathname === `/${Routes.CREATE_REQUEST}`) {
      return link === `/${Routes.CREATE_REQUEST}`;
    } else if (pathname === `/${Routes.USER_PROFILE}/claims`) {
      return link === `/${Routes.USER_PROFILE}/claims`;
    }
    return false;
  };

  return (
    <li className={classes.navLinks}>
      <NavLink to={link} activeClassName={classes.activeTab} isActive={isActiveTab}>
        {title}
      </NavLink>
    </li>
  );
};

NavItem.defaultProps = {
  link: "#",
};

export default NavItem;
