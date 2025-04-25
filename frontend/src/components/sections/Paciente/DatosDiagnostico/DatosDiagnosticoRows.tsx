import { useTableContext } from "@context/table.context";
import { TableRow, TableCell } from "@mui/material";
import { CitasPasadasData } from "@tipos/backendTypes";
import { formatDate } from "@utils/date/formatDate";

export const DatosDiagnosticoRows = () => {
    const { dataRows } = useTableContext();

    return (
        <>
            {
                dataRows.map((citasPasadas: CitasPasadasData) => {
                    const { id, recordDate, diagnosis } = citasPasadas;
                    return (
                        <TableRow key={id}>
                            <TableCell align="center">{formatDate(recordDate, "yyyy-MM-dd", "dd/MM/yyyy")}</TableCell>
                            <TableCell align="center">{diagnosis}</TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    )
}