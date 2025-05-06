import { Gender, MedicoData, Provincia, Speciality } from "@tipos/backendTypes";

export const getMedicosDisponibles = async (
  token: string,
  specialization: Speciality | "",
  gender: Gender | "",
  state: Provincia | ""
): Promise<MedicoData[]> => {
  try {
    const MEDICOS_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/medic`;
    const response = await fetch(MEDICOS_URL, {
      method: "GET",
      headers: { Authorization: `${token}` },
    });
    if (!response.ok) {
      throw new Error("Failed on retrieve medicos disponibles list");
    }
    const medicosDisponibles = await response.json();
    return medicosDisponibles.medics;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
