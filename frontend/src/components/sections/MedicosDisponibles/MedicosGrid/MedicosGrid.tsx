import { MedicCard } from "./MedicCard";
import { Grid2 } from "@mui/material";
import { GridLoading } from "./GridLoading";
import { GridError } from "./GridError";
import { useMedicosDisponibles } from "@context/medicos_disponibles.context";

export const MedicosGrid = () => {
  const { medicos, loading, error } = useMedicosDisponibles();

  if (loading) {
    return <GridLoading />;
  }

  if (error) {
    return <GridError description={error.message} />;
  }
  
  return (
    <Grid2 container spacing={1} columns={{ xs: 12, sm: 12, md: 12 }}>
      {medicos && medicos.map((doctor) => (
        <MedicCard key={doctor.id} doctor={doctor} />
      ))}
    </Grid2>
  );
};
