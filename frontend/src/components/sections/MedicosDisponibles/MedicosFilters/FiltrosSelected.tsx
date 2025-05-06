import { Box, Button, capitalize } from "@mui/material";
import { CustomInputLabel } from "./CustomInputLabel";
import { Filtro } from "./Filtro";
import { useMedicosDisponibles } from "@context/medicos_disponibles.context";
import { Provincia } from "@tipos/backendTypes";

export const FiltrosSelected = () => {
  const {
    genderFilter,
    specializationFilter,
    stateFilter,
    handleCleanFilters,
  } = useMedicosDisponibles();
  const filters: string[] = [];
  if (genderFilter) {
    filters.push(genderFilter === "MALE" ? "Hombre" : "Mujer");
  }
  if (specializationFilter) {
    filters.push(capitalize(specializationFilter.toLocaleLowerCase()));
  }
  if (stateFilter in Provincia) {
    const value = Provincia[stateFilter as keyof typeof Provincia];
    filters.push(value);
  }
  return filters.length > 0 ? (
    <Box mb="2rem">
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ mb: ".5rem", "& > *": { width: "fit-content" } }}
      >
        <CustomInputLabel label={`Filtros (${filters.length})`} />
        <Button
          variant="text"
          color="error"
          sx={{ textTransform: "none", padding: "0" }}
          onClick={handleCleanFilters}
        >
          Limpiar
        </Button>
      </Box>
      <Box display="flex" flexWrap="wrap" gap=".5rem">
        {filters.map((item, index) => (
          <Filtro key={index} label={item!} />
        ))}
      </Box>
    </Box>
  ) : null;
};
