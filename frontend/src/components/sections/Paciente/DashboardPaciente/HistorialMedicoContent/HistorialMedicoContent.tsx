import { CustomTableV2 } from "@ui/CustomTableV2/CustomTableV2";
import { historialmedico_headers } from "./HISTORIALMEDICO_TABLE_HEADERS";
import { HistorialMedicoRows } from "./HistorialMedicoRows";

export const HistorialMedicoContent = () => {
    return (
        <CustomTableV2 headers={historialmedico_headers}>
            <HistorialMedicoRows />
        </CustomTableV2>
    );
}