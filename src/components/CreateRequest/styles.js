export const useStyles = theme => ({
  CreateRequestContaienr: {
    padding: "30px 60px 60px",
    backgroundColor: theme.palette.text.offWhiteColor,
    flexDirection: "column",
    "@media(max-width:1024px)": { padding: "25px 30px 40px" },
    "@media(max-width:360px)": { padding: "15px 15px 40px" },
  },
});
