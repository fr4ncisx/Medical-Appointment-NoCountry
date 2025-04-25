import { CustomTableV2 } from "@ui/CustomTableV2/CustomTableV2";
import { citas_headers } from "./CITAS_TABLE_HEADERS";
import { CitasRows } from "./CitasRows";

export const CitasContent = () => {
    return (
        <CustomTableV2 headers={citas_headers}>
            <CitasRows />
        </CustomTableV2>
    );
}