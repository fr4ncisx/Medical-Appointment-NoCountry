import { Box } from "@mui/material";
import { CustomTableV2 } from "@ui/CustomTableV2/CustomTableV2";
import { DatosDiagnosticoRows } from "./DatosDiagnosticoRows";
import { datos_diagnostico_headers } from "./DATOS_DIAGNOSTICO_TABLE_HEADERS";

export const DatosDiagnosticoContent = () => {

    return (
        <Box>
            <CustomTableV2 headers={datos_diagnostico_headers} >
                <DatosDiagnosticoRows />
            </CustomTableV2>
        </Box>
    )
}