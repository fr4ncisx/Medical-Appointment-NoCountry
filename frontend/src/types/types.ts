import { ReactNode } from "react";
import { PacienteData } from "./backendTypes";

export type Image = {
  src: string;
  name: string;
  specialty: string;
}

export type Url = `/${string}` | "#";

export interface IconData {
  to: string,
  ariaLabel: string,
  Icon: ReactNode
};

export interface UserMenuItems {
  to: string,
  ariaLabel: string,
  text: string
};

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  specialty: string;
  profile_img: string;
}

export type HexColor = `#${string}`;

interface ErrorData {
    description: string,
    type: "fetch" | "input",
    status?: string
}

export type CustomError = ErrorData | null;

export interface PacientesResponse {
  patients: PacienteData[]
}