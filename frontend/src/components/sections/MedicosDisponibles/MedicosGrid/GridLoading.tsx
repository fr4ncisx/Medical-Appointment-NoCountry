import { Box, Skeleton, SkeletonOwnProps } from "@mui/material";

const SKELETON_COUNT = 9;
const SKELETON_PROPS: SkeletonOwnProps = { sx: { backgroundColor: "#d9d9d9" }, variant: "rounded", width: 250, height: 270 };

export const GridLoading = () => {
    return (
        <Box display="grid" gap="0.5rem" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <Skeleton key={index} {...SKELETON_PROPS} />
            ))}
        </Box>
    );
};
