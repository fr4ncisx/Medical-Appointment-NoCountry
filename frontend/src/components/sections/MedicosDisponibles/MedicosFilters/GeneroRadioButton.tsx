import { useMedicosDisponibles } from "@context/medicos_disponibles.context";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Gender } from "@tipos/backendTypes";

export const GeneroRadioButton = () => {
  const { genderFilter, handleChangeGender } = useMedicosDisponibles();

  return (
    <FormControl>
      <FormLabel id="gender-radio-group" sx={{ color: "#198751" }}>
        Genero del doctor/a
      </FormLabel>
      <RadioGroup row aria-labelledby="gender-radio-group">
        <FormControlLabel
          value="MALE"
          control={<Radio />}
          label="Hombre"
          checked={genderFilter === "MALE"}
          onClick={() => handleChangeGender(Gender.MALE)}
        />
        <FormControlLabel
          value="FEMALE"
          control={<Radio />}
          label="Mujer"
          checked={genderFilter === "FEMALE"}
          onClick={() => handleChangeGender(Gender.FEMALE)}
        />
      </RadioGroup>
    </FormControl>
  );
};
