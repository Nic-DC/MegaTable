import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Box, Modal, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { editRecordAction } from "../../redux/actions";

const columns = ["column1", "column2", "column3", "column4", "column5"];

function EditRecordModal({ openEdit, handleCloseEdit, selectedRecord, setFetchEdit }) {
  const initialEditedRecord = columns.reduce((accumulator, columnName) => {
    if (selectedRecord.hasOwnProperty(columnName)) {
      accumulator[columnName] = selectedRecord[columnName];
    }
    return accumulator;
  }, {});

  const [editedRecord, setEditedRecord] = useState(initialEditedRecord);
  console.log("editedRecord: ", editedRecord);
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedRecord(initialEditedRecord);
  }, [selectedRecord]);

  const handleInputChange = (e, columnName) => {
    setEditedRecord({ ...editedRecord, [columnName]: e.target.value });
  };

  const validColumns = ["column1", "column2", "column3", "column4", "column5"];

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

      {validColumns.map((columnName) => (
        <TextField
          key={columnName}
          label={columnName}
          value={editedRecord[columnName] || ""}
          onChange={(e) => handleInputChange(e, columnName)}
          fullWidth
          sx={{ marginBottom: 3 }}
        />
      ))}

      <Box mt={2} display="flex" justifyContent="space-between" width="100%">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(editRecordAction(selectedRecord._id, editedRecord));
            setFetchEdit(true);
            handleCloseEdit();
          }}
        >
          Save changes
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCloseEdit}>
          Discard
        </Button>
      </Box>
    </Box>
  );

  return (
    <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="edit-record-modal">
      {body}
    </Modal>
  );
}

export default EditRecordModal;
