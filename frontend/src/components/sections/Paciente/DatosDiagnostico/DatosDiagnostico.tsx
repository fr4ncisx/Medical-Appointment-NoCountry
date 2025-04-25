import { SectionWrapper } from "@components/layout/SectionWrapper";
import { TableContextProvider } from "@context/table.provider";
import { getPacienteArchivos } from "@services/patient/getPacienteArchivos";
import { PATIENT_LINKS } from "../PATIENT_LINKS";
import { DatosDiagnosticoContent } from "./DatosDiagnosticoContent";
import { useUserStore } from "@store/user.store";

export const DatosDiagnostico = () => {
    const idPaciente = useUserStore(state => state.userData?.id);

    return (
        <>
            <SectionWrapper sideBarItems={PATIENT_LINKS}>
                <TableContextProvider fetchRows={getPacienteArchivos} idForEndpoint={idPaciente}>
                    <DatosDiagnosticoContent />
                </TableContextProvider>
            </SectionWrapper>
        </>
    )
}