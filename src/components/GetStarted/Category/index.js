import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import ParseHTML from "html-react-parser";

import { useStyles } from "./styles";
import StyledButton from "../../common/StyledButton";
import DummyGetStartedCard from "../../../assets/images/dummy-card.png";
import { Link } from "react-router-dom";

const Description = ({ content }) => <p>{ParseHTML(content)}</p>;

const Subheading = ({ content }) => <p>{ParseHTML(content)}</p>;

const ListHeading = ({ content }) => <span>{ParseHTML(content)}</span>;

const List = ({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item}>{ParseHTML(item)}</li>
    ))}
  </ul>
);

const Category = ({ classes, title, content, rightAlign, media }) => {
  return (
    <Grid
      container
      spacing={24}
      className={`${classes.CategoryWrapper} ${rightAlign ? classes.reverseDirection : null}`}
    >
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.CategoryMedia}>
        <img src={media || DummyGetStartedCard} alt={title} className={classes.FullWidth} />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} className={classes.CategoryContent}>
        <h3>{title}</h3>
        {content.map((item, index) => {
          if (item.type === "description") {
            return <Description content={item.value} />;
          }
          if (item.type === "subheading") {
            return <Subheading content={item.value} />;
          }
          if (item.type === "listHeading") {
            return <ListHeading content={item.value} />;
          }
          if (item.type === "list") {
            return <List items={item.items} />;
          }
          if (item.type === "action") {
            //return <StyledButton {...item.value} />;
            return (
              <Link to={item.linkTo} className={classes.createRequestLink}>
                <StyledButton {...item.value} />
              </Link>
            );
          }
          return null;
        })}
      </Grid>
    </Grid>
  );
};

export default withStyles(useStyles)(Category);
