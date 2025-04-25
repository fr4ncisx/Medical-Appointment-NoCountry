import { useTableContext } from "@context/table.context";
import { Box, Typography } from "@mui/material";
import { editMedico } from "@services/medic/editMedico";
import { useModalStore } from "@store/modal.store";
import { useUserStore } from "@store/user.store";
import { CustomError } from "@tipos/types";
import { Form } from "@ui/Form/Form";
import { SubmitButton } from "@ui/SubmitButton/SubmitButton";
import { showSonnerToast } from "@utils/showSonnerToast";
import { useState } from "react";
import { MedicoEditFormData, medicoEditFormSchema, medicoEditFormUiSchema } from "./medicoEditFormSchema";
import { Gender, MedicoData, Speciality } from "@tipos/backendTypes";

export const EditMedicoMenu = () => {
    const medicoData: MedicoData = useModalStore(state => state.modalData.data).itemData;
    const initData: MedicoEditFormData = {
        description: medicoData.description,
        gender: medicoData.gender,
        speciality: medicoData.speciality,
        state: {
            state: medicoData.state
        },
        first_name: medicoData.name,
        last_name: medicoData.lastname,
        phone: medicoData.phone,
    }
    const [data, setData] = useState<MedicoEditFormData>(initData);
    const [error, setError] = useState<CustomError>(null);
    const closeModal = useModalStore(state => state.closeModal);
    const [loading, setLoading] = useState(false);
    const { addEditedRow } = useTableContext();
    const token = useUserStore(state => state.getToken)();

    const handleEditMedico = async () => {
        setError(null);
        setLoading(true);
        const response = await editMedico({ medicoId: medicoData.id, token, data, setError });
        if (response !== null) {
            showSonnerToast({
                title: response,
                description: "Se edito correctamente el medico",
                type: "success"
            });
            const editedMedico: MedicoData = {
                id: medicoData.id,
                documentId: medicoData.documentId,
                speciality: data.speciality as Speciality,
                description: data.speciality,
                state: data.state.state,
                name: data.first_name,
                lastname: data.last_name,
                gender: data.gender as Gender,
                phone: data.phone
            }
            addEditedRow(editedMedico);
            closeModal();
        }
        setLoading(false);
    }

    const handleChange = ({ data, errors }: { data: any, errors: any[] }) => {
        setData(data);
        if (errors.length !== 0) {
            setError({ type: "input", description: "entrada invalida en formulario" })
        } else {
            setError(null);
        }
    }
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Box display="flex" flexDirection="column" gap="1rem" width="500px">
                <Box display="flex" flexDirection="column" gap="2rem">
                    <Form schema={medicoEditFormSchema} uiSchema={medicoEditFormUiSchema} data={data} onChange={handleChange} />
                    {
                        error?.type === "fetch" && <Typography color="error" textAlign="center">{error.description}</Typography>
                    }
                </Box>
                <SubmitButton label="Editar Medico" error={error} loading={loading} handleOnClick={handleEditMedico} />
            </Box>
        </form >
    );
}