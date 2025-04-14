import { ControlProps } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react/";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import { Option } from "@tipos/component";
import { MedicoData } from "@tipos/backendTypes";

interface MedicResponse {
    medics: MedicoData[];
}

const SelectorMedicos = ({ id, data, label, path, required, handleChange }: ControlProps) => {
    const value: any = data?.medic;
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() =>{
        const url_medic = `${import.meta.env.VITE_BACKEND_URL}/api/v1/medic`;
        const params: RequestInit = {method: "GET", headers: {"Content-Type": "application/json"}}
        fetch(url_medic, params)
        .then((response) => {
            if(!response.ok){
                throw new Error("Ocurrió un error al obtener los médicos");
            } else{
                return response.json();
            }
        })
        .then((response: MedicResponse) => {
            const options: Option[] = response.medics.map((medic) => ({
                    value: medic.id.toString(),
                    label: medic.name + " " + medic.lastname
                }));
            setOptions(options);
        })
        .catch((error) => {
            console.log(error);
        })

    }, [])

    const onChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        handleChange(`${path}.medic`, value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id={`select_${id}`}>{label}</InputLabel>
                <Select
                    labelId={`select_${id}`}
                    id={id}
                    value={value}
                    label={label}
                    onChange={onChange}
                    required={required}
                >
                    {
                        options.map((option: Option, index: number) => (
                            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    );
}

export default withJsonFormsControlProps(SelectorMedicos);