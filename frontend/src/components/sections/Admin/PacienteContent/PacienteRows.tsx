import { useTableContext } from "@context/table.context";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { PacienteData } from "@tipos/backendTypes";
import { useModalStore } from "@store/modal.store";

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
    return (
        <>
            {
                dataRows.map(({ id, documentId, firstName, lastName, address }: PacienteData) => (
                    <TableRow
                        key={id}
                    >
                        <TableCell align="center">{`${firstName} ${lastName}`}</TableCell>
                        <TableCell align="center">{documentId}</TableCell>
                        <TableCell align="center">{address}</TableCell>
                        <TableCell align="center" sx={{ display: "flex", justifyContent: "space-around" }}>
                            <Tooltip title="Eliminar paciente">
                                <IconButton onClick={() => handleEliminarPaciente(id)} disabled={loadingTableRows}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))
            }
        </>
    );
}