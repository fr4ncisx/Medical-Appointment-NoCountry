import { Box, Typography, useMediaQuery } from "@mui/material";
import { DetailsStyle } from "./DetailsStyle";
import { SECTIONS } from "./SECTIONS";
import { Section } from "./Section";

export const Details = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  return (
    <Box
      sx={{
        ...DetailsStyle.rightContainer,
        flexGrow: isMobile ? "1" : "0",
        width: isMobile ? "100%" : "50%",
      }}
    >
      <Typography
        variant="h4"
        sx={{ ...DetailsStyle.sectionTitle, height: isMobile ? "150px" : "100px" }}
        fontSize="2.1em"
        fontWeight="bold"
      >
        Nuestra prioridad es la salud de nuestros clientes
      </Typography>
      {SECTIONS.map((section, index) => (
        <Section key={index} {...section} />
      ))}
    </Box>
  );
};
