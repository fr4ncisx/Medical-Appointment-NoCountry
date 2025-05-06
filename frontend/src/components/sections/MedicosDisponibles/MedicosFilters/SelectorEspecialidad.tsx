import {
    Box,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { Option } from "@tipos/component";
import { CustomInputLabel } from "./CustomInputLabel";
import { useMedicosDisponibles } from "@context/medicos_disponibles.context";
import { Speciality } from "@tipos/backendTypes";

const options: Option[] = [
  { label: "Clínica", value: "CLINICA" },
  { label: "Cardiología", value: "CARDIOLOGIA" },
  { label: "Neurología", value: "NEUROLOGIA" },
  { label: "Psiquiatría", value: "PSIQUIATRIA" },
  { label: "Psicología", value: "PSICOLOGIA" },
  { label: "Nutrición", value: "NUTRICION" },
  { label: "Dermatología", value: "DERMATOLOGIA" },
  { label: "Ginecología", value: "GINECOLOGIA" },
];

export const SelectorEspecialidad = () => {
  const { specializationFilter, handleChangeSpecialization } =
    useMedicosDisponibles();

  const onChange = (event: SelectChangeEvent) => {
    const value = event.target.value as Speciality;
    handleChangeSpecialization(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <CustomInputLabel label="Especialidades" />
      <FormControl fullWidth>
        <Select
          labelId="select_especialidades"
          id="select_especialidades"
          onChange={onChange}
          value={specializationFilter}
        >
          <MenuItem value="">
            <em>Ninguna</em>
          </MenuItem>
          {options.map(({ value, label }: Option, index: number) => (
            <MenuItem key={index} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
