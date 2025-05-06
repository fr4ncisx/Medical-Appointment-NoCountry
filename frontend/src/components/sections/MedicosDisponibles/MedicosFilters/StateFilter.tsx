import { useMedicosDisponibles } from "@context/medicos_disponibles.context";
import {
  SelectChangeEvent,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Provincia } from "@tipos/backendTypes";
import { CustomInputLabel } from "./CustomInputLabel";
import { Option } from "@tipos/component";

const options: Option[] = [
  { label: "Buenos Aires", value: "BUENOS_AIRES" },
  { label: "Catamarca", value: "CATAMARCA" },
  { label: "Chaco", value: "CHACO" },
  { label: "Chubut", value: "CHUBUT" },
  { label: "Córdoba", value: "CORDOBA" },
  { label: "Corrientes", value: "CORRIENTES" },
  { label: "Entre Ríos", value: "ENTRE_RIOS" },
  { label: "Formosa", value: "FORMOSA" },
  { label: "Jujuy", value: "JUJUY" },
  { label: "La Pampa", value: "LA_PAMPA" },
  { label: "La Rioja", value: "LA_RIOJA" },
  { label: "Mendoza", value: "MENDOZA" },
  { label: "Misiones", value: "MISIONES" },
  { label: "Neuquén", value: "NEUQUEN" },
  { label: "Río Negro", value: "RIO_NEGRO" },
  { label: "Salta", value: "SALTA" },
  { label: "San Juan", value: "SAN_JUAN" },
  { label: "San Luis", value: "SAN_LUIS" },
  { label: "Santa Cruz", value: "SANTA_CRUZ" },
  { label: "Santa Fe", value: "SANTA_FE" },
  { label: "Santiago del Estero", value: "SANTIAGO_DEL_ESTERO" },
  { label: "Tierra del Fuego", value: "TIERRA_DEL_FUEGO" },
  { label: "Tucumán", value: "TUCUMAN" },
  {
    label: "Ciudad Autónoma de Buenos Aires",
    value: "CIUDAD_AUTONOMA_BUENOS_AIRES",
  },
];

export const StateFilter = () => {
  const { stateFilter, handleChangeState } = useMedicosDisponibles();

  const onChange = (event: SelectChangeEvent) => {
    const value = event.target.value as Provincia;
    handleChangeState(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <CustomInputLabel label="Provincia" />
      <FormControl fullWidth>
        <Select labelId="select_state" id="select_state" onChange={onChange} value={stateFilter}>
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
