import { useTableContext } from "@context/table.context";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { PacienteData } from "@tipos/backendTypes";
import { useModalStore } from "@store/modal.store";
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const PacienteRows = () => {
    const { dataRows, loadingTableRows } = useTableContext();
    const setModalData = useModalStore(state => state.setModalData);

    const handleEliminarPaciente = (id: number) => {
        setModalData({
            showModal: true,
            title: "",
            operation: "delete_paciente",
            data: { id }
        });
    }

    const handleEditarPaciente = (itemData: PacienteData) => {
        setModalData({
            showModal: true,
            title: "",
            operation: "edit_paciente",
            data: { itemData }
        });
    }

    const handleShowDetails = (itemData: PacienteData) => {
        setModalData({
            showModal: true,
            title: "",
            operation: "paciente_details",
            data: { itemData }
        });
    }
    return (
        <>
            {
                dataRows.map((paciente: PacienteData) => {
                    const { id, documentId, firstName, lastName, address } = paciente;
                    return (
                        <TableRow
                            key={id}
                        >
                            <TableCell align="center">{documentId}</TableCell>
                            <TableCell align="center">{`${firstName} ${lastName}`}</TableCell>
                            <TableCell align="center">{address}</TableCell>
                            <TableCell align="center" sx={{ display: "flex", justifyContent: "space-around" }}>
                                <Tooltip title="Eliminar paciente">
                                    <IconButton onClick={() => handleEliminarPaciente(id)} disabled={loadingTableRows}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Editar">
                                    <IconButton color="info" onClick={() => handleEditarPaciente(paciente)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Detalles">
                                    <IconButton color="warning" onClick={() => handleShowDetails(paciente)}>
                                        <ListAltIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    );
                }
                )
            }
        </>
    );
}