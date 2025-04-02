import { ReactNode, useCallback, useEffect, useState } from "react"
import { ScheduleContext, ScheduleContextType } from "./schedule.context"
import { ScheduleData } from "@tipos/backendTypes";
import { getSchedules } from "@services/schedule/getSchedules";
import { CustomError } from "@tipos/types";
import { useUserStore } from "@store/user.store";

interface ContextProps {
    children: ReactNode
}

export const ScheduleContextProvider = ({ children }: ContextProps) => {
    const [schedules, setSchedules] = useState<ScheduleData[]>([]);
    const [loadingSchedules, setLoadingSchedules] = useState(false);
    const [errorSchedules, setErrorSchedules] = useState<CustomError>(null);
    const medicoId = useUserStore(state => state.getUserId)();
    const token = useUserStore(state => state.getToken)();

    const fetchSchedules = useCallback(() => {
        setErrorSchedules(prevState => null);
        getSchedules({ medicoId, token, setSchedules, setLoading: setLoadingSchedules, setError: setErrorSchedules });
    }, []);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const initValues: ScheduleContextType = {
        schedules,
        loadingSchedules,
        errorSchedules,
        fetchSchedules
    }

    return <ScheduleContext value={initValues}>{children}</ScheduleContext>
}