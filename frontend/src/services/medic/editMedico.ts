import { MedicoEditFormData } from "@components/sections/Admin/Form/Medico/EditMedicoMenu/medicoEditFormSchema";
import { Gender, MedicoEditInput, Provincia, Speciality } from "@tipos/backendTypes";
import { CustomError } from "@tipos/types";
import { handleError } from "@utils/handleError";
import { Dispatch, SetStateAction } from "react";

interface Params {
    medicoId: number
    token: string
    data: MedicoEditFormData | undefined,
    setError: Dispatch<SetStateAction<CustomError>>
}

export const editMedico = async ({ medicoId, token, data, setError }: Params) => {
    const PACIENTE_EDIT_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/medic/${medicoId}`;
    const medicoInput: MedicoEditInput = {
        name: data?.first_name || "",
        lastname: data?.last_name || "",
        phone: data?.phone || "",
        description: data?.description || "",
        gender: data?.gender as Gender,
        speciality: data?.speciality as Speciality,
        state: data?.state as Provincia
    }
    const params: RequestInit = {
        method: "PUT",
        headers: {
            'Authorization': `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(medicoInput),
    }
    const response = await fetch(PACIENTE_EDIT_URL, params)
        .then(async (response) => {
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error(`${response.status}: cors`);
                } else {
                    const responseBody = await response.json();
                    throw new Error(`${response.status}: ${responseBody.error || responseBody.ERROR}`);
                }
            }
            return await response.json()
        })
        .then((response: {status: string}) => response.status)
        .catch((e) => {
            const error = handleError(e);
            setError(error);
            return null;
        })
    return response;
}