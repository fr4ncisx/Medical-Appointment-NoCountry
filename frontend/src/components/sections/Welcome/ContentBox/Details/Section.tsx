import { Box, Typography } from "@mui/material";
import { DetailsStyle } from "./DetailsStyle";
import { DetailsSection } from "./SECTIONS";

export const Section = ({ subtitle, body, icon}: DetailsSection) => {
    return (
        <Box sx={DetailsStyle.sectionContainer}>
            <Box sx={DetailsStyle.iconContainer}>{icon}</Box>
            <Box>
                <Typography variant="subtitle1" fontWeight="bold" color="white">
                    {subtitle}
                </Typography>
                <Typography variant="body1" color="white">{body}</Typography>
            </Box>
        </Box>
    );
}