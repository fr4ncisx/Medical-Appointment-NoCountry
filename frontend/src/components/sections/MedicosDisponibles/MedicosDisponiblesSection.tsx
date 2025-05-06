import { Box, Container, Grid2, Typography } from "@mui/material";
import { MedicosGrid } from "./MedicosGrid/MedicosGrid";
import { MedicosFilters } from "./MedicosFilters/MedicosFilters";
import { useModalStore } from "@store/modal.store";
import CustomModal from "@ui/CustomModal/CustomModal";
import ModalMenu from "../Welcome/ModalMenu/ModalMenu";
import { MedicosDisponiblesProvider } from "@context/medicos_disponibles.provider";

export const MedicosDisponiblesSection = () => {
  const showModal = useModalStore((state) => state.modalData.showModal);

  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        margin: "4rem auto",
      }}
    >
      <Box margin="4rem 0" textAlign="center" sx={{ color: "#5a5353" }}>
        <Typography variant="h3" fontWeight="bold">
          Busca un doctor, agenda tu cita
        </Typography>
        <Typography variant="body1" sx={{ color: "#726969" }}>
          Los mejores doctores se adaptan a tus necesidades y horarios
        </Typography>
      </Box>
      <Grid2 container spacing={1} columns={{ xs: 12, sm: 12, md: 12 }}>
        <MedicosDisponiblesProvider>
          <MedicosFilters />
          <Grid2 size={{ xs: 12, sm: 8, md: 9 }}>
            <MedicosGrid />
          </Grid2>
        </MedicosDisponiblesProvider>
      </Grid2>
      {showModal && (
        <CustomModal>
          <ModalMenu />
        </CustomModal>
      )}
    </Container>
  );
};
