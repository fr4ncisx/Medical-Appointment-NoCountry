import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

export const GeneroRadioButton = () => {
    return (
        <FormControl>
            <FormLabel id="gender-radio-group" sx={{ color: "#198751" }}>Genero del doctor/a</FormLabel>
            <RadioGroup
                row
                aria-labelledby="gender-radio-group"
            >
                <FormControlLabel value="MALE" control={<Radio />} label="Hombre" />
                <FormControlLabel value="FEMALE" control={<Radio />} label="Mujer" />
            </RadioGroup>
        </FormControl>
    );
}