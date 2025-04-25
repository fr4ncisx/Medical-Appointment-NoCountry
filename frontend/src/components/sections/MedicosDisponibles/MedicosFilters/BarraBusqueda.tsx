import { Box, TextField } from "@mui/material";
import { CustomInputLabel } from "./CustomInputLabel";

export const BarraBusqueda = () => {
    return (
        <Box>
            <CustomInputLabel label="Buscar" />
            <TextField placeholder="Buscar medico...." variant="outlined" fullWidth />
        </Box>
    );
}