import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCellModal from "./EditCellModal";

function EditOrDeleteModal({ editOrDeleteOpen, handleCloseEditOrDelete, setFetchEdit }) {
  const [openEdit, setOpenEdit] = useState(false);
  const selectedCellEdit = useSelector((store) => store.records.selectedCell);

  const handleOpneEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    handleCloseEditOrDelete();
    setOpenEdit(false);
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
        boxShadow: 24,
        p: 4,
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
          // onClick={handleEditCell}
          onClick={() => {
            console.log("EDIT");
            handleOpneEdit();
            // setTimeout(() => {
            //   handleCloseEditOrDelete();
            // }, 100);
          }}
          sx={{ width: "100%" }}
        >
          Edit Cell
        </Button>
      </Box>
      <Box sx={{ width: "95%" }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          // onClick={handleDeleteRecord}
          onClick={() => console.log("DELETE")}
          sx={{ width: "100%" }}
        >
          Delete Record
        </Button>
      </Box>
      <EditCellModal
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
        selectedCellEdit={selectedCellEdit}
        // fetchEdit={fetchEdit}
        setFetchEdit={setFetchEdit}
      />
    </Box>
  );

  return (
    <Modal open={editOrDeleteOpen} onClose={handleCloseEditOrDelete} aria-labelledby="edit-or-delete-modal">
      {body}
    </Modal>
  );
}

export default EditOrDeleteModal;
