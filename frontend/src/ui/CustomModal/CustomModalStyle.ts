import { ObjectStyles } from '@tipos/component';

export const CustomModalStyle: ObjectStyles = {
    modalLayout: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    modalBox: {
        position: 'absolute',
        bgcolor: '#f1f1f1',
        borderRadius: "15px",
    }
};

export const ModalContentStyle: ObjectStyles = {
    container: {
        display: "flex",
        flexDirection: "column",
        padding: "10px"
    },
    header: {
        padding: "0 0 15px",
        textAlign: "center",
        lineHeight: "1.5rem"
    },
    title: {
        color: "#185D3B",
        fontSize: "1.7rem"
    },
    closeButton: {
        display: "flex",
        justifyContent: "end",
        mb: "1rem"
    }
};