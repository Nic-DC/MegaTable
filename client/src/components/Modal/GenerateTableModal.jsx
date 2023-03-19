import { Button, Grow, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GenerateTableModal = ({ open, handleClose }) => {
  const [count, setCount] = useState("");
  const navigate = useNavigate();

  const generateTableUrl = process.env.REACT_APP_GENERATE_TABLE_URL;

  const generateTable = async (nrOfRows) => {
    try {
      const response = await fetch(`${generateTableUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: nrOfRows }),
      });

      if (response.ok) {
        const message = response.json();
        console.log("MESSAGE FROM INSERTING: ", message);
        navigate("/table");
      } else {
        console.log("Error generating new table");
      }
    } catch (error) {
      console.error("Error generating new table", error);
    }
  };

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
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => {
                setCount("");
                handleClose();
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <TextField
            label="insert number of rows"
            value={count}
            autoFocus
            onChange={(e) => setCount(e.target.value)}
            fullWidth
            type="number"
            inputProps={{ min: 1, max: 250 }}
          />
          <Box mt={2} display="flex" justifyContent="space-between" width="100%">
            <Button
              variant="contained"
              onClick={() => {
                generateTable(count);
                setCount("");
                handleClose();
              }}
            >
              Add rows
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCount("");
                handleClose();
              }}
            >
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
