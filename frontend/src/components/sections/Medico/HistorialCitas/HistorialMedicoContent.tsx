import { Box, Typography } from "@mui/material";
import { CustomTableV2 } from "@ui/CustomTableV2/CustomTableV2";
import { historial_citas_headers } from "./HISTORIAL_CITAS_HEADERS";
import { HistorialCitasRows } from "./HistorialCitasRows";

export const HistorialMedicoContent = () => {
    return(
        <Box>
            <Typography variant="h5" gutterBottom color="primary" sx={{ letterSpacing: "4px"}}>
                Citas actuales
            </Typography>
            <CustomTableV2 headers={historial_citas_headers}>
                <HistorialCitasRows />
            </CustomTableV2>
        </Box>
    );
}