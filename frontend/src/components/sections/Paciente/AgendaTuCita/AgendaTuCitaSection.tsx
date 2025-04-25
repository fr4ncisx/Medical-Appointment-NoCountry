import { useState, FormEvent } from "react";
import "cally";
import { Box, Typography } from '@mui/material';
import { AgendaCSStyles, AgendaTuCitaStyles } from "./AgendaTuCitaStyles";
import { CustomButton } from '@ui/CustomButton/CustomButton';
import { Form } from "@ui/Form/Form";
import { agendaSchema, agendaUiSchema } from "./agendaSchema";
import { CustomError } from "@tipos/types";
import { useUserStore } from "@store/user.store";
import { AgendarCitaInput } from "@tipos/backendTypes";
import { addAppointment } from "@services/patient/addAppointment";

const FormInitialData = {
    specialty: "",
    selectorMedicos: { medic: "" },
    time: "",
    visitReason: "",
};

export const AgendaTuCitaSection = () => {
    const [data, setData] = useState<AgendarCitaInput>(FormInitialData);
    const [error, setError] = useState<CustomError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(false);
    const [date, setDate] = useState<string>("");
    const [citaAgendada, setCitaAgendada] = useState<boolean>(false);
    const getToken = useUserStore(state => state.getToken);
    const patientId = useUserStore(state => state.userData?.id);

    const handleChange = ({ data, errors }: { data: any, errors: any }) => {
        setError(null);
        setLoading(false);
        setData(data);
        if(date !== "") {
            setDisable(false);
        }
        if (errors.length !== 0) {
            setDisable(true);
            setError({ type: "input", description: "entrada invalida en formulario para agendar tu cita" })
        } 
    }

    const handleCalendarChange = (event: Event) => {
        const target = event.target as any;
        setDate(target.value);
        if(data !== FormInitialData){
            setDisable(false);
        }
        setLoading(false);
        setError(null);
    }

    if(!data && date == ""){
        setDisable(true);
    } 

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        if (data || date !== "") {
            const response = await addAppointment({data, date, setError, getToken, patientId});
            if(response !== null){
                setCitaAgendada(true);
                setLoading(false);
            } else{
                setError({ type: "input", description: "seleccionar otro día u horario" })
            }
        } 
    }


    return (
        <Box sx={AgendaTuCitaStyles.container}>
            <Typography variant="h3" sx={AgendaTuCitaStyles.title}>Agendá tu cita</Typography>

            <form method="POST" onSubmit={handleSubmit} style={AgendaCSStyles.formCalendar}>
                <Box sx={AgendaTuCitaStyles.form}>
                    <Form schema={agendaSchema} uiSchema={agendaUiSchema} data={data} onChange={handleChange} />
                    {
                    error?.description == "seleccionar otro día u horario"
                        ? (
                            <Typography variant="body2" textAlign="center" sx={{ color: "#e85c5c", fontWeight: "bold" }}>
                            No se pudo agendar su cita, intente eligiendo otro día u horario
                            </Typography>
                        )
                        : error || data === FormInitialData || date == ""
                        ? (
                        <Typography variant="body2" textAlign="center" sx={{ color: "#e85c5c", fontWeight: "bold" }}>
                            Por favor, asegurese de completar todos los campos y seleccionar una fecha
                        </Typography>
                        )
                        : citaAgendada
                        ? (
                            <Typography variant="body2" textAlign="center" sx={{ color: "#2ecc71", fontWeight: "bold" }}>
                            Su cita se agendó con éxito
                            </Typography>
                        )
                        : (
                            <Typography variant="body2" textAlign="center" sx={{ color: "#726969", fontWeight: "bold" }}>
                            Asegurese de seleccionar una fecha en el calendario
                            </Typography>
                        )
                    }

                    <CustomButton
                        type="submit"
                        sx={{ marginTop: "1rem" }}
                        loading={loading}
                        loadingIndicator="Cargando…"
                        disabled={disable}
                    >
                        <Typography textTransform="none">Agendá tu cita</Typography>
                    </CustomButton>
                </Box>

                <Box sx={AgendaTuCitaStyles.calendar}>
                    <calendar-date onchange={(e) => handleCalendarChange(e)}>
                        <svg style={AgendaCSStyles.svg} aria-label="Previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...{ slot: "previous" }}>
                            <path style={AgendaCSStyles.path} d="M15.75 19.5 8.25 12l7.5-7.5"></path>
                        </svg>
                        <svg style={AgendaCSStyles.svg} aria-label="Next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...{ slot: "next" }}>
                            <path style={AgendaCSStyles.path} d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                        </svg>
                        <calendar-month ></calendar-month>
                    </calendar-date>
                </Box>
            </form>
        </Box>
    )
}