import { getMedicosDisponibles } from "@services/medic/getMedicosDisponibles";
import { useUserStore } from "@store/user.store";
import { useQuery } from "@tanstack/react-query";
import { Gender, Provincia, Speciality } from "@tipos/backendTypes";
import { ReactNode, useState } from "react";
import {
  MedicosDisponiblesContext,
  MedicosDisponiblesContextType,
} from "./medicos_disponibles.context";

export interface MedicosDisponiblesParams {
  children: ReactNode;
}

export const MedicosDisponiblesProvider = ({
  children,
}: MedicosDisponiblesParams) => {
  const [specializationFilter, setSpecializationFilter] =
    useState<Speciality | "">("");
  const [genderFilter, setGenderFilter] = useState<Gender | "">("");
  const [stateFilter, setStateFilter] = useState<Provincia | "">("");
  const token = useUserStore((state) => state.getToken)();

  const handleChangeSpecialization = (specialization: Speciality) =>
    setSpecializationFilter(specialization);
  const handleChangeGender = (gender: Gender) => setGenderFilter(gender);
  const handleChangeState = (state: Provincia) => setStateFilter(state);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "medicos-disponibles",
      specializationFilter || "without-specialization",
      genderFilter || "without-gender",
      stateFilter || "without-state",
    ],
    queryFn: () =>
      getMedicosDisponibles(
        token,
        specializationFilter,
        genderFilter,
        stateFilter
      ),
      retry: 1
  });

  const handleCleanFilters = () => {
    setStateFilter("");
    setSpecializationFilter("");
    setGenderFilter("");
  }

  const value: MedicosDisponiblesContextType = {
    medicos: data,
    loading: isLoading,
    error,
    genderFilter,
    specializationFilter,
    stateFilter,
    handleChangeGender,
    handleChangeSpecialization,
    handleChangeState,
    handleCleanFilters
  };

  return (
    <MedicosDisponiblesContext value={value}>
      {children}
    </MedicosDisponiblesContext>
  );
};
