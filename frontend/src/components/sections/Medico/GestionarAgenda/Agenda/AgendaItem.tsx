import { ListItem, Box, ListItemText, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { ScheduleData } from "@tipos/backendTypes";
import { useModalStore } from "@store/modal.store";

interface Props {
    item: ScheduleData
}

export const AgendaItem = ({ item }: Props) => {
    const { id, endDate, endTime, startDate, startTime } = item;
    const setModalData = useModalStore(state => state.setModalData);

    const handleEliminarSchedule = () => {
        setModalData({
            showModal: true,
            title: "",
            operation: "delete_schedule",
            data: { id }
        });
    }

    const handleEditSchedule = () => {
        setModalData({
            showModal: true,
            title: "Editar Horario",
            operation: "edit_schedule",
            data: { itemData: item }
        });
    }

    return (
        <ListItem sx={{ backgroundColor: "#ffffff95", mb: ".5rem", borderRadius: "5px" }}>
            <Box display="flex" width="100%" alignItems="center">
                <DateRangeIcon color="primary" />
                <ListItemText primary={startDate} sx={{ color: "#726969" }} />

                <CalendarMonthIcon color="primary" />
                <ListItemText primary={endDate} sx={{ color: "#726969" }} />

                <HistoryToggleOffIcon color="primary" />
                <ListItemText primary={startTime} sx={{ color: "#726969" }} />

                <AccessTimeIcon color="primary" />
                <ListItemText primary={endTime} sx={{ color: "#726969" }} />
            </Box>
            <Box display="flex">
                <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={handleEliminarSchedule} >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                    <IconButton color="info" onClick={handleEditSchedule}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </ListItem>
    );
}