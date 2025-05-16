import { Gender, MedicoData, Provincia, Speciality } from "@tipos/backendTypes";

export const getMedicosDisponibles = async (
  token: string,
  specialization: Speciality | "",
  gender: Gender | "",
  state: Provincia | ""
): Promise<MedicoData[]> => {
  try {
    const filters = [];
    if (state || gender || specialization) {
      if (state) {
        filters.push(`state=${state}`);
      }
      if (gender) {
        filters.push(`gender=${gender}`);
      }
      if (specialization) {
        filters.push(`speciality=${specialization}`);
      }
    }
    const MEDICOS_URL =
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/medic` +
      "?".concat(filters.join("&"));
    const response = await fetch(MEDICOS_URL, {
      method: "GET",
      headers: { Authorization: `${token}` },
    });
    const medicosDisponibles = await response.json();
    if (!response.ok) {
      if (medicosDisponibles?.ERROR) {
        throw new Error(medicosDisponibles.ERROR);
      }
      // Mensaje genérico si no hay info adicional
      throw new Error("Error al obtener médicos disponibles");
    }

    if (!medicosDisponibles.medics) {
      throw new Error("Formato inesperado en la respuesta del servidor");
    }
    return medicosDisponibles.medics;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
