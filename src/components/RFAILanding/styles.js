export const useStyles = theme => ({
  disabledPortalMainContainer: { padding: "80px 0" },
  disabledPortalMainWrapper: {
    width: 845,
    margin: "0 auto",
  },
  letterMainContainer: {
    borderRadius: 4,
    backgroundColor: theme.backgroundColor.white,
    boxShadow: "0 1px 1px 0 rgba(0,0,0,0.07), 0 2px 1px -1px rgba(0,0,0,0.07), 0 1px 3px 0 rgba(0,0,0,0.1)",
    "& > span": {
      padding: "28px 0",
      display: "block",
      color: "#222",
      fontSize: 36,
      fontWeight: 600,
      lineHeight: "45px",
      textAlign: "center",
    },
  },
  letterContainer: {
    padding: "37px 64px 32px",
    borderTop: "0.75px solid rgb(155 155 155 / 50%)",
    color: theme.palette.text.mediumShadeGray,
    fontSize: 16,
    lineHeight: "26px",
    "& > span": {
      marginBottom: 55,
      display: "block",
    },
    "& p": {
      margin: 0,
      "&:last-of-type": { marginTop: 30 },
    },
    "& a": {
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
  },
  letterFoot: {
    marginTop: 55,
    "& span": { display: "block" },
  },
  lookingForNewAIServiceContainer: {
    display: "flex",
    padding: "11px 0",
    marginTop: 48,
    "& div": {
      marginLeft: 32,
      "& > span": {
        color: "rgba(0,0,0,0.87)",
        fontSize: 24,
        fontWeight: 600,
        lineHeight: "30px",
      },
      "& p": {
        margin: "16px 0 24px",
        color: theme.palette.text.mediumShadeGray,
        lineHeight: "24px",
      },
    },
  },
});
