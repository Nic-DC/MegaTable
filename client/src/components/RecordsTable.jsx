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

import DownloadIcon from "@mui/icons-material/Download";

import { useDispatch } from "react-redux";
import { selectRecordAction, selectCellAction } from "../redux/actions";
// import AddCellModal from "./Modal/AddCellModal";
import EditOrDeleteModal from "./Modal/EditOrDeleteModal";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import TableChartIcon from "@mui/icons-material/TableChart";
import EditOrDeleteRecordModal from "./Modal/EditOrDeleteRecordModal";
import AddRecordModal from "./Modal/AddRecordModal";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import DescriptionIcon from "@mui/icons-material/Description";

const RecordsTable = () => {
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const endpoint = process.env.REACT_APP_BE_URL;

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
      const response = await fetch(`${endpoint}?page=${page}`);

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

  /* ------ ADD CELL -------*/
  // const [openAdd, setOpenAdd] = useState(false);
  // const [newCell, setNewCell] = useState("");
  // const [columnNameAdd, setColumnNameAdd] = useState("");

  // const handleOpenAdd = () => {
  //   console.log("POST modal open");
  //   setOpenAdd(true);
  // };

  // const handleCloseAdd = () => {
  //   setNewCell("");
  //   setColumnNameAdd("");
  //   setOpenAdd(false);
  // };

  const [fetchAdd, setFetchAdd] = useState(false);

  /* ------ ADD RECORD -------*/
  const [openAddRecord, setOpenAddRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    column1: "",
    column2: "",
    column3: "",
    column4: "",
    column5: "",
  });

  const handleOpenAddRecord = () => {
    console.log("POST modal open");
    setOpenAddRecord(true);
  };

  const handleCloseAddRecord = () => {
    setNewRecord("");

    setOpenAddRecord(false);
  };

  function ColorBadge({ totalRecords }) {
    return (
      <Tooltip title="Total Rows" placement="left">
        <Stack spacing={2} direction="row">
          <Badge
            badgeContent={totalRecords}
            color="secondary"
            max={1000}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
              marginRight: 3,
            }}
          >
            <TableChartIcon color="action" />
          </Badge>
        </Stack>
      </Tooltip>
    );
  }

  function TotalPagesBadge({ totalPages }) {
    return (
      <Tooltip title="Total Pages" placement="right">
        <Stack spacing={2} direction="row">
          <Badge
            badgeContent={totalPages}
            color="secondary"
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <DescriptionIcon color="action" />
          </Badge>
        </Stack>
      </Tooltip>
    );
  }

  const handleDownloadPdf = async () => {
    try {
      const response = await fetch(`${endpoint}/pdf`);

      if (!response.ok) {
        throw new Error("Network response was not ok. Failed to DOWNLOAD PDF");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "records.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

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
    setFetchAdd(false);
    fetchRecords();
    setFetchEdit(false);
    setFetchDelete(false);
    setFetchEditRecord(false);
    setFetchDeleteRecord(false);
  }, [fetchAdd, fetchEdit, fetchDelete, fetchEditRecord, fetchDeleteRecord]);

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
              {/* <AddCellModal
                openAdd={openAdd}
                handleCloseAdd={handleCloseAdd}
                handleOpenAdd={handleOpenAdd}
                newCell={newCell}
                setNewCell={setNewCell}
                columnNameAdd={columnNameAdd}
                setColumnNameAdd={setColumnNameAdd}
                setFetchAdd={setFetchAdd}
              /> */}
              <AddRecordModal
                openAddRecord={openAddRecord}
                handleCloseAddRecord={handleCloseAddRecord}
                handleOpenAddRecord={handleOpenAddRecord}
                newRecord={newRecord}
                setNewRecord={setNewRecord}
              />

              <Tooltip title="Download table" placement="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownloadPdf}
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
          <Box display="flex" alignItems="center">
            <ColorBadge totalRecords={totalRecords} />
            <TotalPagesBadge totalPages={Math.ceil(totalRecords / rowsPerPage)} />{" "}
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell
                  align="right"
                  sx={{ color: selectedColumn === "column1" ? "#90caf9" : "orangered" }}
                  onClick={() => handleColumnHeaderClick("column1")}
                >
                  Column 1
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: selectedColumn === "column2" ? "#90caf9" : "orangered" }}
                  onClick={() => handleColumnHeaderClick("column2")}
                >
                  Column 2
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: selectedColumn === "column3" ? "#90caf9" : "orangered" }}
                  onClick={() => handleColumnHeaderClick("column3")}
                >
                  Column 3
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: selectedColumn === "column4" ? "#90caf9" : "orangered" }}
                  onClick={() => handleColumnHeaderClick("column4")}
                >
                  Column 4
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: selectedColumn === "column5" ? "#90caf9" : "orangered" }}
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
                      dispatch(selectCellAction({ _id: row._id, column2: row.column2 }));

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
                      dispatch(selectCellAction({ _id: row._id, column3: row.column3 }));

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
                      dispatch(selectCellAction({ _id: row._id, column4: row.column4 }));

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
                      dispatch(selectCellAction({ _id: row._id, column5: row.column5 }));

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

        <Box mt={2} display="flex" justifyContent="center">
          <Tooltip title="First page">
            <span>
              <IconButton disabled={page === 1} onClick={(event) => handlePageChange(event, 1)}>
                <FirstPageIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Previous page">
            <span>
              <IconButton disabled={page === 1} onClick={(event) => handlePageChange(event, page - 1)}>
                <NavigateBeforeIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Typography sx={{ alignSelf: "center" }}>{page}</Typography>
          <Tooltip title="Next page">
            <span>
              <IconButton
                disabled={page === Math.ceil(totalRecords / rowsPerPage)}
                onClick={(event) => handlePageChange(event, page + 1)}
              >
                <NavigateNextIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Last page">
            <span>
              <IconButton
                disabled={page === Math.ceil(totalRecords / rowsPerPage)}
                onClick={(event) => handlePageChange(event, Math.ceil(totalRecords / rowsPerPage))}
              >
                <LastPageIcon />
              </IconButton>
            </span>
          </Tooltip>
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
};
export default RecordsTable;
