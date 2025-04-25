import { useTableContext } from "@context/table.context";
import { TableRow, TableCell } from "@mui/material";
import { CitasData } from "@tipos/backendTypes";
import { formatDate } from "@utils/date/formatDate";

export const HistorialCitasRows = () => {
    const { dataRows } = useTableContext();

    return(
        <>
            {
                dataRows.map((citas: CitasData) => {
                    const {id, time, date, medic, status} = citas;
                    return (
                        <TableRow key={id}>
                            <TableCell align="center">{formatDate(date, "yyyy-MM-dd", "dd/MM/yyyy")}</TableCell>
                            <TableCell align="center">{time}</TableCell>
                            <TableCell align="center">{medic.name} {medic.lastname}</TableCell>
                            <TableCell align="center">{status === "CONFIRMADA" ? "Confirmada" : "Cancelada"}</TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    )
}