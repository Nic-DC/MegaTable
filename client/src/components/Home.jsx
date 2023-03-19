import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Logo from "./logo/Logo";
import { Tooltip } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GenerateTableModal from "./Modal/GenerateTableModal";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Home() {
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // MODAL
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: expanded ? "100vh" : "auto",
        boxSizing: "border-box",
        marginTop: "5%",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <Logo />
            </IconButton>
          }
          title="Costea Dan Nicolaie"
          subheader="Besedo test"
        />
        <CardMedia component="img" height="250" image="/mt.png" alt="mt logo" />
        <CardContent></CardContent>
        <CardActions disableSpacing>
          <Tooltip title="Current table">
            <Button variant="contained" color="primary" onClick={() => navigate("/table")} sx={{ mr: 2 }}>
              <TableChartIcon />
            </Button>
          </Tooltip>
          <Button variant="contained" color="secondary" onClick={handleOpen} sx={{ mr: 2 }}>
            Add Rows
          </Button>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
            <Typography
              variant="body2"
              color="text.secondary"
              component="span"
              sx={{ fontSize: "1rem", fontWeight: "bold" }}
            >
              Specs
            </Typography>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ maxHeight: "50vh", overflowY: "auto" }}>
            <Typography paragraph>* MERN stack, Redux, Material UI</Typography>
            <Typography paragraph>* Server: CRUD operations for cell and record</Typography>
            <Typography paragraph>* Client: Modals, Pagination</Typography>
          </CardContent>
        </Collapse>
      </Card>
      <GenerateTableModal open={open} handleClose={handleClose} />
    </div>
  );
}

export default Home;
