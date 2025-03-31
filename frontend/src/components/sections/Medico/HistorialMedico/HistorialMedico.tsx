import { SectionWrapper } from "@components/layout/SectionWrapper";
import { TableContextProvider } from "@context/table.provider";
import { useParams } from "react-router";
import { MEDIC_LINKS } from "../MEDIC_LINKS";
import { getMedicalRecords } from "@services/medical-records/getMedicalRecords";
import { HistorialMedicoContent } from "./HistorialMedicoContent";

export const HistorialMedico = () => {
    const id: string = useParams().id || "";

    return (
        <SectionWrapper sideBarItems={MEDIC_LINKS}>
            <TableContextProvider fetchRows={getMedicalRecords} idForEndpoint={id}>
                <HistorialMedicoContent />
            </TableContextProvider>
        </SectionWrapper>
    );
}