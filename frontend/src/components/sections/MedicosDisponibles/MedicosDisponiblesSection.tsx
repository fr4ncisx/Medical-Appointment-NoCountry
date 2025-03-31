import { Box, Container, Grid2, Typography } from "@mui/material";
import { MedicosGrid } from "./MedicosGrid/MedicosGrid";
import { MedicosFilters } from "./MedicosFilters/MedicosFilters";

export const MedicosDisponiblesSection = () => {
    return (
        <Container sx={{
            width: "100%",
            height: "100%",
            margin: "4rem auto"
        }}>
            <Box margin="4rem 0" textAlign="center" sx={{ color: "#5a5353" }}>
                <Typography variant="h3" fontWeight="bold">
                    Busca un doctor, agenda tu cita
                </Typography>
                <Typography variant="body1" sx={{ color: "#726969" }}>
                    Los mejores doctores se adaptan a tus necesidades y horarios
                </Typography>
            </Box>
            <Grid2 container columnGap={4}>
                <MedicosFilters />
                <Grid2 size="grow">
                    <MedicosGrid />
                </Grid2>
            </Grid2>
        </Container>
    );
};
