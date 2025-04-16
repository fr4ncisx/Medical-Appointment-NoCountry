import { Box, Typography } from "@mui/material";
import { DetailsStyle } from "./DetailsStyle";
import { SECTIONS } from "./SECTIONS";
import { Section } from "./Section";

export const Details = () => {
  return (
    <Box sx={DetailsStyle.rightContainer}>
      <Typography variant="h4" sx={DetailsStyle.sectionTitle}>
        Nuestra prioridad es la salud de nuestros clientes
      </Typography>
      {
        SECTIONS.map(section => (
          <Section {...section} />
        ))
      }
    </Box>
  );
};
