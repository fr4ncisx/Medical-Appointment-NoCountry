import { MedicoData, MedicoResponse } from "@tipos/backendTypes";
import { CustomError } from "@tipos/types";
import { handleError } from "@utils/handleError";
import { Dispatch, SetStateAction } from "react";

interface Params {
    medicoId: string
    token: string
    setMedico: Dispatch<SetStateAction<MedicoData | undefined>>
    setLoading: Dispatch<SetStateAction<boolean>>
    setError: Dispatch<SetStateAction<CustomError>>
}

export const getMedico = ({ medicoId, token, setMedico, setLoading, setError }: Params) => {
    setLoading(true);
    const MEDICO_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/medic/${medicoId}`;
    fetch(MEDICO_URL, { method: "GET", headers: { 'Authorization': `${token}` } })
        .then(async (response) => {
            const responseBody = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status}: ${responseBody.error || responseBody.ERROR}`);
            }
            return responseBody;
        })
        .then((result: MedicoResponse) => {
            setMedico(result.medic);
        })
        .catch((e) => {
            const error = handleError(e);
            setError(error);
        })
        .finally(() => setLoading(false));
}