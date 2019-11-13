export const useStyles = theme => ({
  CategoryWrapper: {
    width: "80%",
    padding: "33px 0",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: theme.palette.text.lightShadedGray,
    margin: "0 auto",
    justifyContent: "space-between",
    "@media(max-width:1280px)": { width: "95%" },
    "@media(max-width:960px)": { flexDirection: "column" },
  },
  CategoryContent: {
    paddingLeft: 24,
    "& p": {
      margin: "22px 0 0",
      color: "#616166",
      fontSize: 18,
      lineHeight: "28px",
      "& span": { fontWeight: 600 },
      "@media(max-width:960px)": { marginTop: 10 },
    },
    "@media(max-width:960px)": {
      maxWidth: "100%",
      paddingLeft: 0,
      marginTop: 15,
    },
  },
  reverseDirection: {
    flexDirection: "row-reverse",
    "& div": {
      "&:last-of-type": {
        padding: "0 24px 0 0",
        "@media(max-width:960px)": {
          marginTop: 0,
          paddingRight: 0,
        },
      },
      "@media(max-width:960px)": { padding: "25px 0 0" },
    },
    "@media(max-width:960px)": {
      flexDirection: "column-reverse",
    },
  },
  Title: {
    "& svg": {
      marginRight: 11,
      color: theme.palette.text.grayTitleText,
      fontSize: 30,
      verticalAlign: "bottom",
    },
    "& h3": {
      margin: 0,
      display: "inline-block",
      color: theme.palette.text.black1,
      fontSize: 24,
      fontWeight: 600,
      lineHeight: "30px",
    },
  },
  CategoryMedia: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": { width: "100%" },
    "@media(max-width:960px)": {
      width: 411,
      margin: "0 auto",
    },
  },
});
