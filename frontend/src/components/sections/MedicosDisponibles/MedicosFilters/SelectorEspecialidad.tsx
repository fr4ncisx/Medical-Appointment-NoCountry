import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import { Option } from "@tipos/component";
import { useState } from "react";
import { CustomInputLabel } from "./CustomInputLabel";

const options: Option[] = [
    { label: "Clínica", value: "CLINICA" },
    { label: "Cardiología", value: "CARDIOLOGIA" },
    { label: "Neurología", value: "NEUROLOGIA" },
    { label: "Psiquiatría", value: "PSIQUIATRIA" },
    { label: "Psicología", value: "PSICOLOGIA" },
    { label: "Nutrición", value: "NUTRICION" },
    { label: "Dermatología", value: "DERMATOLOGIA" },
    { label: "Ginecología", value: "GINECOLOGIA" }
];

export const SelectorEspecialidad = () => {
    const [option, setOption] = useState<string>();
    const onChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setOption(value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <CustomInputLabel label="Especialidades" />
            <FormControl fullWidth>
                <Select
                    labelId="select_especialidades"
                    id="select_especialidades"
                    value={option}
                    onChange={onChange}
                >
                    {
                        options.map(({value, label}: Option, index: number) => (
                            <MenuItem key={index} value={value}>{label}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    );
}