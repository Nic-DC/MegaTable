import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, IconButton, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCellModal from "./EditCellModal";
import CloseIcon from "@mui/icons-material/Close";
import DeleteCellModal from "./DeleteCellModal";

function EditOrDeleteModal({
  editOrDeleteRecordOpen,
  handleCloseEditOrDeleteRecord,
  setFetchEditRecord,
  setFetchDeleteRecord,
}) {
  //   editOrDeleteRecordOpen = { editOrDeleteRecordOpen };
  //   handleCloseEditOrDeleteRecord = { handleCloseEditOrDeleteRecord };
  //   setFetchEditRecord = { setFetchEditRecord };
  //   setFetchDeleteRecord = { setFetchDeleteRecord };
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const selectedCell = useSelector((store) => store.records.selectedCell);

  const handleOpneEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    handleCloseEditOrDeleteRecord();
    setOpenEdit(false);
  };

  const handleOpneDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    handleCloseEditOrDeleteRecord();
    setOpenDelete(false);
  };
  const body = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        // height: "50%",
        bgcolor: "black",
        boxShadow: 85,
        p: 4,
      }}
    >
      <Box sx={{ position: "relative", display: "flex", justifyContent: "flex-end" }}>
        <IconButton edge="end" color="inherit" onClick={handleCloseEditOrDeleteRecord} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "95%", marginRight: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
              console.log("EDIT");
              handleOpneEdit();
            }}
            sx={{ width: "100%" }}
          >
            Edit Record
          </Button>
        </Box>
        <Box sx={{ width: "95%" }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => {
              console.log("DELETE");
              handleOpneDelete();
            }}
            sx={{ width: "100%" }}
          >
            Delete Record
          </Button>
        </Box>
      </Box>

      {/* <EditRecordModal
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
        selectedCell={selectedCell}
        setFetchEdit={setFetchEditRecord}
      />
      <DeleteRecordModal
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        selectedCell={selectedCell}
        setFetchDelete={setFetchDeleteRecord}
      /> */}
    </Box>
  );

  return (
    <Modal open={editOrDeleteRecordOpen} onClose={handleCloseEditOrDeleteRecord} aria-labelledby="edit-or-delete-modal">
      {body}
    </Modal>
  );
}

export default EditOrDeleteModal;
