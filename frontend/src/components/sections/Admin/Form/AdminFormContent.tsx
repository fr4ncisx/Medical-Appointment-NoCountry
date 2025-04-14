import { useModalStore } from "@store/modal.store";
import { ModalOperation } from "@tipos/store";
import { ReactNode } from "react";
import { DeleteMedicoMenu } from "./Medico/DeleteMedicoMenu";
import { DeletePacienteMenu } from "./Paciente/DeletePacienteMenu";
import { EditPacienteMenu } from "./Paciente/EditPacienteMenu/EditPacienteMenu";
import { PacienteDetails } from "./Paciente/EditPacienteMenu/PacienteDetails";
import { EditMedicoMenu } from "./Medico/EditMedicoMenu/EditMedicoMenu";
import { FormularioCreacionMedico } from "./Medico/FormularioCreacionMedico/FormularioCreacionMedico";

type AdminModalContent = Extract<ModalOperation,
    "create_medico" |
    "delete_medico" |
    "delete_paciente" |
    "edit_paciente" |
    "paciente_details" |
    "edit_medico" |
    "medico_details">

export const AdminFormContent = () => {
    const operation = useModalStore(state => state.modalData).operation;

    const CONTENT_MAP: Record<AdminModalContent, ReactNode> = {
        "create_medico": <FormularioCreacionMedico />,
        "delete_medico": <DeleteMedicoMenu />,
        "delete_paciente": <DeletePacienteMenu />,
        "edit_paciente": <EditPacienteMenu />,
        "paciente_details": <PacienteDetails />,
        "edit_medico": <EditMedicoMenu />,
        "medico_details": <></>
    }

    return (
        <>
            {
                CONTENT_MAP[operation as unknown as AdminModalContent]
            }
        </>
    );
}