import { Box, Typography } from "@mui/material";
import { BackButton } from "@ui/BackButton/BackButton";
import { CustomTableV2 } from "@ui/CustomTableV2/CustomTableV2";
import { historial_medico_headers } from "./HISTORIAL_MEDICO_HEADERS";
import { HistorialMedicoRows } from "./HistorialMedicoRows";

export const HistorialMedicoContent = () => {
    return (
        <Box>
            <BackButton url="/medico/gestionar-pacientes" />
            <Typography variant="h5" gutterBottom color="primary" sx={{ letterSpacing: "4px" }}>
                Administrar Medicamentos
            </Typography>
            <CustomTableV2 headers={historial_medico_headers}>
                <HistorialMedicoRows />
            </CustomTableV2>
        </Box>
    );
}