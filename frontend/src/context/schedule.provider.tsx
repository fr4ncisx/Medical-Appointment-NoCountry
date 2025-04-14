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
        setErrorSchedules(_prevState => null);
        getSchedules({ medicoId, token, setSchedules, setLoading: setLoadingSchedules, setError: setErrorSchedules });
    }, []);

    const addEditedItem = (editedItem: ScheduleData) => {
        removeItem(editedItem.id);
        const newSchedules = schedules.map((schedule) => {
            if (schedule.id === editedItem.id) {
                return editedItem;
            }
            return schedule;
        });
        setSchedules(newSchedules);
    }

    const addItem = (newItem: ScheduleData) => {
        setErrorSchedules(_prevState => null);
        setSchedules([...schedules, newItem]);
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