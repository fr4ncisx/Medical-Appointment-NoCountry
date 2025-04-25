import { useModalStore } from "@store/modal.store";
import { ModalOperation } from "@tipos/store";
import { ReactNode } from "react";
import { DeleteAppointmentMenu } from "./DeleteAppointmentMenu";
import { UpdateAppointmentMenu } from "./UpdateAppointmentMenu";

type PacienteModalContent = Extract<ModalOperation, "delete_appointment"  | "update_appointment">

export const PacienteFormContent = () => {
    const operation = useModalStore(state => state.modalData).operation;

    const CONTENT_MAP: Record<PacienteModalContent, ReactNode> = {
        "delete_appointment": <DeleteAppointmentMenu />,
        "update_appointment": <UpdateAppointmentMenu />
    }

    return(
        <>
            {
                CONTENT_MAP[operation as unknown as PacienteModalContent]
            }
        </>
    )
}