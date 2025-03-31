import { Box, Button } from "@mui/material";
import { CustomInputLabel } from "./CustomInputLabel";
import { Filtro } from "./Filtro";

export const FiltrosSelected = () => {
    const count = 4;
    const filters = ["Hombre", "Neurología", "Buenos Aires"];
    return (
        <Box mb="2rem">
            <Box display="flex" justifyContent="space-between" sx={{ mb: ".5rem", "& > *": { width: "fit-content" } }}>
                <CustomInputLabel label={`Filtros (${count})`} />
                <Button variant="text" color="error" sx={{ textTransform: "none", padding: "0" }}>
                    Limpiar
                </Button>
            </Box>
            <Box display="flex" flexWrap="wrap" gap=".5rem">
                {
                    filters.map((item,index) => (
                        <Filtro key={index} label={item} />
                    ))
                }
            </Box>
        </Box>
    );
}