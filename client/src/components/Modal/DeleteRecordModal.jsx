import { Button, Grow, IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { deleteRecordAction } from "../../redux/actions";
import CloseIcon from "@mui/icons-material/Close";

const DeleteRecordModal = ({ openDelete, handleCloseDelete, selectedRecord, setFetchDelete }) => {
  const id = selectedRecord._id;

  const dispatch = useDispatch();

  const handleDeleteRecord = () => {
    dispatch(deleteRecordAction(id));
    setFetchDelete(true);
    handleCloseDelete();
  };
  const body = (
    <Grow in={openDelete}>
      <Box
        sx={{
          width: "90%",
          position: "absolute",
          top: "40%",
          left: "5%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{
            width: "100%",
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
            Are you sure you want to delete the record{" "}
            <Box component="span" sx={{ color: "#90caf9" }}>
              "{id}"
            </Box>{" "}
            ?
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between" width="100%">
            <Button variant="contained" color="secondary" onClick={handleDeleteRecord}>
              Delete
            </Button>
            <Button variant="contained" onClick={handleCloseDelete}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Grow>
  );

  return (
    <Modal open={openDelete} onClose={handleCloseDelete} aria-labelledby="delete-record-modal">
      {body}
    </Modal>
  );
};
export default DeleteRecordModal;
