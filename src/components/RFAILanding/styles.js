export const useStyles = theme => ({
  RFAILandingContainer: {
    backgroundColor: theme.palette.text.offWhiteColor,
  },
  mainWrapper: {
    width: "92%",
    margin: "0 auto",
  },
  topSectionCotainer: {
    marginTop: 24,
    "@media(max-width: 1024px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  titleContainer: {
    "@media(max-width: 1024px)": { maxWidth: "100%" },
  },
  title: {
    margin: 0,
    color: theme.palette.text.darkShadedGray,
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: -0.5,
    lineHeight: "48px",
    "@media(max-width: 1280px)": { marginTop: 16 },
    "@media(max-width: 1024px)": { fontSize: 28 },
    "@media(max-width: 768px)": { marginTop: 0 },
  },
  descriptionContainer: {
    "@media(max-width: 1024px)": {
      maxWidth: "100%",
      textAlign: "center  ",
    },
  },
  description: {
    margin: 0,
    color: theme.palette.text.darkShadedGray,
    fontSize: 22,
    fontWeight: 600,
    lineHeight: "32px",
    "& p": {
      margin: "5px 0 0",
      fontWeight: 200,
      lineHeight: "28px",
    },
    "@media(max-width: 1280px)": {
      paddingRight: 0,
      paddingTop: 16,
    },
    "@media(max-width: 1024px)": { paddingTop: 0 },
  },
  btnContainer: { marginTop: 33 },
  signupLink: { textDecoration: "none" },
});
