import { TableContextProvider } from "@context/table.provider";
import { getPacienteArchivos } from "@services/patient/getPacienteArchivos";
import { HistorialMedicoContent } from "./HistorialMedicoContent";
import { Box } from "@mui/material";
import { TabsPaciente } from "@tipos/component";
import { TabStyles } from "../TabStyles";
import { CustomButton } from "@ui/CustomButton/CustomButton";
import { useUserStore } from "@store/user.store";

interface Props {
    handleChangeTab: (tab: TabsPaciente) => void
}

export const TabHistorialMedico = ({handleChangeTab}: Props) => {
    const idPaciente = useUserStore(state => state.userData?.id);

    return (
        <TableContextProvider fetchRows={getPacienteArchivos} idForEndpoint={idPaciente}>
            <Box sx={TabStyles.container}>
                <CustomButton onClick={() => handleChangeTab("citas")} sx={TabStyles.tab}>
                    Tabla de Citas
                </CustomButton>
                <CustomButton onClick={() => handleChangeTab("historial_medico")} sx={{ ...TabStyles.tab, backgroundColor: "#198751", color: "#f1f1f1" }}>
                    Tabla de Historial Médico
                </CustomButton>
            </Box>
            <HistorialMedicoContent />
        </TableContextProvider>
    );
}