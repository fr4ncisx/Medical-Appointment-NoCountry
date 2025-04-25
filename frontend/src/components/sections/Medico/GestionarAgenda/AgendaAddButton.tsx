import { Box, Typography } from "@mui/material";
import { CustomButton } from "@ui/CustomButton/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import { useModalStore } from "@store/modal.store";

export const AgendaAddButton = () => {
    const setModalData = useModalStore(state => state.setModalData);

    const handleAddSchedule = () => {
        setModalData({
            showModal: true,
            title: "Añadir Horario",
            operation: "create_schedule"
        });
    }

    return (
        <Box display="flex" justifyContent="space-between" mb="1rem">
            <Typography variant="h5" color="primary">
                Horarios Disponibles
            </Typography>
            <CustomButton startIcon={<AddIcon />} onClick={handleAddSchedule}>
                <Typography variant="body2" textTransform="none">
                    Añadir Horario
                </Typography>
            </CustomButton>
        </Box>
    );
}