import React from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./logo/Logo";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo />
          </Link>
        </Typography>
        <Tabs value={false} aria-label="nav tabs example">
          <Tab label="Home" component={Link} to="/" style={{ textDecoration: "none", color: "inherit" }} />
          <Tab label="Table" component={Link} to="/table" style={{ textDecoration: "none", color: "inherit" }} />
          <Tab label="PDF" component={Link} to="/pdf" style={{ textDecoration: "none", color: "inherit" }} />
          <Tab label="Login" component={Link} to="/login" style={{ textDecoration: "none", color: "inherit" }} />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
