export const useStyles = theme => ({
  updateNotificationBar: {
    padding: "2px 20px",
    display: "flex",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#800080",
    color: theme.palette.text.white,
  },
  closeIcon: {
    cursor: "pointer",
  },
  content: {
    textAlign: "justify",
    fontSize: 14,
    "& p": { margin: 1 },
    margin: "2px 0",
  },
});
