export interface PacienteEditFormData {
    first_name: string,
    last_name: string,
    customSelect: {
        gender: string
    },
    customDatePicker: {
        date: string
    },
    phone: string,
    address: string,
    emergency_contact_info: string,
}

export const pacienteEditFormSchema = {
    type: 'object',
    "required": [
        "first_name",
        "last_name",
        "customSelect",
        "customDatePicker",
        "phone",
        "address",
        "emergency_contact_info"
    ],
    "properties": {
        "first_name": {
            "type": "string",
        },
        "last_name": {
            "type": "string",
        },
        "customSelect": {
            "type": "object",
            "properties": {
                "gender": {
                    "type": "string",
                }
            }
        },
        "customDatePicker": {
            "type": "object",
            "properties": {
                "date": {
                    "type": "string",
                }
            }
        },
        "phone": {
            "type": "string",
            "pattern": "^(\\+)?[0-9]{11,20}$",
            "errorMessage": {
                "pattern": 'El formato acepta solamente números y el signo +'
            }
        },
        "address": {
            "type": "string",
        },
        "emergency_contact_info": {
            "type": "string",
            "pattern": "^(\\+)?[0-9]{11,20}$",
            "errorMessage": {
                "pattern": 'El formato acepta solamente números y el signo +'
            }
        }
    },
    "errorMessage": {
        "required": "El campo es obligatorio",
    }
}

export const pacienteEditFormUiSchema = {
    "type": "Categorization",
    "elements": [
        {
            "type": "Category",
            "label": "Datos Personales",
            "elements": [
                {
                    "type": "VerticalLayout",
                    "elements": [
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/first_name",
                                    "label": "Nombre",
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/last_name",
                                    "label": "Apellido",
                                },
                            ]
                        },
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/customSelect",
                                    "label": "Género",
                                    "options": {
                                        "customControl": "customSelect",
                                        "key": "gender",
                                        "items": [
                                            { "value": 'MALE', "label": 'Hombre' },
                                            { "value": 'FEMALE', "label": 'Mujer' },
                                        ]
                                    }
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/customDatePicker",
                                    "label": "Fecha de nacimiento",
                                    "options": {
                                        "validateAge": "true",
                                        "key": "date",
                                        "customControl": "customDatePicker",
                                    }
                                },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "Category",
            "label": "Datos de contacto",
            "elements": [
                {
                    "type": "VerticalLayout",
                    "elements": [
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/phone",
                                    "label": "Número de celular",
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/address",
                                    "label": "Direccion",
                                },
                            ]
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/emergency_contact_info",
                            "label": "Número contacto de emergencia"
                        }
                    ]
                }
            ]
        }
    ],
    "options": {
        "variant": "stepper",
        "showNavButtons": false
    }
}