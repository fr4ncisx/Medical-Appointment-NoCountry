import { TableContextProvider } from "@context/table.provider";
import { getCitasPaciente } from "@services/patient/getCitasPaciente";
import { CitasContent } from "./CitasContent";
import { Box } from "@mui/material";
import { TabsPaciente } from "@tipos/component";
import { TabStyles } from "../TabStyles";
import { CustomButton } from "@ui/CustomButton/CustomButton";
import { useUserStore } from "@store/user.store";
import { AgendarCitaButton } from "./AgendarCitaButton";
import CustomModal from "@ui/CustomModal/CustomModal";
import { PacienteFormContent } from "../../Form/PacienteFormContent";
import { useModalStore } from "@store/modal.store";

interface Props {
    handleChangeTab: (tab: TabsPaciente) => void
}

export const TabCitas = ({handleChangeTab}: Props) => {
    const idPaciente = useUserStore(state => state.userData?.id);
    const showModal = useModalStore((state) => state.modalData.showModal);

    return (
        <TableContextProvider fetchRows={getCitasPaciente} idForEndpoint={idPaciente}>
            <Box sx={TabStyles.container}>
                <CustomButton onClick={() => handleChangeTab("citas")} sx={{...TabStyles.tab, backgroundColor: "#198751", color: "#f1f1f1" }}>
                    Tabla de Citas
                </CustomButton>
                <CustomButton onClick={() => handleChangeTab("historial_medico")} sx={TabStyles.tab}>
                    Tabla de Historial médico
                </CustomButton>
                <Box sx={{marginLeft: "auto", marginBottom: "5px"}}>
                    <AgendarCitaButton />
                </Box>
            </Box>
            <CitasContent />
            {
                showModal && (
                    <CustomModal>
                        <PacienteFormContent />
                    </CustomModal>
                )
            }
        </TableContextProvider>
    );
}