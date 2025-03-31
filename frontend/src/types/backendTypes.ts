import { UserRole } from "./store";

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE"
}

export interface PacienteResponse {
    patients: PacienteData[]
}

export interface PacienteData {
    id: number;
    firstName: string;
    lastName: string;
    documentId: string;
    birthDate: string;
    gender: string;
    phone: string;
    address: string;
    emergencyContactInfo: string;
}

export interface PacienteInput {
    firstName: string;
    lastName: string;
    documentId: string;
    birthDate: Date;
    gender: string;
    phone: string;
    address: string;
    emergencyContactInfo: string;
    user: UserInput;
}

export interface UserInput {
    email: string;
    password: string;
}

export interface CitasData {
    id: number;
    date: string;
    time: string;
    visitReason: string;
    status: string;
    medic: {
        id: number;
        name: string;
        lastname: string;
    }
}

export interface CitasPasadasData {
    id: number;
    recordDate: string;
    visitReason: string;
    symptoms: string;
    symptomsFrequency: string;
    medicalHistory: string;
    smokingHabits: boolean;
    activityHabits: boolean;
    additionalInfo: string;
    diagnosis: string;
    treatment: string;
    doctorNotes: string;
}

export interface MedicationInput {
    medicationName: string;
    dosage:         string;
    frequency:      string;
    startDate:      Date;
    endDate:        Date;
    notes:          string;
}

export interface MedicacionData {
    id: number;
    medicationName: string;
    dosage:         string;
    frequency:      string;
    startDate:      string;
    endDate:        string;
    notes:          string;
}

export enum Speciality {
    CLINICA = "CLINICA",
    CARDIOLOGIA = "CARDIOLOGIA",
    NEUROLOGIA = "NEUROLOGIA",
    PSIQUIATRIA = "PSIQUIATRIA",
    PSICOLOGIA = "PSICOLOGIA",
    NUTRICION = "NUTRICION",
    DERMATOLOGIA = "DERMATOLOGIA",
    GINECOLOGIA = "GINECOLOGIA"
}

export interface MedicosResponse {
    medics: MedicoData[]
}

export interface MedicoResponse {
    medic: MedicoData;
}

export interface MedicoCreateResponse {
    message: string,
    medic: {
        id: number,
        name: string,
        lastname: string,
        description: string,
        state: string,
        documentId: string,
        gender: Gender,
        speciality: Speciality,
        phone: string,
        user: {
            id: number,
            email: string,
            role: UserRole
        }
    }
}

export interface MedicoData {
    id: number;
    name: string;
    lastname: string;
    description: string;
    state: string;
    documentId: string;
    gender: Gender;
    speciality: Speciality;
    phone: string;
}

export interface MedicoInput {
    name: string,
    lastname: string,
    description: string,
    state: string,
    documentId: string,
    gender: Gender,
    speciality: Speciality,
    phone: string,
    user: UserInput
}

export interface AppointmentResponse {
    date: string,
    time: string,
    visitReason: string,
}

export interface AgendarCitaInput {
    specialty: string,
    selectorMedicos: { medic: string },
    time: string,
    visitReason: string,
};

export interface Time {
    hour:   number;
    minute: number;
    second: number;
    nano:   number;
}

export interface MedicalRecordData {
    id:                number;
    recordDate:        string;
    visitReason:       string;
    symptoms:          string;
    symptomsFrequency: string;
    medicalHistory:    string;
    smokingHabits:     boolean;
    activityHabits:    boolean;
    additionalInfo:    string;
    diagnosis:         string;
    treatment:         string;
    doctorNotes:       string;
}