export const useStyles = theme => ({
  GetStartedDescription: {
    marginBottom: 40,
    "& h2": {
      color: theme.palette.text.dialogTitle,
      fontSize: 36,
      fontWeight: 600,
      lineHeight: "45px",
    },
    "& p": {
      margin: 0,
      color: theme.palette.text.lightShadedGray,
      fontSize: 24,
      lineHeight: "30px",
      "@media(max-width:1024px)": { marginTop: 10 },
    },
    "& button": {
      padding: "13px 16% 11px",
      marginTop: 16,
    },
  },
});
