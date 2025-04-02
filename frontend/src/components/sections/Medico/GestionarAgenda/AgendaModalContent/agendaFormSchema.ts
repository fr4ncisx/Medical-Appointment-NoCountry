export interface AgendaFormData {
    datePickerWithRange: {
        startDate: string,
        endDate: string,
    },
    time: {
        startTime: string,
        endTime: string,
    }
}

export const agendaFormSchema = {
    "type": 'object',
    "required": [
        "datePickerWithRange",
        "time"
    ],
    "properties": {
        "datePickerWithRange": {
            "type": "object",
            "properties": {
                "startDate": {
                    "type": "string",
                },
                "endDate": {
                    "type": "string",
                }
            }
        },
        "time": {
            "customRender": "TimePickerWithRange",
            "type": "object",
            "properties": {
                "startTime": {
                    "type": "string",
                },
                "endTime": {
                    "type": "string",
                }
            }
        }
    },
    "errorMessage": {
        "required": "El campo es obligatorio",
    }
};

export const agendaFormUiSchema = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "Control",
            "scope": "#/properties/datePickerWithRange",
            "label": "Dias Laborales",
            "options": {
                "customControl": "datePickerWithRange",
            }
        },
        {
            "type": "Control",
            "scope": "#/properties/time",
            "label": "Horas Laborales",
        },
    ]
}