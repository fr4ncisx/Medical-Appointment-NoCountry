import { useModalStore } from "@store/modal.store";
import { AgendaFormData, agendaFormSchema, agendaFormUiSchema } from "./agendaFormSchema";
import { useState } from "react";
import { CustomError } from "@tipos/types";
import { useUserStore } from "@store/user.store";
import { useScheduleContext } from "@context/schedule.context";
import { showSonnerToast } from "@utils/showSonnerToast";
import { Box, Typography } from "@mui/material";
import { Form } from "@ui/Form/Form";
import { SubmitButton } from "@ui/SubmitButton/SubmitButton";
import { editSchedule } from "@services/schedule/editSchedule";
import { initScheduleFormData } from "@utils/init-functions/initScheduleFormData";

export const EditScheduleForm = () => {
    const { itemData } = useModalStore(state => state.modalData.data);
    const initialData = initScheduleFormData(itemData);
    const [dataForm, setDataForm] = useState<AgendaFormData>(initialData);
    const [error, setError] = useState<CustomError>(null);
    const [loading, setLoading] = useState(false);
    const { fetchSchedules } = useScheduleContext();
    const token = useUserStore((state) => state.getToken)();
    const closeModal = useModalStore(state => state.closeModal);
    
    const handleChange = ({ data, errors }: { data: any, errors: any[] }) => {
        setDataForm(data);
        const existErrors = errors.length !== 0
            || (dataForm?.datePickerWithRange?.startDate === null || dataForm?.datePickerWithRange?.endDate === null)
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
        const response = await editSchedule({ scheduleId: itemData.id.toString(), token, data: dataForm, setError });
        if (response) {
            showSonnerToast({
                title: response.status,
                description: "Se edito correctamente el horario",
                type: "success"
            });
            fetchSchedules();
            closeModal();
        }
        setLoading(false);
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Box display="flex" flexDirection="column" gap="1rem">
                <Box display="flex" flexDirection="column" gap="2rem">
                    <Form schema={agendaFormSchema} uiSchema={agendaFormUiSchema} data={dataForm} onChange={handleChange} />
                    {
                        error?.type === "fetch" && <Typography color="error" textAlign="center">{error.description}</Typography>
                    }
                </Box>
                <SubmitButton label="Editar Horario" error={error} loading={loading} handleOnClick={handleSubmit} />
            </Box>
        </form>
    );
}