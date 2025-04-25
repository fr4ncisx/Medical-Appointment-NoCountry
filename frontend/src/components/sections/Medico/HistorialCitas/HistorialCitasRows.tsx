import { useTableContext } from "@context/table.context";
import { TableRow, TableCell } from "@mui/material";

export const HistorialCitasRows = () => {
    const { dataRows } = useTableContext();
    return (
        <>
            {
                dataRows.map(({ id, fecha, hora, paciente }) => (
                    <TableRow key={id}>
                        <TableCell align="center">{fecha}</TableCell>
                        <TableCell align="center">{hora}</TableCell>
                        <TableCell align="center">{paciente}</TableCell>
                    </TableRow>
                ))
            }
        </>
    );
}