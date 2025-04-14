import { TableCell, TableRow } from "@mui/material";
import { CitasPasadasData } from "@tipos/backendTypes";

export const HistMedicRows = ({citasPasadas}: {citasPasadas: CitasPasadasData[]}) => {
    return (
        <>
            {
                citasPasadas.map(({ id, recordDate, medicalHistory }) => (
                    <TableRow
                        key={id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="center">{recordDate}</TableCell>
                        <TableCell align="center">{medicalHistory}</TableCell>
                    </TableRow>
                ))
            }
        </>
    );
}