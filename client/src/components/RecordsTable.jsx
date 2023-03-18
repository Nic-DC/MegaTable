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
  PaginationItem,
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
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import TableChartIcon from "@mui/icons-material/TableChart";
import EditOrDeleteRecordModal from "./Modal/EditOrDeleteRecordModal";

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

  function ColorBadge({ totalRecords }) {
    return (
      <Tooltip title="Total Rows" placement="right">
        <Stack spacing={2} direction="row">
          <Badge
            badgeContent={totalRecords}
            color="secondary"
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <TableChartIcon color="action" />
          </Badge>
        </Stack>
      </Tooltip>
    );
  }

  /* ------ EDIT & DELETE CELL SHARED VARIABLES -------*/
  const [editOrDeleteOpen, setEditOrDeleteOpen] = useState(false);

  const handleOpenEditOrDelete = () => {
    setEditOrDeleteOpen(true);
  };

  const handleCloseEditOrDelete = () => {
    setEditOrDeleteOpen(false);
  };

  /* EDIT CELL -------*/
  const [fetchEdit, setFetchEdit] = useState(false);

  /* DELETE CELL -------*/
  const [fetchDelete, setFetchDelete] = useState(false);

  /* ------ EDIT & DELETE RECORD SHARED VARIABLES -------*/
  const [editOrDeleteRecordOpen, setEditOrDeleteRecordOpen] = useState(false);

  const handleOpenEditOrDeleteRecord = () => {
    setEditOrDeleteRecordOpen(true);
  };

  const handleCloseEditOrDeleteRecord = () => {
    setEditOrDeleteRecordOpen(false);
  };

  /* ------ EDIT CELL -------*/
  const [fetchEditRecord, setFetchEditRecord] = useState(false);

  /* ------ DELETE CELL -------*/
  const [fetchDeleteRecord, setFetchDeleteRecord] = useState(false);

  useEffect(() => {
    fetchRecords();
    setFetchEdit(false);
    setFetchDelete(false);
    setFetchEditRecord(false);
    setFetchDeleteRecord(false);
  }, [fetchEdit, fetchDelete, fetchEditRecord, fetchDeleteRecord]);

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Box>
            <Box display="flex" alignItems="center">
              <AddRecordModal
                openAdd={openAdd}
                handleCloseAdd={handleCloseAdd}
                handleOpenAdd={handleOpenAdd}
                newRecord={newRecord}
                setNewRecord={setNewRecord}
                columnNameAdd={columnNameAdd}
                setColumnNameAdd={setColumnNameAdd}
              />
              <Tooltip title="Download table" placement="right">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginLeft: 1,
                    backgroundColor: "orangeRed",
                  }}
                >
                  <DownloadIcon />
                </Button>
              </Tooltip>
            </Box>
          </Box>

          <ColorBadge totalRecords={totalRecords} />
        </Box>
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
                    backgroundColor:
                      selectedRow === rowIndex
                        ? "orangered"
                        : rowIndex % 2 === 0
                        ? "rgba(0,0,0,0.3)"
                        : "rgba(0,0,0,0.1)",
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
                      handleOpenEditOrDeleteRecord();
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
          <IconButton disabled={page === 1} onClick={(event) => handlePageChange(event, page - 1)}>
            <NavigateBeforeIcon />
          </IconButton>
          <Typography sx={{ alignSelf: "center" }}>{page}</Typography>
          <IconButton
            disabled={page === Math.ceil(totalRecords / rowsPerPage)}
            onClick={(event) => handlePageChange(event, page + 1)}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
      <EditOrDeleteRecordModal
        editOrDeleteRecordOpen={editOrDeleteRecordOpen}
        handleCloseEditOrDeleteRecord={handleCloseEditOrDeleteRecord}
        setFetchEditRecord={setFetchEditRecord}
        setFetchDeleteRecord={setFetchDeleteRecord}
      />

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
