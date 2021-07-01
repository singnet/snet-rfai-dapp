import React from "react";

import { useStyles } from "./styles";
import NavItem from "./NavItem";

const NavBar = ({ data }) => {
  const classes = useStyles();

  return (
    <nav>
      <ul className={classes.navUl}>
        {data.map(tab => (
          <NavItem key={tab.title} title={tab.title} link={tab.link} newTab={tab.newTab} />
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
