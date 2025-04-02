import { ScheduleData } from "@tipos/backendTypes";
import { CustomError } from "@tipos/types";
import { createContext, useContext } from "react";

const initValue: ScheduleContextType = {
    schedules: [],
    loadingSchedules: false,
    errorSchedules: null,
    fetchSchedules: () => {}
}

export interface ScheduleContextType {
    schedules: ScheduleData[]
    loadingSchedules: boolean
    errorSchedules: CustomError
    fetchSchedules: () => void
}

export const ScheduleContext = createContext<ScheduleContextType>(initValue);

export const useScheduleContext = () => {
    const context = useContext(ScheduleContext);
    if (!context) {
        throw new Error("el hook useScheduleContext se debe usar dentro de ScheduleContextProvider");
    }
    return context;
}