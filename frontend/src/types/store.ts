/* eslint-disable @typescript-eslint/no-explicit-any */
export type ModalOperation =
    "menu" |
    "login" |
    "sign_up" |
    "create_medico" |
    "delete_medico" |
    "add_medication" |
    "delete_medication" |
    "medication_details" |
    "edit_medication" |
    "delete_paciente" |
    "medical_record_details" |
    "create_schedule" | 
    "delete_schedule" |
    "edit_schedule" |
    "edit_paciente" | 
    "paciente_details" |
    "edit_medico" |
    "medico_details";

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