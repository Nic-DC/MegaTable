import { Button, Grow, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const GenerateTableModal = ({ open, handleClose }) => {
  const [count, setCount] = useState("");

  const body = (
    <Grow in={open}>
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
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            label="insert number of rows"
            value={count}
            autoFocus
            onChange={(e) => setCount(e.target.value)}
            fullWidth
          />
          <Box mt={2} display="flex" justifyContent="space-between" width="100%">
            <Button variant="contained" onClick={handleClose}>
              Generate New Table
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Grow>
  );
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="delete-record-modal">
      {body}
    </Modal>
  );
};
export default GenerateTableModal;
