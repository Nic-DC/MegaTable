import React from "react";
import { useDispatch } from "react-redux";
import { Button, Box, Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { deleteCellAction } from "../../redux/actions";

function DeleteCellModal({ openDelete, handleCloseDelete, selectedCell, setFetchDelete }) {
  const id = selectedCell._id;
  const columnName = Object.keys(selectedCell)[1];
  const cellValue = selectedCell[columnName];
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCellAction(id, columnName));
    setFetchDelete(true);
    handleCloseDelete();
  };

  const body = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        bgcolor: "black",
        boxShadow: 85,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <IconButton edge="end" color="inherit" onClick={handleCloseDelete} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="h6" sx={{ marginBottom: 3, color: "rgba(255,255,255,0.4)" }}>
        Are you sure you want to delete the value{" "}
        <Box component="span" sx={{ color: "#90caf9" }}>
          "{cellValue}"
        </Box>{" "}
        from column{" "}
        <Box component="span" sx={{ color: "#90caf9" }}>
          "{columnName}"
        </Box>
        ?
      </Typography>
      <Box mt={2} display="flex" justifyContent="space-between" width="100%">
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" onClick={handleCloseDelete}>
          Cancel
        </Button>
      </Box>
    </Box>
  );

  return (
    <Modal open={openDelete} onClose={handleCloseDelete} aria-labelledby="delete-record-modal">
      {body}
    </Modal>
  );
}

export default DeleteCellModal;
