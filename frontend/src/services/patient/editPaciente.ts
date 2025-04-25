import { PacienteEditFormData } from "@components/sections/Admin/Form/Paciente/EditPacienteMenu/pacienteEditFormSchema";
import { Gender, PacienteEditInput } from "@tipos/backendTypes";
import { CustomError } from "@tipos/types"
import { formatDate } from "@utils/date/formatDate";
import { handleError } from "@utils/handleError";
import { Dispatch, SetStateAction } from "react"

interface Params {
    patientId: number
    token: string
    data: PacienteEditFormData | undefined,
    setError: Dispatch<SetStateAction<CustomError>>
}

export const editPaciente = async ({ patientId, token, data, setError }: Params) => {
    const PACIENTE_EDIT_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/patient/${patientId}`;
    const birthDateFormated = data?.date.date && formatDate(data?.date.date, "dd/MM/yyyy", "yyyy-MM-dd");
    const pacienteInput: PacienteEditInput = {
        firstName: data?.first_name || "",
        lastName: data?.last_name || "",
        birthDate: birthDateFormated || "",
        gender: data?.gender.gender as Gender,
        phone: data?.phone || "",
        address: data?.address || "",
        emergencyContactInfo: data?.emergency_contact_info || "",
    }
    const params: RequestInit = {
        method: "PUT",
        headers: {
            'Authorization': `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pacienteInput),
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