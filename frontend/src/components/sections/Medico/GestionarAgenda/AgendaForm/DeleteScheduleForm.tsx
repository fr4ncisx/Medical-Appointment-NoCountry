import { useScheduleContext } from "@context/schedule.context";
import { deleteSchedule } from "@services/schedule/deleteSchedule";
import { useModalStore } from "@store/modal.store";
import { useUserStore } from "@store/user.store";
import { CustomError } from "@tipos/types";
import { ConfirmDelete } from "@ui/ConfirmDelete.tsx/ConfirmDelete";
import { showSonnerToast } from "@utils/showSonnerToast";
import { useState } from "react";

export const DeleteScheduleMenu = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CustomError>(null);
    const { id: scheduleId } = useModalStore(state => state.modalData.data);
    const closeModal = useModalStore(state => state.closeModal);
    const token = useUserStore(state => state.getToken)();
    const { fetchSchedules } = useScheduleContext();

    const handleClick = async () => {
        setLoading(true);
        setError(null);
        const response = await deleteSchedule({ scheduleId, token, setError });
        if (response) {
            const { message } = response;
            showSonnerToast({
                title: message,
                description: "Se elimino correctamente el horario",
                type: "success"
            });
            fetchSchedules();
            closeModal();
        }
        setLoading(false)
    };

    return (
        <ConfirmDelete loading={loading} error={error} handleClick={handleClick} description="¿Estas seguro de eliminar este horario?" />
    );
}