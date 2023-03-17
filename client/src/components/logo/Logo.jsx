import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

const Logo = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/besedo.png" sx={{ width: 50, height: 50 }} />
    </Stack>
  );
};
export default Logo;
