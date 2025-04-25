import { SectionWrapper } from "@components/layout/SectionWrapper";
import { TableContextProvider } from "@context/table.provider";
import { getCitasPaciente } from "@services/patient/getCitasPaciente";
import { PATIENT_LINKS } from "../PATIENT_LINKS";
import { HistorialCitasContent } from "./HistorialCitasContent";
import { useUserStore } from "@store/user.store";

export const HistorialCitas = () => {
    const idPaciente = useUserStore(state => state.userData?.id);

    return (
        <>
            <SectionWrapper sideBarItems={PATIENT_LINKS}>
                <TableContextProvider fetchRows={getCitasPaciente} idForEndpoint={idPaciente}>
                    <HistorialCitasContent />
                </TableContextProvider>
            </SectionWrapper>
        </>
    )
}