export const citasFormSchema = {
    "type": "object",
    "required": [
        "date",
        "time",
        "visitReason"
    ],
    "properties": {
        "date": {
            "type": "string",
            "format": "date",
            "errorMessage": {
                "format": "El formato de la fecha no es válido."
            }
        },
        "time": {
            "type": "string",
            "errorMessage": {
                "format": "El formato de la hora no es válido."
            }
        },
        "visitReason": {
            "type": "string",
        }
    },
    "errorMessage": {
        "required": "El campo es obligatorio."
    }
};

export const citasFormUiSchema = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "scope": "#/properties/date",
            "label": "Fecha",
        },
        {
            "type": "Control",
            "scope": "#/properties/time",
            "label": "Horario",
            "options": {
                "format": "time"
            }
        },
        {
            "type": "Control",
            "scope": "#/properties/visitReason",
            "label": "Razón de la visita"
        }
    ]
}