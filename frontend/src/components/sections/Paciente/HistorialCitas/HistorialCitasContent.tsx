import { Box } from "@mui/material";
import { CustomTableV2 } from "@ui/CustomTableV2/CustomTableV2";
import { HistorialCitasRows } from "./HistorialCitasRows";
import { historial_citas_headers } from "./HISTORIAL_CITAS_TABLE_HEADERS";

export const HistorialCitasContent = () => {

    return (
        <Box>
            <CustomTableV2 headers={historial_citas_headers} >
                <HistorialCitasRows />
            </CustomTableV2>
        </Box>
    )
}