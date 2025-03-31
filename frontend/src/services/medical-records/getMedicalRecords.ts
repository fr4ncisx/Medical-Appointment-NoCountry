import { MedicalRecordData } from "@tipos/backendTypes";
import { Parameters } from "@tipos/types";
import { handleError } from "@utils/handleError";

export const getMedicalRecords = ({ token, setDataRows, setLoading, setError, idForEndpoint: pacienteId }: Parameters) => {
    setLoading(true);
    const HISTORIAL_MEDICO_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/records/${pacienteId}`;
    fetch(HISTORIAL_MEDICO_URL, { method: "GET", headers: { 'Authorization': `${token}` } })
        .then(async (response) => {
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error(`${response.status}: cors`);
                } else {
                    const responseBody = await response.json();
                    throw new Error(`${response.status}: ${responseBody.error || responseBody.ERROR}`);
                }
            }
            return await response.json();
        })
        .then((result: MedicalRecordData[]) => {
            setDataRows(result);
        })
        .catch((e) => {
            const error = handleError(e);
            setDataRows([]);
            setError(error);
        })
        .finally(() => setLoading(false));
}