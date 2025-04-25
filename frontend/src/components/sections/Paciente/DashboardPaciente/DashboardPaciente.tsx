import { ReactNode, useState } from "react";
import { TabCitas } from "./CitasContent/TabCitas";
import { TabHistorialMedico } from "./HistorialMedicoContent/TabHistorialMedico";
import { TabsPaciente } from "@tipos/component";
import { Toaster } from "sonner";
import { SectionWrapper } from "@components/layout/SectionWrapper";
import { PATIENT_LINKS } from "../PATIENT_LINKS";

export const DashboardPaciente = () => {
    const [tab, setTab] = useState<TabsPaciente>("citas");

    const handleChangeTab = (tab: TabsPaciente) => {
        setTab(tab);
    }

    const CONTENT_MAP: Record<TabsPaciente, ReactNode> = {
        citas: <TabCitas handleChangeTab={handleChangeTab} />,
        historial_medico: <TabHistorialMedico handleChangeTab={handleChangeTab} />
    }

    return (
        <>
            <SectionWrapper sideBarItems={PATIENT_LINKS}>
                {
                    CONTENT_MAP[tab]
                }
            </SectionWrapper>
            <Toaster duration={10000} />
        </>
    )
}
