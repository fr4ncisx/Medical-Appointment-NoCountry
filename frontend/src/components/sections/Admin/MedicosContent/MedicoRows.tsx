import { useTableContext } from "@context/table.context";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { useModalStore } from "@store/modal.store";
import { MedicoData } from "@tipos/backendTypes";
import EditIcon from '@mui/icons-material/Edit';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const MedicoRows = () => {
    const { dataRows, loadingTableRows } = useTableContext();
    const setModalData = useModalStore(state => state.setModalData);

    const handleEliminarMedico = (id: number) => {
        setModalData({
            showModal: true,
            title: "",
            operation: "delete_medico",
            data: { id }
        });
    }

    const handleEditarMedico = (itemData: MedicoData) => {
        setModalData({
            showModal: true,
            title: "",
            operation: "edit_medico",
            data: { itemData }
        });
    }

    const handleShowDetails = (itemData: MedicoData) => {
        setModalData({
            showModal: true,
            title: "",
            operation: "medico_details",
            data: { itemData }
        });
    }

    return (
        <>
            {
                dataRows.map((medico: MedicoData) => {
                    const { id, documentId, name, lastname, speciality } = medico;
                    return (
                        <TableRow
                            key={id}
                        >
                            <TableCell align="center">{documentId}</TableCell>
                            <TableCell align="center">{`${name} ${lastname}`}</TableCell>
                            <TableCell align="center">
                                <Typography variant="body2">
                                    {speciality.toLowerCase()}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Tooltip title="Eliminar medico">
                                    <IconButton onClick={() => handleEliminarMedico(id)} disabled={loadingTableRows}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Editar">
                                    <IconButton color="info" onClick={() => handleEditarMedico(medico)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Detalles">
                                    <IconButton color="warning" onClick={() => handleShowDetails(medico)}>
                                        <ListAltIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    );
                })
            }
        </>
    );
}