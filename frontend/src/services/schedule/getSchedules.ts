import { ScheduleData } from "@tipos/backendTypes"
import { CustomError } from "@tipos/types"
import { handleError } from "@utils/handleError"
import { Dispatch, SetStateAction } from "react"

interface Params {
    medicoId: string
    token: string
    setSchedules: Dispatch<SetStateAction<ScheduleData[]>>
    setLoading: Dispatch<SetStateAction<boolean>>
    setError: Dispatch<SetStateAction<CustomError>>
}

export const getSchedules = ({ medicoId, token, setSchedules, setLoading, setError }: Params) => {
    setLoading(true);
    const SCHEDULE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/schedule/medic/${medicoId}`;
    fetch(SCHEDULE_URL, { method: "GET", headers: { 'Authorization': `${token}` } })
        .then(async (response) => {
            const responseBody = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status}: ${responseBody.error || responseBody.ERROR}`);
            }
            return responseBody;
        })
        .then((result: ScheduleData[]) => setSchedules(result))
        .catch((e) => {
            const error = handleError(e);
            setError(error);
        })
        .finally(() => setLoading(false));
}