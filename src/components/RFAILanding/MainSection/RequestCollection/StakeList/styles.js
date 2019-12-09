import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  stakeList: {
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
    width: 640,
    paddingBottom: 25,
    margin: "0px auto 80px	",
    transform: "translateY(25%)",
    "@media(max-width:640px)": { width: "100%" },
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
    padding: "0 21px",
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
    marginTop: 24,
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
        padding: "7px 0 8px 0",
        border: "none",
        color: theme.palette.text.mediumShadeGray,
        fontFamily: theme.typography.primary.main,
        fontSize: 14,
        lineHeight: "18px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        "& span": {
          display: "none",
          color: theme.palette.text.darkShadedGray,
          fontFamily: theme.typography.primary.main,
          fontSize: 16,
          fontWeight: 600,
          lineHeight: "20px",
          "@media(max-width:600px)": { display: "block" },
        },
        "@media(max-width:600px)": {
          textAlign: "left",
          wordBreak: "break-all",
        },
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
  noDataFound: { padding: "16px 22px" },
  viewBackersDescription: {
    "& p": {
      maxHeight: 99,
      padding: 0,
      margin: "7px 12px 7px 0",
      fontSize: "16px !important",
      overflowY: "scroll",
      "&::-webkit-scrollbar": { width: 5 },
      "&::-webkit-scrollbar-thumb": {
        background: theme.palette.text.lightShadedGray,
        borderRadius: 10,
      },
    },
  },
}));
