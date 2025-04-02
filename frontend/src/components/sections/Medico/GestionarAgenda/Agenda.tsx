import { Box, CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { useScheduleContext } from "@context/schedule.context";
import { RetryConnectionButton } from "./RetryConnectionButton";

export const Agenda = () => {
    const { schedules, loadingSchedules, errorSchedules, fetchSchedules } = useScheduleContext();

    if (loadingSchedules) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress color="primary" size="2rem" />
            </Box>
        );
    }

    if (errorSchedules) {
        return <RetryConnectionButton error={errorSchedules} handleRetry={fetchSchedules} />;
    }

    return (
        <List>
            {
                schedules.map(({ id, startDate, endDate, startTime, endTime }) => (
                    <ListItem key={id} sx={{ backgroundColor: "#fff", mb: ".5rem" }}>
                        <DateRangeIcon color="primary" />
                        <ListItemText primary={startDate} sx={{ color: "#726969" }} />

                        <CalendarMonthIcon color="primary" />
                        <ListItemText primary={endDate} sx={{ color: "#726969" }} />

                        <HistoryToggleOffIcon color="primary" />
                        <ListItemText primary={startTime} sx={{ color: "#726969" }} />

                        <AccessTimeIcon color="primary" />
                        <ListItemText primary={endTime} sx={{ color: "#726969" }} />
                    </ListItem>
                ))
            }
        </List>
    );
}