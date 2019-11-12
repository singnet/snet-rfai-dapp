import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  approveRejectRequest: {
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
    width: 480,
    paddingBottom: 25,
    margin: "0px auto 80px	",
    transform: "translateY(25%)",
    "@media(max-width:500px)": { width: "100%" },
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
    marginTop: 32,
    justifyContent: "center",
  },
  root: {
    width: "100%",
    boxShadow: "none",
    overflowX: "auto",
  },
  requestTitle: {
    padding: "15px 22px",
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.text.offWhiteColor,
    "& span": { color: theme.palette.text.mediumShadeGray },
    "& p": {
      margin: "0 0 0 5px",
      fontSize: 16,
    },
  },
  requestedByAndExpiryContainer: {
    padding: "16px 32px",
    display: "flex",
    justifyContent: "center",
    "& span": {
      color: theme.palette.text.lightShadedGray,
      fontSize: 14,
      lineHeight: "18px",
    },
    "& p": {
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      lineHeight: "26px",
    },
    "& > div": { flex: 1 },
    "@media(max-width:500px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  requestedBy: { "& p": { wordBreak: "break-all" } },
  expirySet: {
    textAlign: "right",
    "@media(max-width:500px)": {
      marginTop: 25,
      textAlign: "left",
    },
  },
  currentBlockNumber: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    "& span": { color: theme.palette.text.lightShadedGray },
    "& p": {
      margin: 0,
      color: theme.palette.text.darkShadedGray,
    },
    "@media(max-width:500px)": {
      padding: "0 32px",
      justifyContent: "flex-start",
    },
  },
  inputFieldContainer: {
    marginTop: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media(max-width:500px)": {
      padding: "0 20px",
      alignItems: "flex-start",
    },
    "& > div": {
      position: "relative",
      "@media(max-width:500px)": { width: "100%" },
      marginBottom: 25,
      "&:last-of-type": { marginBottom: 0 },
      "& input": {
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
