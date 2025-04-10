import { useModalStore } from "@store/modal.store";
import { ModalOperation } from "@tipos/store";
import { ReactNode } from "react";
import { FormularioCreacionMedico } from "./FormularioCreacionMedico";
import { DeleteMedicoMenu } from "./DeleteMedicoMenu";
import { DeletePacienteMenu } from "./DeletePacienteMenu";
import { EditPacienteMenu } from "./EditPacienteMenu/EditPacienteMenu";

type AdminModalContent = Extract<ModalOperation, "create_medico" | "delete_medico" | "delete_paciente" | "edit_paciente">

export const AdminFormContent = () => {
    const operation = useModalStore(state => state.modalData).operation;

    const CONTENT_MAP: Record<AdminModalContent, ReactNode> = {
        "create_medico": <FormularioCreacionMedico />,
        "delete_medico": <DeleteMedicoMenu />,
        "delete_paciente": <DeletePacienteMenu />,
        "edit_paciente": <EditPacienteMenu />
    }

    return (
        <>
            {
                CONTENT_MAP[operation as unknown as AdminModalContent]
            }
        </>
    );
}