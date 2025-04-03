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

    const addEditedItem = (editedItem: ScheduleData) => {
        removeItem(editedItem.id);
        addItem(editedItem);
    }

    const addItem = (newItem: ScheduleData) => {
        const newSchedules = schedules.map((schedule) => {
            if(schedule.id === newItem.id){
                return newItem;
            }
            return schedule;
        });
        setSchedules(newSchedules);
    }

    const removeItem = (idAEliminar: number) => {
        setSchedules(prevData => {
            const newData = [...prevData];
            const index = newData.findIndex(item => item.id === idAEliminar);
            if (index !== -1) {
                newData.splice(index, 1);
            }
            return newData;
        });
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    const initValues: ScheduleContextType = {
        schedules,
        loadingSchedules,
        errorSchedules,
        fetchSchedules,
        removeItem,
        addItem,
        addEditedItem
    }

    return <ScheduleContext value={initValues}>{children}</ScheduleContext>
}