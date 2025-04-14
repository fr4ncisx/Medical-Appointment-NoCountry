import { Button, TableCell, TableRow } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { CitasData } from "@tipos/backendTypes";
import { useUserStore } from "@store/user.store";

export const CitasRows = ({citas}: {citas: CitasData[]}) => {
    const getToken = useUserStore(state => state.getToken);

    const handleCancelar = (id: number) => {
        const token = getToken();
        try{
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/appointments/cancel/${id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `${token}`,}})
        } catch{
            console.error("Error al cancelar la cita:", Error);
        }
        
    }

    const handleReprogramar = (_id: number) => {
        // TODO eliminar paciente
    }
    return (
        <>
            {
                citas.filter((cita) => cita.status !== 'CANCELADA').map(({ id, date, time, medic }) => (
                        <TableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                                <TableCell align="center">{date}</TableCell>
                                <TableCell align="center">{time}</TableCell>
                                <TableCell align="center">{medic.name} {medic.lastname}</TableCell>
                                <TableCell align="center">
                                    <Button startIcon={<RemoveIcon />} sx={{fontSize: "0.8em", textTransform: "none", marginRight: "8px"}} variant="contained" color="error" disableElevation onClick={() => handleCancelar(id)}>Cancelar</Button>
                                    <Button startIcon={<ScheduleIcon />} sx={{fontSize: "0.8em", textTransform: "none", backgroundColor: "#FEB20E"}} variant="contained" disableElevation onClick={() => handleReprogramar(id)}>Reprogramar</Button>
                                </TableCell>
                        </TableRow>
                ))
            }
        </>
    );
}