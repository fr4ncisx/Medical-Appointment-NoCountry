import { Avatar, Box, Typography } from "@mui/material";
import { MedicoData } from "@tipos/backendTypes";
import { EspecialidadesMedicas } from "@tipos/component";
import { useNavigate } from "react-router";

interface DoctorCardProps {
	doctor: MedicoData;
}

export const MedicCard = ({ doctor }: DoctorCardProps) => {
	const { id, name, lastname, speciality } = doctor;
	const fullname = `${name} ${lastname}`;

	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/medico/${id}`);
	};
	return (
		<Box
			key={id}
			sx={{
				backgroundColor: "#fff",
				textAlign: "center",
				border: "1px solid #c1c1c1",
				padding: "20px 5px",
				cursor: "pointer",
				height: "250px",
				alignContent: "center"
			}}
			onClick={handleClick}
		>
			<Avatar alt={fullname} src="/assets/img/user.svg" sx={{ margin: "auto", width: 120, height: 120, border: "1px solid #c1c1c1" }} />
			<Typography fontSize="1.2rem" sx={{ color: "#726969"}}>
				{fullname}
			</Typography>
			<Typography fontSize="1rem" color="gray" textTransform="capitalize">
				{EspecialidadesMedicas[speciality]}
			</Typography>
		</Box>
	);
};
