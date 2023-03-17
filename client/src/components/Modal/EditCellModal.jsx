import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Box, Modal, TextField, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { editCellAction } from "../../redux/actions";

function EditCellModal({ openEdit, handleCloseEdit, selectedCell, setFetchEdit }) {
  const id = selectedCell._id;
  const columnName = Object.keys(selectedCell)[1];
  const cellValue = selectedCell[columnName];

  const [editedCellValue, setEditedCellValue] = useState(cellValue);

  const dispatch = useDispatch();

  console.log("RECORD ID: ", id);
  console.log("COLUMN VALUE: ", columnName);
  console.log("CELL VALUE: ", cellValue);
  console.log("EDITED CELL VALUE: ", editedCellValue);

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
        <IconButton edge="end" color="inherit" onClick={handleCloseEdit} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <TextField
        label="Column Name"
        value={columnName}
        readOnly
        fullWidth
        sx={{
          marginBottom: 3,
          color: "rgba(255,255,255,0.4)",
          "& label": {
            color: "rgba(255,255,255,0.4)",
          },
          "& .MuiInputBase-input": {
            color: "rgba(255,255,255,0.4)",
          },
          "& .Mui-focused": {
            borderColor: "rgba(255,255,255,0.4)",
          },
        }}
      />

      <TextField
        label="Edit Cell"
        value={editedCellValue}
        autoFocus
        onChange={(e) => setEditedCellValue(e.target.value)}
        fullWidth
      />
      <Box mt={2} display="flex" justifyContent="space-between" width="100%">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(editCellAction(id, columnName, editedCellValue));
            setFetchEdit(true);
            handleCloseEdit();
          }}
        >
          Save changes
        </Button>
        <Button variant="contained" color="secondary">
          Discard
        </Button>
      </Box>
    </Box>
  );

  return (
    <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="edit-cell-modal">
      {body}
    </Modal>
  );
}

export default EditCellModal;
