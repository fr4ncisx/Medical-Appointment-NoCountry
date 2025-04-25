import { AppointmentResponse } from "@tipos/backendTypes";
import { CustomError } from "@tipos/types";
import { handleError } from "@utils/handleError";
import { Dispatch, SetStateAction } from "react";

interface Params {
    token: string,
    data: AppointmentResponse | undefined,
    setError: Dispatch<SetStateAction<CustomError>>,
    patientId: string | undefined,
}

export const updateCitasPaciente = async ({token, data, setError, patientId}: Params) => {
    const UPDATE_APPOINTMENT_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/appointments/update/${patientId}`;
    const updateCitaInput = {
        date: data?.date,
        time: data?.time || "",
        visitReason: data?.visitReason || ""
    };
    const params: RequestInit = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        },
        body: JSON.stringify(updateCitaInput),
    }
    const responseUpdateAppointment = await fetch(UPDATE_APPOINTMENT_URL, params)
        .then(async (response) => {
            if(!response.ok) {
                if(response.status === 403){
                    throw new Error(`${response.status}: cors`);
                } else{
                    const responseBody = await response.json();
                    throw new Error(`${response.status}: ${responseBody.error || responseBody.ERROR}`);
                }
            }
            return await response.json()
        })
        .then((response) => {
            return response;
        })
        .catch((e) => {
            const error = handleError(e);
            setError(error);
            return null;
        })
    return responseUpdateAppointment;
}