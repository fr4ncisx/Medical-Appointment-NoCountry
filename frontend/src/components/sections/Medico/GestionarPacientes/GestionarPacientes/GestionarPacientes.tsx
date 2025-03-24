import { MEDIC_LINKS } from "../../MEDIC_LINKS";
import { SectionWrapper } from "@components/layout/SectionWrapper";
import { GestionarPacientesContent } from "./GestionarPacientesContent";
import { TableContextProvider } from "@context/table.provider";
import { getPacientes } from "@services/patient/getPacientes";

export const GestionarPacientes = () => {
    return (
        <SectionWrapper sideBarItems={MEDIC_LINKS}>
            <TableContextProvider fetchRows={getPacientes}>
                <GestionarPacientesContent />
            </TableContextProvider>
        </SectionWrapper>
    );
}