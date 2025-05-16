import { Box, Typography } from "@mui/material";

export const GridNoResults = () => {
  return (
    <Box textAlign="center" height="calc(100vh - 80px)">
      <Box
        sx={{
          backgroundColor: "#0000ff15",
          borderRadius: "10px",
          padding: "1rem",
        }}
      >
        <Typography color="info" variant="h5">
          Sin resultados
        </Typography>
      </Box>
    </Box>
  );
};
