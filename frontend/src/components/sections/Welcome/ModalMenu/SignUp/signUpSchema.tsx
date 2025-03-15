export interface FormData {
    first_name: string | undefined;
    gender: string | undefined;
    dni: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    password: string | undefined;
    confirmPassword: string | undefined;
}

export const signUpSchema = {
    type: 'object',
    "required": [
        "first_name",
        "last_name",
        "customSelect",
        "dni",
        "customDatePicker",
        "phone",
        "address",
        "email",
        "repeatPassword",
        "emergency_contact_info"
    ],
    "properties": {
        "email": {
            "type": "string",
            "format": "email",
            "errorMessage": {
                "format": "El correo electrónico no es válido."
            }
        },
        "repeatPassword": {
            "type": "object",
            "properties": {
                "password": {
                    "type": "string",
                },
                "repeatPassword": {
                    "type": "string",
                }
            }
        },
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
        "dni": {
            "type": "string",
            "pattern": "^[0-9]{8}$",
            "errorMessage": {
                "pattern": "El DNI debe tener 8 dígitos y debe ser escrito sin puntos"
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

export const signUpUiSchema = {
    "type": "Categorization",
    "elements": [
        {
            "type": "Category",
            "label": "Credenciales",
            "elements": [
                {
                    "type": "VerticalLayout",
                    "elements": [
                        {
                            "type": "Control",
                            "scope": "#/properties/email",
                            "label": "Correo electrónico",
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/repeatPassword",
                            "options": {
                                "customControl": "passwordConfirm"
                            }
                        }
                    ]
                }
            ]
        },
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
                                            { "value": 'male', "label": 'Hombre' },
                                            { "value": 'female', "label": 'Mujer' },
                                        ]
                                    }
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/dni",
                                    "label": "DNI (sin puntos, ni espacios)",
                                },
                            ]
                        },
                        {
                            "type": "Control",
                            "scope": "#/properties/customDatePicker",
                            "label": "Fecha de nacimiento",
                            "options": {
                                "key": "date",
                                "customControl": "customDatePicker",
                            }
                        },
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