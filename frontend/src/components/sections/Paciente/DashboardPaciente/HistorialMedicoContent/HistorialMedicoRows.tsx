import { useTableContext } from "@context/table.context";
import { TableCell, TableRow } from "@mui/material";
import { CitasPasadasData } from "@tipos/backendTypes";
import { formatDate } from "@utils/date/formatDate";

export const HistorialMedicoRows = () => {
    const { dataRows } = useTableContext();
    console.log(dataRows);

    return (
        <>
            {
                dataRows.map((citasPasadas: CitasPasadasData) => {
                    const {id, recordDate, medicalHistory} = citasPasadas;
                    return(
                        <TableRow key={id}>
                            <TableCell align="center">{formatDate(recordDate, "yyyy-MM-dd", "dd/MM/yyyy")}</TableCell>
                            <TableCell align="center">{medicalHistory}</TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    )
}