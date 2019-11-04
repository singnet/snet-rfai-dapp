import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  requestListView: {
    paddingLeft: 25,
    "@media(max-width: 1024px)": {
      paddingTop: 30,
      paddingLeft: 0,
    },
    "@media(min-width: 1281px)": { paddingLeft: 15 },
    "@media(min-width: 1024px) and (max-width: 1280px)": { paddingLeft: 40 },
    "@media(min-width: 768px) and (max-width: 1024px)": { paddingLeft: 0 },
  },
  circularProgressContainer: {
    paddingTop: 20,
    textAlign: "center",
    height: 500,
    display: "table",
    width: "100%",
    "& div": {
      color: theme.palette.text.primary,
    },
  },
  loaderChild: {
    display: "table-cell",
    verticalAlign: "middle",
    margin: "0 auto",
  },
  circularProgress: {
    display: "inline-block",
    width: 48,
    height: 48,
  },
  loaderText: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.25,
  },
}));
