import { Box, Typography } from "@mui/material";
import { Form } from "@ui/Form/Form";
import { useState } from "react";
import { CustomError } from "@tipos/types";
import { AgendaFormData, agendaFormSchema, agendaFormUiSchema } from "./agendaFormSchema";
import { SubmitButton } from "@ui/SubmitButton/SubmitButton";
import { showSonnerToast } from "@utils/showSonnerToast";
import { useModalStore } from "@store/modal.store";
import { useUserStore } from "@store/user.store";
import { addSchedule } from "@services/schedule/addSchedule";
import { useScheduleContext } from "@context/schedule.context";

export const AgendaForm = () => {
    const [dataForm, setDataForm] = useState<AgendaFormData>();
    const [error, setError] = useState<CustomError>(null);
    const [loading, setLoading] = useState(false);
    const closeModal = useModalStore(state => state.closeModal);
    const token = useUserStore((state) => state.getToken)();
    const medicoId = useUserStore(state => state.getUserId)();
    const { addItem } = useScheduleContext();

    const handleChange = ({ data, errors }: { data: any, errors: any[] }) => {
        setDataForm(data);
        const existErrors = errors.length !== 0
            || (dataForm?.dateRange?.startDate === null || dataForm?.dateRange?.endDate === null)
            || (dataForm?.time?.startTime === null || dataForm?.time?.endTime === null);
        if (existErrors) {
            setError({ type: "input", description: "entrada invalida en formulario" })
        } else {
            setError(null);
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        const response = await addSchedule({ medicoId, token, data: dataForm, setError });
        if (response) {
            showSonnerToast({
                title: "Horario Agregado",
                description: "Se añadio el horario correctamente",
                type: "success"
            });
            addItem(response);
            closeModal();
        }
        setLoading(false);
    }
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                }}>
                    <Form data={dataForm} schema={agendaFormSchema} uiSchema={agendaFormUiSchema} onChange={handleChange} />
                    {
                        error?.type === "fetch" && <Typography color="error" textAlign="center">{error.description}</Typography>
                    }
                </Box>
                <SubmitButton label="Agregar Horario" error={error} loading={loading} handleOnClick={handleSubmit} />
            </Box>
        </form>
    );
}