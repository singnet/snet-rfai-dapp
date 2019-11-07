import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles(theme => ({
  requestListView: {
    paddingLeft: 25,
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
  expansionPanelDetails: {
    padding: "20px 20px 16px",
    margin: "0 15px",
    backgroundColor: theme.palette.text.expansionPanelBg,
  },
  exPanelLeftSection: {
    width: 0,
    flex: "2 1 0",
    "& span": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 16,
      letterSpacing: 0.2,
      lineHeight: "20px",
    },
    "& p": {
      margin: "8px 0 0",
      color: theme.palette.text.mediumShadeGray,
      fontSize: 14,
      letterSpacing: 0.17,
      lineHeight: "18px",
    },
  },
  exPanelDescription: {
    marginBottom: 24,
  },
  exPanelRightSection: {
    width: 0,
    paddingLeft: 24,
    flex: "1 1 0",
    borderLeft: "1px solid #d8d8d8",
    "& span": {
      color: theme.palette.text.darkShadedGray,
      fontSize: 14,
      letterSpacing: 0.17,
      lineHeight: "18px",
    },
    "& p": { margin: 0 },
    "& div": {
      marginBottom: 26,
      "&:last-of-type": { marginBottom: 0 },
    },
  },
  urlLink: {
    color: `${theme.palette.text.primary} !important`,
    fontSize: 14,
    wordBreak: "break-all",
  },
  exPanelSubDeadline: {
    "& p": { display: "inline-block" },
  },
  expansionPanelAction: {
    borderRadius: 4,
    margin: "0 15px 10px",
    backgroundColor: theme.palette.text.expansionPanelBg,
    justifyContent: "flex-start",
    "& button": {
      margin: "16px 0 15px 35px",
    },
  },
  title: {
    color: theme.palette.text.lightShadedGray,
    fontSize: 14,
    lineHeight: "18px",
    textAlign: "right",
  },
  data: {
    margin: 0,
    color: theme.palette.text.darkShadedGray,
    fontSize: 20,
    lineHeight: "26px",
    textAlign: "right",
    "& span": { fontSize: "16px !important" },
  },
  serviceProviderName: {
    margin: 0,
    color: theme.palette.text.darkShadedGray,
    fontSize: 16,
    letterSpacing: "0.2px",
    lineHeight: "20px",
  },
  expansionPanelSummary: {
    padding: "10px 15px",
    "& .MuiExpansionPanelSummary-content": {
      paddingRight: 25,
      display: "flex",
      justifyContent: "space-between",
    },
  },
  divider: { margin: "0 15px" },
}));
