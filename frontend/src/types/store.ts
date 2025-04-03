/* eslint-disable @typescript-eslint/no-explicit-any */
export type ModalOperation = "menu" | "login" | "sign_up" | "create_medico" | "delete_medico" | "add_medication" | "delete_medication" |"medication_details" | "edit_medication" | "delete_paciente";

export interface ModalData {
    title: string,
    showModal: boolean,
    operation?: ModalOperation,
    redirect?: string | null,
    data?: any
}

export enum UserRole {
    ADMIN = "ADMIN",
    PACIENTE = "PACIENTE",
    MEDICO = "MEDICO"
}

export interface UserData {
    id: string
    email: string
    role: UserRole
}