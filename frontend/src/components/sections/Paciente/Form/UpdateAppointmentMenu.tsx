import { CustomError } from "@tipos/types";
import { Form } from "@ui/Form/Form";
import { useState } from "react";
import { AppointmentResponse } from "@tipos/backendTypes";
import { citasFormSchema, citasFormUiSchema } from "./citasFormSchema";
import { Box, Typography } from "@mui/material";
import { SubmitButton } from "@ui/SubmitButton/SubmitButton";
import { useModalStore } from "@store/modal.store";
import { updateCitasPaciente } from "@services/patient/updateCitasPaciente";
import { showSonnerToast } from "@utils/showSonnerToast";
import { useUserStore } from "@store/user.store";
import { useTableContext } from "@context/table.context";

export const UpdateAppointmentMenu = () => {
    const { refetchRows, handleSetError } = useTableContext();
    const { id: patientId, date: dateActual, time: timeActual, visitReason: visitReasonActual } = useModalStore(state => state.modalData.data);
    const datosActuales = {
        date: dateActual,
        time: timeActual,
        visitReason: visitReasonActual
    }
    const [data, setData] = useState<AppointmentResponse>(datosActuales);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CustomError>(null);
    const closeModal = useModalStore(state => state.closeModal);
    const token = useUserStore(state => state.getToken)();

    const handleChange = ({ data, errors }: { data: any, errors: any[] }) => {
        setData(data);
        if (errors.length !== 0) {
            setError({ type: "input", description: "Entrada invalida en formulario" })
        } else {
            setError(null);
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        handleSetError(null);
        const response = await updateCitasPaciente({ token, data, setError, patientId });
        if (response !== null) {
            const { message } = response;
            showSonnerToast({
                title: message,
                description: "Se ha reprogramado la cita",
                type: "success"
            });
            refetchRows();
            closeModal();
        }
        setLoading(false);
    }

    return(
        <form onSubmit={(e) => e.preventDefault()}>
            <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", width: "500px"}}>
                <Box sx={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                    <Form data={data} onChange={handleChange} schema={citasFormSchema} uiSchema={citasFormUiSchema} />
                    {
                        error?.type === "fetch" && <Typography color="error" textAlign="center">{error.description}</ Typography>
                    }
                </Box>
                <SubmitButton label="Reprogramar cita" error={error} loading={loading} handleOnClick={handleSubmit}/>
            </Box>
        </form>
    )
}