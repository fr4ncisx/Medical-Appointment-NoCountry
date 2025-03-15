import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "@components/layout/Layout";
import { Welcome } from "@components/sections/Welcome/Welcome";
import { MedicosDisponiblesSection } from "@components/sections/MedicosDisponibles/MedicosDisponiblesSection";
import { AgendaTuCitaSection } from "@components/sections/AgendaTuCita/AgendaTuCitaSection";
import { PacienteGuard } from "@routes/PacienteGuard";
import { AdminGuard } from "@routes/AdminGuard";
import { MedicoGuard } from "@routes/MedicoGuard";
import { NotFound } from "@components/layout/NotFound/NotFound";
import { DoctorDetails } from "@components/sections/MedicosDisponibles/DoctorDetails/doctorDetails";
import { DashboardAdmin } from "@components/sections/Admin/DashboardAdmin/DashboardAdmin";
import { DashboardPatient } from "@components/sections/DashboardPatient/DashboardPatient";
import { DashboardMedico } from "@components/sections/Medico/DashboardMedico/DashboardMedico";
import { GestionarPacientes } from "@components/sections/Medico/GestionarPacientes/GestionarPacientes";
import { ContenidoDatosDiagnostico } from "@components/sections/DashboardPatient/ContenidoDatosDiagnostico/ContenidoDatosDiagnostico"
import { ContenidoHistorialCitas } from "@components/sections/DashboardPatient/ContenidoHistorialCitas/ContenidoHistorialCitas";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/medicos-disponibles" element={<MedicosDisponiblesSection />} />
                    <Route path="/medico/:id" element={<DoctorDetails />} />
                    <Route path="/agendar-cita" element={<AgendaTuCitaSection />} />
                    <Route path="/" element={<Welcome />} />
                    <Route element={<PacienteGuard />}>
                        <Route path="/paciente/dashboard" element={<DashboardPatient />} />
                        <Route path="/paciente/dashboard/settings" element={<>Settings</>} />
                        <Route path="/paciente/datos-diagnostico" element={<ContenidoDatosDiagnostico />} />
                        <Route path="/paciente/historial-citas" element={<ContenidoHistorialCitas />} />
                        <Route path="/paciente/agendar-cita" element={<AgendaTuCitaSection />} />
                    </Route>
                    <Route element={<AdminGuard />}>
                        <Route path="/admin/dashboard" element={<DashboardAdmin/>} />
                    </Route>
                    <Route element={<MedicoGuard />}>
                        <Route path="/medico/dashboard" element={<DashboardMedico />} />
                        <Route path="/medico/historial-citas" element={<>Historial Citas</>} />
                        <Route path="/medico/gestionar-pacientes" element={<GestionarPacientes />} />
                        <Route path="/medico/agenda" element={<>Agenda</>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}