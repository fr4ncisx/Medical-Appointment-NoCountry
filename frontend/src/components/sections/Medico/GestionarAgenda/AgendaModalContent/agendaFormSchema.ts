export interface AgendaFormData {
    dateRange: {
        startDate: string,
        endDate: string,
    },
    time: {
        startTime: Date,
        endTime: Date,
    }
}

export const agendaFormSchema = {
    "type": 'object',
    "required": [
        "dateRange",
        "time"
    ],
    "properties": {
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
        },
        "time": {
            "customRender": "TimePickerWithRange",
            "type": "object",
            "properties": {
                "startTime": {
                    "type": "object",
                },
                "endTime": {
                    "type": "object",
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
            "scope": "#/properties/dateRange",
            "label": "Dias Laborales",
        },
        {
            "type": "Control",
            "scope": "#/properties/time",
            "label": "Horas Laborales",
        },
    ]
}