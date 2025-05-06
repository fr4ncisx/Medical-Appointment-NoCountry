import { Gender, MedicoData, Provincia, Speciality } from "@tipos/backendTypes";
import { createContext, useContext } from "react";

export interface MedicosDisponiblesContextType {
  medicos: MedicoData[] | undefined;
  loading: boolean;
  error: Error | null;
  specializationFilter: Speciality | "";
  genderFilter: Gender | "";
  stateFilter: Provincia | "";
  handleChangeSpecialization: (specialization: Speciality) => void;
  handleChangeGender: (gender: Gender) => void;
  handleChangeState: (state: Provincia) => void;
  handleCleanFilters: () => void;
}

const initiValue: MedicosDisponiblesContextType = {
  medicos: undefined,
  loading: false,
  error: null,
  specializationFilter: "",
  genderFilter: "",
  stateFilter: "",
  handleChangeGender: () => {},
  handleChangeSpecialization: () => {},
  handleChangeState: () => {},
  handleCleanFilters: () => {},
};

export const MedicosDisponiblesContext =
  createContext<MedicosDisponiblesContextType>(initiValue);

export const useMedicosDisponibles = () => {
  const context = useContext(MedicosDisponiblesContext);
  if (!context) {
    throw new Error(
      "useMedicosDisponibles must be inside MedicosDisponiblesProvider component"
    );
  }
  return context;
};
