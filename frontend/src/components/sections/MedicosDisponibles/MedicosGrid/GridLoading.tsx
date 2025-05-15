import { Box, Grid2, Skeleton, SkeletonOwnProps } from "@mui/material";

const SKELETON_COUNT = 9;
const SKELETON_PROPS: SkeletonOwnProps = { 
    sx: { backgroundColor: "#d9d9d9", width: '250px', height: "250px", }, 
    variant: "rounded"
 };

export const GridLoading = () => {
    return (
        <Grid2 container spacing={1} columns={{ xs: 12, sm: 12, md: 12 }}>
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <Skeleton key={index} {...SKELETON_PROPS} />
            ))}
        </Grid2>
    );
};
