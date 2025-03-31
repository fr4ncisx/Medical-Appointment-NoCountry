import { SectionWrapper } from "@components/layout/SectionWrapper";
import { MEDIC_LINKS } from "../MEDIC_LINKS";
import { TableContextProvider } from "@context/table.provider";
import { useUserStore } from "@store/user.store";
import { getMedicAppointments } from "@services/medic/getMedicAppointments";
import { HistorialMedicoContent } from "./HistorialMedicoContent";

export const HistorialCitas = () => {
    const idUser = useUserStore(state => state.userData?.id);
    return (
        <SectionWrapper sideBarItems={MEDIC_LINKS}>
            <TableContextProvider fetchRows={getMedicAppointments} idForEndpoint={idUser}>
                <HistorialMedicoContent />
            </TableContextProvider>
        </SectionWrapper>
    );
}