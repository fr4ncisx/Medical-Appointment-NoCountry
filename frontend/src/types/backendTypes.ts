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

export interface PacienteEditInput {
    firstName:            string;
    lastName:             string;
    birthDate:            string;
    gender:               Gender;
    phone:                string;
    address:              string;
    emergencyContactInfo: string;
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
    dosage: string;
    frequency: string;
    startDate: Date;
    endDate: Date;
    notes: string;
}

export interface MedicacionData {
    id: number;
    medicationName: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
    notes: string;
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
        state: Provincia,
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
    state: Provincia,
    documentId: string,
    gender: Gender,
    speciality: Speciality,
    phone: string,
    user: UserInput
}

export interface MedicoEditInput {
    name:        string;
    lastname:    string;
    description: string;
    state:       Provincia;
    gender:      Gender;
    speciality:  Speciality;
    phone:       string;
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
    hour: number;
    minute: number;
    second: number;
    nano: number;
}

export interface MedicalRecordData {
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

export interface ScheduleInput {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
}

export interface ScheduleData {
    id: number
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}

export enum Provincia {
    BUENOS_AIRES = 'Buenos Aires',
    CATAMARCA = 'Catamarca',
    CHACO = 'Chaco',
    CHUBUT = 'Chubut',
    CORDOBA = 'Córdoba',
    CORRIENTES = 'Corrientes',
    ENTRE_RIOS = 'Entre Ríos',
    FORMOSA = 'Formosa',
    JUJUY = 'Jujuy',
    LA_PAMPA = 'La Pampa',
    LA_RIOJA = 'La Rioja',
    MENDOZA = 'Mendoza',
    MISIONES = 'Misiones',
    NEUQUEN = 'Neuquén',
    RIO_NEGRO = 'Río Negro',
    SALTA = 'Salta',
    SAN_JUAN = 'San Juan',
    SAN_LUIS = 'San Luis',
    SANTA_CRUZ = 'Santa Cruz',
    SANTA_FE = 'Santa Fe',
    SANTIAGO_DEL_ESTERO = 'Santiago del Estero',
    TIERRA_DEL_FUEGO = 'Tierra del Fuego',
    TUCUMAN = 'Tucumán',
    CIUDAD_AUTONOMA_BUENOS_AIRES = 'Ciudad Autónoma de Buenos Aires'
  }
  