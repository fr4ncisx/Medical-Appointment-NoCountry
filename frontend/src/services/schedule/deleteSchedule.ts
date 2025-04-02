import { CustomError } from "@tipos/types";
import { handleError } from "@utils/handleError";
import { Dispatch, SetStateAction } from "react";

interface Params {
    scheduleId: string
    token: string
    setError: Dispatch<SetStateAction<CustomError>>
}

export const deleteSchedule = async ({ scheduleId, token, setError }: Params) => {
    const DELETE_SCHEDULE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/schedule/${scheduleId}`;
    const response = fetch(DELETE_SCHEDULE_URL, { method: "DELETE", headers: { 'Authorization': `${token}` } })
        .then(async (response) => {
            const responseBody = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status}: ${responseBody.error || responseBody.ERROR}`);
            }
            return responseBody;
        })
        .then((result) => result)
        .catch((e) => {
            const error = handleError(e);
            setError(error);
        });
    return response;
}