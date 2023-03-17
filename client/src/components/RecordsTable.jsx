import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { selectRecordAction } from "../redux/actions";

function RecordsTable() {
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const rowsPerPage = 9;

  const dispatch = useDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchRecords(value);
  };

  const fetchRecords = async (page = 1) => {
    try {
      const response = await fetch(`http://localhost:3010/table?page=${page}`);

      if (response.status === 200) {
        const data = await response.json();
        setRows(data.records);
        setTotalRecords(data.totalRecords);
      } else {
        console.error("Error fetching records:", response.status);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          width: isMobile ? "90%" : "70%",
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Column 1</TableCell>
                <TableCell>Column 2</TableCell>
                <TableCell>Column 3</TableCell>
                <TableCell>Column 4</TableCell>
                <TableCell>Column 5</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell
                    onClick={() => dispatch(selectRecordAction(row))}
                    key={`${rowIndex}-_id`}
                    align="left"
                    sx={{
                      minWidth: 170,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#90caf9",
                        color: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    {row._id}
                  </TableCell>
                  <TableCell
                    onClick={() => dispatch(selectRecordAction(row))}
                    key={`${rowIndex}-column1`}
                    align="right"
                    sx={{
                      minWidth: 170,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#90caf9",
                        color: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    {row.column1}
                  </TableCell>
                  <TableCell
                    onClick={() => dispatch(selectRecordAction(row))}
                    key={`${rowIndex}-column2`}
                    align="right"
                    sx={{
                      minWidth: 170,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#90caf9",
                        color: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    {row.column2}
                  </TableCell>
                  <TableCell
                    onClick={() => dispatch(selectRecordAction(row))}
                    key={`${rowIndex}-column3`}
                    align="right"
                    sx={{
                      minWidth: 170,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#90caf9",
                        color: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    {row.column3}
                  </TableCell>
                  <TableCell
                    onClick={() => dispatch(selectRecordAction(row))}
                    key={`${rowIndex}-column4`}
                    align="right"
                    sx={{
                      minWidth: 170,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#90caf9",
                        color: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    {row.column4}
                  </TableCell>
                  <TableCell
                    onClick={() => dispatch(selectRecordAction(row))}
                    key={`${rowIndex}-column5`}
                    align="right"
                    sx={{
                      minWidth: 170,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#90caf9",
                        color: "rgba(0,0,0,0.7)",
                      },
                    }}
                  >
                    {row.column5}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalRecords / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "2%",
          marginLeft: 5,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginBottom: 2,
            minWidth: "80%",
          }}
        >
          <Tooltip title="Add record" placement="right-end">
            <AddIcon />
          </Tooltip>
        </Button>
        <Divider orientation="horizontal" sx={{ width: "100%", marginBottom: 2 }} />
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginBottom: 2,
            backgroundColor: "#90caf9",
            minWidth: "80%",
          }}
        >
          <Tooltip title="Download table" placement="right-end">
            <DownloadIcon />
          </Tooltip>
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "orangeRed",
            minWidth: "100%",
          }}
        >
          <Tooltip title="Delete table" placement="right-end">
            <DeleteIcon />
          </Tooltip>
        </Button>
      </Box>
    </Box>
  );
}
export default RecordsTable;
