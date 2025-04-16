import { Box, Typography } from "@mui/material";
import { AgendarCitaButton } from "./AgendarCitaButton";

export const MainBox = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "650px",
        backgroundColor: "#DADADA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        width={"min-content"}
        gap={"2em"}
      >
        <Box>
          <Typography
            fontSize={"clamp(1em, 10vw, 4em)"}
            lineHeight="1"
            margin="0"
            fontWeight="bold"
            color={"#185D3B"}
          >
            Bienvenido a MedicalAppointment
          </Typography>
          <Typography
            variant="h5"
            fontSize={"clamp(.5em, 10vw, 1.5em)"}
            mt={"1rem"}
            color={"#198751"}
          >
            Agenda tu cita cuando quieras o donde quieras
          </Typography>
        </Box>
        <Box>
          <AgendarCitaButton />
        </Box>
      </Box>
    </Box>
  );
};
