import { MedicosResponse } from "@tipos/backendTypes";
import { Parameters } from "@tipos/types";
import { handleError } from "@utils/handleError";

export const getMedicos = ({ token, setDataRows, setLoading, setError }: Parameters) => {
    setLoading(true);
    const MEDICOS_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/medic`;
    fetch(MEDICOS_URL, { method: "GET", headers: { 'Authorization': `${token}` } })
        .then(async (response) => {
            const responseBody = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status}: ${responseBody.error || responseBody.ERROR}`);
            }
            return responseBody;
        })
        .then((result: MedicosResponse) => {
            setDataRows(result.medics);
        })
        .catch((e) => {
            const error = handleError(e);
            setDataRows([]);
            setError(error);
        })
        .finally(() => setLoading(false));
}