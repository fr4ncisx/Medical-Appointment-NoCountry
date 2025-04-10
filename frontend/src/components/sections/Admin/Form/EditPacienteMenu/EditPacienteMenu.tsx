import { useTableContext } from "@context/table.context";
import { Box, Typography } from "@mui/material";
import { editPaciente } from "@services/patient/editPaciente";
import { useModalStore } from "@store/modal.store";
import { PacienteData } from "@tipos/backendTypes";
import { CustomError } from "@tipos/types";
import { Form } from "@ui/Form/Form";
import { SubmitButton } from "@ui/SubmitButton/SubmitButton";
import { useState } from "react";
import { PacienteEditFormData, pacienteEditFormSchema, pacienteEditFormUiSchema } from "./pacienteEditFormSchema";
import { showSonnerToast } from "@utils/showSonnerToast";
import { formatDate } from "@utils/date/formatDate";
import { useUserStore } from "@store/user.store";

export const EditPacienteMenu = () => {
    const pacienteData: PacienteData = useModalStore(state => state.modalData.data).itemData;
    const initData: PacienteEditFormData = {
        address: pacienteData.address,
        customDatePicker: {
            date: formatDate(pacienteData.birthDate, "yyyy-MM-dd", "dd/MM/yyyy")
        },
        customSelect: {
            gender: pacienteData.gender
        },
        emergency_contact_info: pacienteData.emergencyContactInfo,
        first_name: pacienteData.firstName,
        last_name: pacienteData.lastName,
        phone: pacienteData.phone,
    }
    const [data, setData] = useState<PacienteEditFormData>(initData);
    const [error, setError] = useState<CustomError>(null);
    const closeModal = useModalStore(state => state.closeModal);
    const [loading, setLoading] = useState(false);
    const { addEditedRow } = useTableContext();
    const token = useUserStore(state => state.getToken)();
    
    const handleEditPaciente = async () => {
        setError(null);
        setLoading(true);
        const response = await editPaciente({ patientId: pacienteData.id, token, data, setError });
        if (response !== null) {
            showSonnerToast({
                title: response,
                description: "Se edito correctamente el paciente",
                type: "success"
            });
            const editedPaciente: PacienteData = {
                id: pacienteData.id,
                address: data.address,
                birthDate: data.customDatePicker.date,
                documentId: pacienteData.documentId,
                emergencyContactInfo: data.emergency_contact_info,
                firstName: data.first_name,
                lastName: data.last_name,
                gender: data.customSelect.gender,
                phone: data.phone
            }
            addEditedRow(editedPaciente);
            closeModal();
        } 
        setLoading(false);
    }

    const handleChange = ({ data, errors }: { data: any, errors: any[] }) => {
        setData(data);
        console.log(errors);
        if (errors.length !== 0) {
            setError({ type: "input", description: "entrada invalida en formulario de inicio de sesion" })
        } else {
            setError(null);
        }
    }
    
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "500px",
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                }}>
                    <Form schema={pacienteEditFormSchema} uiSchema={pacienteEditFormUiSchema} data={data} onChange={handleChange} />
                    {
                        error?.type === "fetch" && <Typography color="error" textAlign="center">{error.description}</Typography>
                    }
                </Box>
                <SubmitButton label="Editar Paciente" error={error} loading={loading} handleOnClick={handleEditPaciente} />
            </Box>
        </form >
    );
}