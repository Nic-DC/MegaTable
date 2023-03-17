import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecordsTable from "./components/RecordsTable";
import Navbar from "./components/Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<RecordsTable />} />
          {/* Add other routes for table, pdf, and login here */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
