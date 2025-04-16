import { AgendaFormData } from "@components/sections/Medico/GestionarAgenda/AgendaModalContent/agendaFormSchema";
import { ScheduleData } from "@tipos/backendTypes";
import { formatDate } from "@utils/date/formatDate";
import { timeStringToDate } from "@utils/time/timeStringToDate";

export const initScheduleFormData = (itemData: ScheduleData) => {
    const startDateFormated = formatDate(itemData.startDate, "yyyy-MM-dd", "dd/MM/yyyy");
    const endDateFormated = formatDate(itemData.endDate, "yyyy-MM-dd", "dd/MM/yyyy");
    
    const initialData: AgendaFormData = {
        dateRange: {
            startDate: startDateFormated,
            endDate: endDateFormated
        },
        time: {
            startTime: timeStringToDate(itemData.startTime),
            endTime: timeStringToDate(itemData.endTime)
        }
    };
    return initialData;
}