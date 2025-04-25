import { CustomButton } from "@ui/CustomButton/CustomButton";
import { useNavigate } from "react-router";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const AgendarCitaButton = () => {
    const navigate = useNavigate();
    const handleAgendarCita = () => {
        navigate("/paciente/agendar-cita");
    }

    return (
        <CustomButton startIcon={<CalendarMonthIcon />} onClick={handleAgendarCita} sx={{textTransform: "none"}}>
            Agendar cita
        </CustomButton>
    )
}