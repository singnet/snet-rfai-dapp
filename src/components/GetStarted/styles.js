export const useStyles = theme => ({
  GetStartedMainContaienr: {
    padding: "40px 0 60px",
    backgroundColor: theme.palette.text.offWhiteColor,
    flexDirection: "column",
    "@media(max-width:360px)": { padding: "15px 15px 40px" },
  },
  TopSection: { textAlign: "center", marginTop: "64px" },
  btnContainer: {
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
  },
  createRequestLink: { textDecoration: "none" },
});
