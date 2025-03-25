import { Box, CircularProgress, Typography } from "@mui/material";

export const CheckingAccessLoader = () => {
    return(
        <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 80px)">
            <CircularProgress color="primary" size="3rem" />
        </Box>
    );
}