import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  submitSolution: {
    paddingLeft: 25,
    "@media(max-width: 1024px)": {
      paddingTop: 30,
      paddingLeft: 0,
    },
    "@media(min-width: 1281px)": { paddingLeft: 15 },
    "@media(min-width: 1024px) and (max-width: 1280px)": { paddingLeft: 40 },
    "@media(min-width: 768px) and (max-width: 1024px)": { paddingLeft: 0 },
  },
  Modal: { overflow: "auto" },
  card: {
    width: 844,
    paddingBottom: 25,
    margin: "0px auto 80px	",
    transform: "translateY(25%)",
    "@media(max-width:860px)": { width: "100%" },
  },
  CardHeader: {
    padding: "5px 22px",
    "& span": {
      color: theme.palette.text.black1,
      fontFamily: theme.typography.primary.main,
      fontSize: 20,
      lineHeight: "23px",
    },
  },
  CardContent: {
    padding: 0,
    "& h2": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 18,
      fontWeight: 400,
      lineHeight: "24px",
    },
    "& p": {
      margin: "16px 0 0",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      letterSpacing: 0.25,
      lineHeight: "20px",
    },
  },
  CardActions: {
    justifyContent: "center",
  },
  root: {
    width: "100%",
    boxShadow: "none",
  },
  table: {
    padding: "0 22px",
    tableLayout: "fixed",
    "& thead": {
      "& th": {
        padding: "0 0 8px",
        border: "none",
        color: theme.palette.text.darkShadedGray,
        fontFamily: theme.typography.primary.main,
        fontSize: 16,
        lineHeight: "20px",
      },
    },
    "& tbody": {
      "& tr": {
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: theme.palette.text.lightGray,
      },
      "& th, & td": {
        padding: "7px 0 8px 0",
        border: "none",
        color: theme.palette.text.mediumShadeGray,
        fontFamily: theme.typography.primary.main,
        fontSize: 14,
        lineHeight: "18px",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
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
  requestTitleContainer: {
    padding: "17px 22px",
    backgroundColor: theme.palette.text.offWhiteColor,
    fontSize: 16,
    lineHeight: "20px",
  },
  requestTitle: { color: theme.palette.text.mediumShadeGray },
  titleName: { color: theme.palette.text.darkShadedGray },
  submitSolutionContent: {
    padding: "18px 22px 24px",
    "& p": {
      margin: 0,
      fontSize: 16,
    },
    "& ul": {
      padding: "18px 15px",
      margin: "24px 0 0",
      backgroundColor: "#f5f5f5",
      "& li": {
        listStyle: "none",
        lineHeight: "30px",
      },
    },
  },
  solutionUrlContainer: {
    width: 424,
    margin: "32px auto 0",
    "& div": { position: "relative" },
    "& p": {
      margin: "4px 0 0",
      color: theme.palette.text.alertBoxColor,
      fontSize: 12,
      letterSpacing: 0.4,
      lineHeight: "16px",
    },
    "& label": {
      padding: "0 5px",
      marginLeft: 10,
      position: "absolute",
      top: -7,
      letterSpacing: 0.4,
      backgroundColor: theme.palette.text.white,
      color: theme.palette.text.dialogTitle,
      fontSize: 12,
    },
    "& input": {
      boxSizing: "border-box",
      width: "100%",
      padding: "18px 10px",
      border: "1px solid rgba(25,25,25,0.32)",
      borderRadius: 4,
    },
    "@media(max-width:600px)": { width: "100%" },
  },
}));
