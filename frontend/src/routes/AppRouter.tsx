import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "@components/layout/Layout";
import { Welcome } from "@components/sections/Welcome/Welcome";
import { MedicosDisponiblesSection } from "@components/sections/MedicosDisponibles/MedicosDisponiblesSection";
import { AgendaTuCitaSection } from "@components/sections/Paciente/AgendaTuCita/AgendaTuCitaSection";
import { PacienteGuard } from "@routes/PacienteGuard";
import { AdminGuard } from "@routes/AdminGuard";
import { MedicoGuard } from "@routes/MedicoGuard";
import { NotFound } from "@components/layout/NotFound/NotFound";
import { DoctorDetails } from "@components/sections/MedicosDisponibles/DoctorDetails/doctorDetails";
import { DashboardPaciente } from "@components/sections/Paciente/DashboardPaciente/DashboardPaciente";
import { DashboardMedico } from "@components/sections/Medico/DashboardMedico/DashboardMedico";
import { GestionarPacientes } from "@components/sections/Medico/GestionarPacientes/GestionarPacientes/GestionarPacientes";
import { DatosDiagnostico } from "@components/sections/Paciente/DatosDiagnostico/DatosDiagnostico"
import { HistorialCitas } from "@components/sections/Paciente/HistorialCitas/HistorialCitas";
import { HistorialMedico } from "@components/sections/Medico/HistorialMedico/HistorialMedico";
import { GestionarAgenda } from "@components/sections/Medico/GestionarAgenda/GestionarAgenda";
import { GestionarMedicamentos } from "@components/sections/Medico/GestionarPacientes/GestionarMedicamentos/GestionarMedicamentos";
import { DashboardAdmin } from "@components/sections/Admin/DashboardAdmin";

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
                        <Route path="/paciente/dashboard" element={<DashboardPaciente />} />
                        <Route path="/paciente/dashboard/settings" element={<>Settings</>} />
                        <Route path="/paciente/datos-diagnostico" element={<DatosDiagnostico />} />
                        <Route path="/paciente/historial-citas" element={<HistorialCitas />} />
                        <Route path="/paciente/agendar-cita" element={<AgendaTuCitaSection />} />
                    </Route>
                    <Route element={<AdminGuard />}>
                        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                    </Route>
                    <Route element={<MedicoGuard />}>
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
}