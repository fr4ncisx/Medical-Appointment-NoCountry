import { useModalStore } from "@store/modal.store";
import { ModalOperation } from "@tipos/store";
import { ReactNode } from "react";
import { AgendaForm } from "./AgendaForm";
import { DeleteScheduleMenu } from "./DeleteScheduleForm";
import { EditScheduleForm } from "./EditScheduleForm";

type AgendaModalContent = Extract<ModalOperation, "create_schedule" | "delete_schedule" |  "edit_schedule">;

export const AgendaModalContent = () => {
    const operation = useModalStore(state => state.modalData).operation;

    const CONTENT_MAP: Record<AgendaModalContent, ReactNode> = {
        "create_schedule": <AgendaForm />,
        "delete_schedule": <DeleteScheduleMenu />,
        "edit_schedule": <EditScheduleForm />
    }

    return (
        <>
            {
                CONTENT_MAP[operation as unknown as AgendaModalContent]
            }
        </>
    );
}