import { Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";

const AlertMessage = ({ children: message, open, type, duration, onClose }) => (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
        <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
            {message}
        </Alert>
    </Snackbar>
);

AlertMessage.propTypes = {
	open: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired,
    duration: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};

export default AlertMessage;