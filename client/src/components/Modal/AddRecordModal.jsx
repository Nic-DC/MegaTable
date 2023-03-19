import { useDispatch } from "react-redux";
import { Button, Box, Modal, TextField, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { addRecordAction } from "../../redux/actions";

const AddRecordModal = ({ openAddRecord, handleCloseAddRecord, handleOpenAddRecord, newRecord, setNewRecord }) => {
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(addRecordAction(newRecord));
    setNewRecord({
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      column5: "",
    });
    handleCloseAddRecord();
  };
  const handleDiscard = () => {
    setNewRecord("");
    handleCloseAddRecord();
  };

  const handleInputChange = (e, columnName) => {
    setNewRecord({ ...newRecord, [columnName]: e.target.value });
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
        <IconButton edge="end" color="inherit" onClick={handleCloseAddRecord} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      {["column1", "column2", "column3", "column4", "column5"].map((columnName) => (
        <TextField
          key={columnName}
          label={`Column ${columnName}`}
          value={newRecord[columnName]}
          onChange={(e) => handleInputChange(e, columnName)}
          fullWidth
          sx={{ marginBottom: 3 }}
        />
      ))}
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
      <Tooltip title="Add record" placement="left">
        <Button onClick={handleOpenAddRecord} variant="contained" color="primary">
          <AddIcon />
        </Button>
      </Tooltip>
      <Modal open={openAddRecord} onClose={handleCloseAddRecord} aria-labelledby="add-record-modal">
        {body}
      </Modal>
    </Box>
  );
};

export default AddRecordModal;
