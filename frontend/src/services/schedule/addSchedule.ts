import { AgendaFormData } from "@components/sections/Medico/GestionarAgenda/AgendaModalContent/agendaFormSchema"
import { ScheduleData, ScheduleInput } from "@tipos/backendTypes"
import { CustomError } from "@tipos/types"
import { formatDate } from "@utils/date/formatDate"
import { handleError } from "@utils/handleError"
import { Dispatch, SetStateAction } from "react"

interface Params {
    medicoId: string
    token: string
    data: AgendaFormData | undefined,
    setError: Dispatch<SetStateAction<CustomError>>
}

export const addSchedule = async ({ medicoId, data, token, setError }: Params) => {
    const startDateFormated = data?.datePickerWithRange.startDate ? new Date(formatDate(data?.datePickerWithRange.startDate.toString(), "dd/MM/yyyy", "yyyy-MM-dd")) : new Date();
    const endDateFormated = data?.datePickerWithRange.endDate ? new Date(formatDate(data?.datePickerWithRange.endDate.toString(), "dd/MM/yyyy", "yyyy-MM-dd")) : new Date();
    const startTimeFormated = data?.time.startTime ? new Date(data.time.startTime) : new Date();
    const endTimeFormated = data?.time.endTime ? new Date(data.time.endTime) : new Date();

    const scheduleData: ScheduleInput = {
        startDate: startDateFormated,
        endDate: endDateFormated,
        startTime: startTimeFormated.toTimeString().split(' ')[0],
        endTime: endTimeFormated.toTimeString().split(' ')[0]
    };
    const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/schedule/${medicoId}`;
    const params: RequestInit = {
        method: "POST",
        headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),
    }
    const response = await fetch(API_URL, params)
        .then(async (response) => {
            const responseBody = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status}: ${responseBody.error || responseBody.ERROR}`);
            }
            return responseBody;
        })
        .then((response: ScheduleData) => response)
        .catch((e) => {
            const error = handleError(e);
            setError(error);
        });
    return response;
}