import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  voteSolution: {
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
    paddingBottom: 35,
    margin: "0px auto",
    transform: "translateY(25%)",
    "@media(max-width:720px)": { width: "100%" },
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
    marginTop: 30,
    justifyContent: "center",
  },
  root: {
    width: "100%",
    boxShadow: "none",
  },
  table: {
    margin: "16px 22px 0",
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
      "@media(max-width:600px)": { display: "none" },
    },
    "& tbody": {
      "& tr": {
        borderTopWidth: 1,
        borderTopStyle: "solid",
        borderTopColor: theme.palette.text.lightGray,
        "@media(max-width:600px)": {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        },
      },
      "& th, & td": {
        padding: "7px 20px 8px 0",
        border: "none",
        color: theme.palette.text.mediumShadeGray,
        fontFamily: theme.typography.primary.main,
        fontSize: 14,
        lineHeight: "18px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        letterSpacing: 0.25,
        "@media(max-width:600px)": { wordBreak: "break-all" },
        "& span": {
          display: "none",
          color: theme.palette.text.darkShadedGray,
          fontFamily: theme.typography.primary.main,
          fontSize: 16,
          lineHeight: "20px",
          "@media(max-width:600px)": { display: "block" },
        },
      },
      "& td": {
        "&:last-of-type": { paddingRight: 40 },
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
  voteBtn: {
    textOverflow: "initial",
    "& span": {
      display: "block !important",
      color: `${theme.palette.text.disabledBtnBg} !important`,
      fontSize: "14px !important",
      letterSpacing: 1.25,
    },
    "@media(max-width:600px)": { alignSelf: "center" },
  },
  blueText: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
}));
