export const useStyles = theme => ({
  createRequestMainContainer: {
    maxWidth: 1400,
    margin: "0 auto",
    justifyContent: "center",
    padding: "42px 10px",
    backgroundColor: theme.palette.text.offWhiteColor,
    "& h3": {
      padding: "0 22px",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.text.gray1,
      margin: 0,
      color: theme.palette.text.darkShadedGray,
      fontSize: 20,
      fontWeight: 400,
      lineHeight: "50px",
    },
    "@media(max-width:960px)": { padding: "42px 60px" },
    "@media(max-width:600px)": { padding: "42px 10px" },
  },
  createRequestContainer: {
    maxWidth: 845,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    borderRadius: 4,
    backgroundColor: theme.palette.text.white,
    "& h3": {
      "& + div": {
        paddingTop: 49,
        paddingBottom: 40,
        "& ul": {
          "@media(max-width:470px)": { alignItems: "flex-start" },
          "& li": {
            "&::before": {
              "@media(max-width:470px)": {
                width: 0,
                marginRight: 0,
              },
            },
          },
        },
      },
    },
    "@media(max-width:960px)": { maxWidth: "100%" },
  },
  createRequestContent: {
    padding: "0 30px",
    "& p, & > span, & li": {
      color: theme.palette.text.alertBoxColor,
      lineHeight: "21px",
      letterSpacing: 0.25,
      fontFamily: theme.typography.primary.main,
      fontSize: 14,
    },
    "& > span": {
      padding: "20px 0",
      display: "inline-block",
    },
    "& ul": {
      margin: 0,
      padding: 0,
    },
    "& li": { listStyle: "none" },
    "& ul p": { margin: 0 },
    "& button": {
      display: "flex",
      margin: "40px auto",
    },
  },
  accountBalanceContainer: {
    maxWidth: 411,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    borderRadius: 4,
    marginLeft: 25,
    backgroundColor: theme.palette.text.white,
    flexBasis: "30%",
    "@media(max-width:960px)": {
      maxWidth: "100%",
      marginTop: 25,
      marginLeft: 0,
      flexBasis: "100%",
    },
  },
  warningBox: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.text.warningBoxBorder,
    borderRadius: 4,
    padding: "13px 20px",
    margin: "32px 20px 27px",
    backgroundColor: theme.palette.text.warningBoxBg,
    "& p, & span": {
      color: theme.palette.text.alertBoxColor,
      fontFamily: theme.typography.primary.main,
      fontSize: 14,
      lineHeight: "20px",
      letterSpacing: 0.25,
      textAlign: "left",
    },
    "& p": { paddingTop: 20 },
    "& a": {
      color: theme.palette.text.primary,
      fontWeight: "bold",
    },
  },
});
