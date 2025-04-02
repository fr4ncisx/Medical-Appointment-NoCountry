import { useModalStore } from "@store/modal.store";
import { Agenda } from "./Agenda/Agenda";
import CustomModal from "@ui/CustomModal/CustomModal";
import { Toaster } from "sonner";
import { AgendaAddButton } from "./AgendaAddButton";
import { ScheduleContextProvider } from "@context/schedule.provider";
import { AgendaModalContent } from "./AgendaModalContent/AgendaModalContent";

export const GestionarAgendaContent = () => {
    const showModal = useModalStore((state) => state.modalData.showModal);
    return (
        <ScheduleContextProvider>
            <AgendaAddButton />
            <Agenda />
            {
                showModal && (
                    <CustomModal>
                        <AgendaModalContent />
                    </CustomModal>
                )
            }
            <Toaster />
        </ScheduleContextProvider>
    );
}   