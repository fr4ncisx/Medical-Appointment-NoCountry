import { useTableContext } from "@context/table.context";
import RemoveIcon from '@mui/icons-material/Remove';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { IconButton, TableCell, TableRow } from "@mui/material";
import { CitasData } from "@tipos/backendTypes";
import { useModalStore } from "@store/modal.store";
import { formatDate } from "@utils/date/formatDate";

export const CitasRows = () => {
    const { dataRows, loadingTableRows } = useTableContext();
    const setModalData = useModalStore(state => state.setModalData);

    const handleCancelar = (id: number) => {
        setModalData({
            showModal: true,
            title: "",
            operation: "delete_appointment",
            data: { id }
        })
    }

    const handleReprogramar = (id: number, date: string, time: string, visitReason: string) => {
        setModalData({
            showModal: true,
            title: "Reprogramar Cita",
            operation: "update_appointment",
            data: { id, date, time, visitReason }
        });
    }

    return (
        <>
            {
                dataRows.map(({id, date, time, status, medic, visitReason}: CitasData) => (
                    status != "CANCELADA" && (
                        <TableRow key={id}>
                            <TableCell align="center">{formatDate(date, "yyyy-MM-dd", "dd/MM/yyyy")}</TableCell>
                            <TableCell align="center">{time}</TableCell>
                            <TableCell align="center">{medic.name} {medic.lastname}</TableCell>
                            <TableCell align="center">
                                <IconButton sx={{fontSize: "0.8em", textTransform: "none", marginRight: "8px", backgroundColor: "#d50000"}} onClick={() => handleCancelar(id)} disabled={loadingTableRows}><RemoveIcon /></IconButton>
                                <IconButton sx={{fontSize: "0.8em", textTransform: "none", backgroundColor: "#FEB20E"}} onClick={() => handleReprogramar(id, date, time, visitReason)}><ScheduleIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                    )
                ))
            }
        </>
    )
}