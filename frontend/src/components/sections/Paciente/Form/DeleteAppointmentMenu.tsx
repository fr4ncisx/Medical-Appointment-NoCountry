import { useTableContext } from "@context/table.context";
import { deleteCitasPaciente } from "@services/patient/deleteCitasPaciente";
import { useModalStore } from "@store/modal.store";
import { useUserStore } from "@store/user.store";
import { CustomError } from "@tipos/types";
import { ConfirmDelete } from "@ui/ConfirmDelete.tsx/ConfirmDelete";
import { showSonnerToast } from "@utils/showSonnerToast";
import { useState } from "react";

export const DeleteAppointmentMenu = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<CustomError>(null);
    const { id: pacienteId } = useModalStore(state => state.modalData.data);
    const closeModal = useModalStore(state => state.closeModal);
    const token = useUserStore(state => state.getToken)();
    const { handleSetError, removeRow } = useTableContext();

    const confirmDeleteAppointment = async () => {
        setLoading(true);
        setError(null);
        handleSetError(null);
        const response = await deleteCitasPaciente({pacienteId, token, setError});
        if(response){
            const { message } = response;
            showSonnerToast({
                title: message,
                description: "Se elimino correctamente la cita",
                type: "success"
            });
            removeRow(pacienteId);
            closeModal();
        }
        setLoading(false);
    };

    return(
        <ConfirmDelete loading={loading} error={error} handleClick={confirmDeleteAppointment} description="¿Estás seguro de eliminar la cita?" />
    )
}