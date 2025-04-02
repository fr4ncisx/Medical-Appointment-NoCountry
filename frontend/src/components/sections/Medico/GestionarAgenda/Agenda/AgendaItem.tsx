import { ListItem, Box, ListItemText, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { ScheduleData } from "@tipos/backendTypes";

interface Props {
    item: ScheduleData
}

export const AgendaItem = ({ item }: Props) => {
    const { endDate, endTime, startDate, startTime } = item;
    return (
        <ListItem sx={{ backgroundColor: "#fff", mb: ".5rem" }}>
            <Box display="flex" width="100%">
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
                    <IconButton color="error" onClick={() => { }} >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                    <IconButton color="info" onClick={() => { }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </ListItem>
    );
}