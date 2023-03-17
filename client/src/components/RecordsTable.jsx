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
import { selectRecordAction, selectCellAction } from "../redux/actions";
import AddRecordModal from "./Modal/AddRecordModal";
import EditOrDeleteModal from "./Modal/EditOrDeleteModal";

function RecordsTable() {
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);

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

  // handle column header clicks
  const handleColumnHeaderClick = (columnName) => {
    if (selectedColumn === columnName) {
      setSelectedColumn(null);
    } else {
      setSelectedColumn(columnName);
    }
  };

  /* ------ ADD RECORD -------*/
  const [openAdd, setOpenAdd] = useState(false);
  const [newRecord, setNewRecord] = useState("");
  const [columnNameAdd, setColumnNameAdd] = useState("");

  const handleOpenAdd = () => {
    console.log("POST modal open");
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setNewRecord("");
    setColumnNameAdd("");
    setOpenAdd(false);
  };

  /* ------ EDIT & DELETE COMMON VARIABLES -------*/
  const [editOrDeleteOpen, setEditOrDeleteOpen] = useState(false);

  const handleOpenEditOrDelete = () => {
    setEditOrDeleteOpen(true);
  };

  const handleCloseEditOrDelete = () => {
    setEditOrDeleteOpen(false);
  };

  /* ------ EDIT CELL -------*/
  const [fetchEdit, setFetchEdit] = useState(false);

  /* ------ DELETE CELL -------*/
  const [fetchDelete, setFetchDelete] = useState(false);

  useEffect(() => {
    fetchRecords();
    setFetchEdit(false);
  }, [fetchEdit, fetchDelete]);

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
                <TableCell
                  align="right"
                  sx={{ color: selectedColumn === "column1" ? "orangered" : "#90caf9" }}
                  onClick={() => handleColumnHeaderClick("column1")}
                >
                  Column 1
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: selectedColumn === "column2" ? "orangered" : "#90caf9" }}
                  onClick={() => handleColumnHeaderClick("column2")}
                >
                  Column 2
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: selectedColumn === "column3" ? "orangered" : "#90caf9" }}
                  onClick={() => handleColumnHeaderClick("column3")}
                >
                  Column 3
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: selectedColumn === "column4" ? "orangered" : "#90caf9" }}
                  onClick={() => handleColumnHeaderClick("column4")}
                >
                  Column 4
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: selectedColumn === "column5" ? "orangered" : "#90caf9" }}
                  onClick={() => handleColumnHeaderClick("column5")}
                >
                  Column 5
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    backgroundColor: selectedRow === rowIndex ? "orangered" : "inherit",
                  }}
                >
                  <TableCell
                    key={`${rowIndex}-_id`}
                    align="left"
                    sx={{
                      minWidth: 150,
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#90caf9",
                        color: "rgba(0,0,0,0.7)",
                      },
                    }}
                    onClick={() => {
                      dispatch(selectRecordAction(row));
                      setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
                    }}
                  >
                    {row._id}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      dispatch(selectCellAction({ _id: row._id, column1: row.column1 }));
                      //  setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
                      handleOpenEditOrDelete();
                    }}
                    key={`${rowIndex}-column1`}
                    align="right"
                    sx={{
                      minWidth: 150,
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
                    onClick={() => {
                      // dispatch(selectRecordAction(row));
                      dispatch(selectCellAction({ _id: row._id, column2: row.column2 }));
                      // setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
                      handleOpenEditOrDelete();
                    }}
                    key={`${rowIndex}-column2`}
                    align="right"
                    sx={{
                      minWidth: 150,
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
                    onClick={() => {
                      // dispatch(selectRecordAction(row));
                      dispatch(selectCellAction({ _id: row._id, column3: row.column3 }));
                      // setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
                      handleOpenEditOrDelete();
                    }}
                    key={`${rowIndex}-column3`}
                    align="right"
                    sx={{
                      minWidth: 150,
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
                    onClick={() => {
                      // dispatch(selectRecordAction(row));
                      dispatch(selectCellAction({ _id: row._id, column4: row.column4 }));
                      // setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
                      handleOpenEditOrDelete();
                    }}
                    key={`${rowIndex}-column4`}
                    align="right"
                    sx={{
                      minWidth: 150,
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
                    onClick={() => {
                      // dispatch(selectRecordAction(row));
                      dispatch(selectCellAction({ _id: row._id, column5: row.column5 }));
                      // setSelectedRow(selectedRow === rowIndex ? null : rowIndex);
                      handleOpenEditOrDelete();
                    }}
                    key={`${rowIndex}-column5`}
                    align="right"
                    sx={{
                      minWidth: 150,
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
        <AddRecordModal
          openAdd={openAdd}
          handleCloseAdd={handleCloseAdd}
          handleOpenAdd={handleOpenAdd}
          newRecord={newRecord}
          setNewRecord={setNewRecord}
          columnNameAdd={columnNameAdd}
          setColumnNameAdd={setColumnNameAdd}
        />

        <Divider orientation="horizontal" sx={{ width: "100%", marginBottom: 2 }} />
        <Tooltip title="Download table" placement="right-end">
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginBottom: 2,
              backgroundColor: "#90caf9",
              minWidth: "80%",
            }}
          >
            <DownloadIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Delete table" placement="right-end">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "orangeRed",
              minWidth: "100%",
            }}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
      </Box>
      <EditOrDeleteModal
        editOrDeleteOpen={editOrDeleteOpen}
        handleCloseEditOrDelete={handleCloseEditOrDelete}
        setFetchDelete={setFetchDelete}
        setFetchEdit={setFetchEdit}
      />
    </Box>
  );
}
export default RecordsTable;
