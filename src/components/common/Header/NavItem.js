import React from "react";
import { useStyles } from "./styles";

const NavItem = ({ title, link, newTab }) => {
  const classes = useStyles();

  return (
    <li className={classes.navLinks}>
      <a href={link} title={title} target={newTab ? "_blank" : "_self"}>
        {title}
      </a>
    </li>
  );
};

NavItem.defaultProps = {
  link: "#",
};

export default NavItem;
