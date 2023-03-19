import { useDispatch } from "react-redux";

import { Modal, Box, TextField, Button, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { addCellAction } from "../../redux/actions";

function AddCellModal({
  openAdd,
  setOpenAdd,
  handleOpenAdd,
  handleCloseAdd,
  newCell,
  setNewCell,
  columnNameAdd,
  setColumnNameAdd,
  setFetchAdd,
}) {
  console.log("NEW RECORD: ", newCell);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(addCellAction(columnNameAdd, newCell));
    setFetchAdd(true);
    handleCloseAdd();
  };

  const handleDiscard = () => {
    setNewCell("");
    handleCloseAdd();
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
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <IconButton edge="end" color="inherit" onClick={handleCloseAdd} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <TextField
        label="Column Name"
        value={columnNameAdd}
        onChange={(e) => setColumnNameAdd(e.target.value)}
        autoFocus
        fullWidth
        sx={{ marginBottom: 3 }}
      />
      <TextField
        label="New Record"
        value={newCell}
        onChange={(e) => setNewCell(e.target.value)}
        // autoFocus
        fullWidth
      />

      <Box mt={2} display="flex" justifyContent="space-between" width="100%">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save record
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDiscard}>
          Discard
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box display="flex" alignItems="center">
      <Tooltip title="Add cell" placement="left">
        <Button onClick={handleOpenAdd} variant="contained" color="primary">
          <AddIcon />
        </Button>
      </Tooltip>
      <Modal open={openAdd} onClose={handleCloseAdd} aria-labelledby="add-record-modal">
        {body}
      </Modal>
    </Box>
  );
}

export default AddCellModal;
