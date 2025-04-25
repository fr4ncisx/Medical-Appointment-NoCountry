import { useTableContext } from "@context/table.context";
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import { MedicalRecordData } from "@tipos/backendTypes";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { formatDate } from "@utils/date/formatDate";
import { useModalStore } from "@store/modal.store";

export const HistorialMedicoRows = () => {
    const { dataRows } = useTableContext();
    const setModalData = useModalStore(state => state.setModalData);

    const handleShowDetails = (data: MedicalRecordData) => {
        setModalData({
            showModal: true,
            title: "",
            operation: "medical_record_details",
            data: { itemData: data }
        });
    }

    return (
        <>
            {
                dataRows.map((medication: MedicalRecordData) => {
                    const { id, diagnosis, recordDate, treatment } = medication;
                    return (
                        <TableRow
                            key={id}
                        >
                            <TableCell align="center">{diagnosis}</TableCell>
                            <TableCell align="center">{treatment}</TableCell>
                            <TableCell align="center">{formatDate(recordDate, "yyyy-MM-dd", "dd/MM/yyyy")}</TableCell>
                            <TableCell align="center" sx={{ display: "flex", gap: "1rem" }}>
                                <Tooltip title="Detalles">
                                    <IconButton color="warning" onClick={() => handleShowDetails(medication)}>
                                        <ListAltIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    );
                }
                )
            }
        </>
    );
}