import { SectionWrapper } from "@components/layout/SectionWrapper";
import { MEDIC_LINKS } from "../MEDIC_LINKS";
import { GestionarAgendaContent } from "./GestionarAgendaContent";

export const GestionarAgenda = () => {
    return (
        <SectionWrapper sideBarItems={MEDIC_LINKS}>
            <GestionarAgendaContent />
        </SectionWrapper>
    );
}