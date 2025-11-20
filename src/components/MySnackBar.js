import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackbar({ open, message, type }) {
  return (
    <Snackbar open={open}>
      <Alert severity={type} style={{ direction: "rtl" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
