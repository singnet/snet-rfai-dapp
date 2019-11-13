export const useStyles = theme => ({
  GetStartedMainContaienr: {
    padding: "40px 0 100px",
    backgroundColor: theme.palette.text.offWhiteColor,
    flexDirection: "column",
    "@media(max-width:360px)": { padding: "15px 15px 40px" },
  },
  TopSection: { textAlign: "center" },
  btnContainer: {
    margiinTop: 15,
    display: "flex",
    justifyContent: "center",
  },
});
