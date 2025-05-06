import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  label: string;
}

export const Filtro = ({ label }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: ".5em",
        backgroundColor: "#DDFBEB",
        borderRadius: "1.5rem",
        cursor: "pointer",
        border: "1px solid #198751",
        "&:hover": { backgroundColor: "#19875125" },
      }}
    >
      <Typography color="primary" variant="body2">
        {label}
      </Typography>
      <CloseIcon color="info" />
    </Box>
  );
};
