import { useTableContext } from "@context/table.context";
import { deletePaciente } from "@services/patient/deletePaciente";
import { useModalStore } from "@store/modal.store";
import { useUserStore } from "@store/user.store";
import { CustomError } from "@tipos/types";
import { ConfirmDelete } from "@ui/ConfirmDelete.tsx/ConfirmDelete";
import { showSonnerToast } from "@utils/showSonnerToast";
import { useState } from "react";

export const DeletePacienteMenu = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CustomError>(null);
    const { id: pacienteId } = useModalStore(state => state.modalData.data);
    const closeModal = useModalStore(state => state.closeModal);
    const token = useUserStore(state => state.getToken)();
    const { handleSetError, removeRow } = useTableContext();

    const handleClick = async () => {
        setLoading(true);
        setError(null);
        handleSetError(null);
        const response = await deletePaciente({ pacienteId, token, setError });
        if (response) {
            const { message } = response;
            showSonnerToast({
                title: message,
                description: "Se elimino correctamente el paciente seleccionado",
                type: "success"
            });
            removeRow(pacienteId);
            closeModal();
        }
        setLoading(false)
    };

    return (
        <ConfirmDelete loading={loading} error={error} handleClick={handleClick} description="¿Estas seguro de eliminar este paciente?" />
    );
}