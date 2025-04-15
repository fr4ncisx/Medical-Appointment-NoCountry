export interface MedicamentosFormData {
    medicationName: string,
    dosage: string
    frequency: string,
    notes: string
    dateRange: {
        startDate: string,
        endDate: string,
    }
}

export const medicamentosSchema = {
    "type": "object",
    "required": [
        "medicationName",
        "dosage",
        "frequency",
        "dateRange",
    ],
    "properties": {
        "medicationName": {
            "type": "string",
        },
        "dosage": {
            "type": "string",
        }
        ,
        "frequency": {
            "type": "string",
        },
        "dateRange": {
            "type": "object",
            "customRender": "DatePickerWithRange",
            "properties": {
                "startDate": {
                    "type": "string",
                },
                "endDate": {
                    "type": "string",
                }
            }
        }
        ,
        "notes": {
            "type": "string",
        }
    },
    "errorMessage": {
        "required": "El campo es obligatorio."
    }
};

export const medicamentosUiSchema = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "HorizontalLayout",
            "elements": [
                {
                    "type": "Control",
                    "scope": "#/properties/medicationName",
                    "label": "Nombre medicación"
                },
                {
                    "type": "Control",
                    "scope": "#/properties/dosage",
                    "label": "Dosis",
                },
            ]
        },
        {
            "type": "HorizontalLayout",
            "elements": [
                {
                    "type": "Control",
                    "scope": "#/properties/dateRange",
                    "label": "Consumir medicamento entre",
                },
            ]
        },
        {
            "type": "HorizontalLayout",
            "elements": [
                {
                    "type": "Control",
                    "scope": "#/properties/frequency",
                    "label": "Frecuencia",
                },

                {
                    "type": "Control",
                    "scope": "#/properties/notes",
                    "label": "Notas adicionales",
                }
            ]
        }
    ]
}