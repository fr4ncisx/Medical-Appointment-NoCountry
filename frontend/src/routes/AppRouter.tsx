import { Layout } from "@components/layout/Layout";
import { Welcome } from "@components/sections/Welcome/Welcome";
import { MedicosDisponiblesSection } from "@components/sections/MedicosDisponibles/MedicosDisponiblesSection";
import { AgendaTuCitaSection } from "@components/sections/Paciente/AgendaTuCita/AgendaTuCitaSection";
import { NotFound } from "@components/layout/NotFound/NotFound";
import { DashboardPatient } from "@components/sections/Paciente/DashboardPatient/DashboardPatient";
import { DashboardMedico } from "@components/sections/Medico/DashboardMedico/DashboardMedico";
import { GestionarPacientes } from "@components/sections/Medico/GestionarPacientes/GestionarPacientes/GestionarPacientes";
import { ContenidoDatosDiagnostico } from "@components/sections/Paciente/DashboardPatient/ContenidoDatosDiagnostico/ContenidoDatosDiagnostico";
import { ContenidoHistorialCitas } from "@components/sections/Paciente/DashboardPatient/ContenidoHistorialCitas/ContenidoHistorialCitas";
import { HistorialMedico } from "@components/sections/Medico/HistorialMedico/HistorialMedico";
import { GestionarAgenda } from "@components/sections/Medico/GestionarAgenda/GestionarAgenda";
import { GestionarMedicamentos } from "@components/sections/Medico/GestionarPacientes/GestionarMedicamentos/GestionarMedicamentos";
import { DashboardAdmin } from "@components/sections/Admin/DashboardAdmin";
import { ProtectedRoute } from "@routes/ProtectedRoute";
import { UserRole } from "@tipos/store";
import { BrowserRouter, Route, Routes } from "react-router";
import { MedicDetails } from "@components/sections/MedicosDisponibles/MedicDetails";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Welcome />} />
                    <Route path="/medicos-disponibles" element={<MedicosDisponiblesSection />} />
                    <Route path="/medico/:id" element={<MedicDetails />} />
                    <Route path="/agendar-cita" element={<AgendaTuCitaSection />} />

                    <Route element={<ProtectedRoute requiredRole={UserRole.PACIENTE} />}>
                        <Route path="/paciente/dashboard" element={<DashboardPatient />} />
                        <Route path="/paciente/dashboard/settings" element={<>Settings</>} />
                        <Route path="/paciente/datos-diagnostico" element={<ContenidoDatosDiagnostico />} />
                        <Route path="/paciente/historial-citas" element={<ContenidoHistorialCitas />} />
                        <Route path="/paciente/agendar-cita" element={<AgendaTuCitaSection />} />
                    </Route>

                    <Route element={<ProtectedRoute requiredRole={UserRole.ADMIN} />}>
                        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                    </Route>

                    <Route element={<ProtectedRoute requiredRole={UserRole.MEDICO} />}>
                        <Route path="/medico/dashboard" element={<DashboardMedico />} />
                        <Route path="/medico/historial-citas" element={<HistorialMedico />} />
                        <Route path="/medico/gestionar-pacientes" element={<GestionarPacientes />} />
                        <Route path="/medico/gestionar-medicamentos/:id" element={<GestionarMedicamentos />} />
                        <Route path="/medico/agenda" element={<GestionarAgenda />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
