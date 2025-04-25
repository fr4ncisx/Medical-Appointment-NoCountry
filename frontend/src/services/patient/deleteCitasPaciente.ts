import { CustomError } from "@tipos/types";
import { handleError } from "@utils/handleError";
import { Dispatch, SetStateAction } from "react";

interface Params {
    pacienteId: string
    token: string
    setError: Dispatch<SetStateAction<CustomError>>
}

export const deleteCitasPaciente = async ({pacienteId, token, setError}: Params) => {
    const DELETE_MEDICAPPOINTMENTS_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointments/cancel/${pacienteId}`;
    const response = fetch(DELETE_MEDICAPPOINTMENTS_URL, { method: "PUT", headers: {'Authorization': `${token}`} })
    .then(async (response) => {
        const responseBody = await response.json();
        if(!response.ok){
            throw new Error(`${response.status}: ${responseBody.error || responseBody.ERROR}`);
        }
        return responseBody;
    })
    .then((result) => result)
    .catch((e) => {
        const error = handleError(e);
        setError(error);
    })
    return response;
}