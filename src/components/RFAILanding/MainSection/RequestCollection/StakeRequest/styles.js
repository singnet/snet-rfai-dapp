import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  stakeRequest: {
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
    width: 720,
    paddingBottom: 25,
    margin: "0px auto 80px	",
    transform: "translateY(25%)",
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
    marginTop: 23,
    justifyContent: "center",
  },
  root: {
    width: "100%",
    boxShadow: "none",
  },
  table: {
    tableLayout: "fixed",
    padding: "0 22px",
    margin: "24px 22px 16px",
    "& thead": {
      "& th": {
        padding: 0,
        border: "none",
        color: theme.palette.text.lightShadedGray,
        fontSize: 14,
      },
    },
    "& tbody": {
      "& td": {
        padding: 0,
        border: "none",
        color: theme.palette.text.darkShadedGray,
        fontSize: 20,
        lineHeight: "26px",
        wordBreak: "break-all",
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
    padding: "16px 22px",
    backgroundColor: theme.palette.text.offWhiteColor,
    fontSize: 16,
    lineHeight: "20px",
  },
  requestTitle: { color: theme.palette.text.mediumShadeGray },
  titleName: { color: theme.palette.text.darkShadedGray },
  inputContainer: {
    padding: "0 22px",
    marginTop: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media(max-width:500px)": {
      padding: "0 20px",
      alignItems: "flex-start",
    },
    "& > div": {
      position: "relative",
      "@media(max-width:500px)": { width: "100%" },
      "&:last-of-type": { marginBottom: 0 },
      "& input": {
        boxSizing: "border-box",
        width: 312,
        padding: "19px 10px",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(25,25,25,0.32)",
        borderRadius: 4,
        "@media(max-width:500px)": {
          boxSizing: "border-box",
          width: "100%",
        },
      },
      "& label": {
        padding: "0 8px",
        position: "absolute",
        top: -11,
        left: 10,
        backgroundColor: theme.palette.text.white,
        color: theme.palette.text.black1,
        fontSize: 12,
        letterSpacing: 0.4,
      },
    },
  },
}));
