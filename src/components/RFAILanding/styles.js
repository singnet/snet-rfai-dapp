import newAIServiceBG from "../../assets/images/newAIServiceBG.png";

export const useStyles = theme => ({
  disabledPortalMainContainer: { padding: "102px 0 62px" },
  disabledPortalMainWrapper: {
    width: 845,
    margin: "0 auto",
    "@media(max-width:900px)": { width: "90%" },
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
      "&:hover": { textDecoration: "underline" },
    },
  },
  letterFoot: {
    marginTop: 55,
    "& span": { display: "block" },
  },
  lookingForNewAIServiceContainer: {
    borderRadius: 6,
    backgroundImage: `url(${newAIServiceBG})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "flex-start",
    padding: "32px 35px 32px 38px",
    marginTop: 32,
    "& div": {
      marginLeft: 32,
      "& > span": {
        color: "#fff",
        fontSize: 24,
        fontWeight: 600,
        lineHeight: "30px",
      },
      "& p": {
        margin: "9px 0 48px",
        color: "#eee",
        fontWeight: 200,
        lineHeight: "24px",
      },
      "& button": {
        padding: "7px 38px",
        border: "1px solid #fff",
        borderRadius: 4,
        background: "transparent",
        color: "#fff",
        cursor: "pointer",
        fontFamily: "Muli",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 1.25,
        lineHeight: "16px",
        textTransform: "uppercase",
        "&:hover": { background: "rgba(241,241,241,0.15)" },
      },
      "@media(max-width:600px)": {
        margin: "15px 0 0",
        textAlign: "center",
      },
    },
    "@media(max-width:600px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
});
