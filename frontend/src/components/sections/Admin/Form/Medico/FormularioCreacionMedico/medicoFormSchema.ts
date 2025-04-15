export interface MedicoFormData {
    email: string
    repeatPassword: {
        password: string
        repeatPassword: string
    },
    first_name: string
    last_name: string
    gender: string
    speciality: string
    dni: string
    phone: string
    state: {
        state: string
    }
    description: string
}

export const medicoFormSchema = {
    "type": 'object',
    "required": [
        "email",
        "repeatPassword",
        "first_name",
        "last_name",
        "gender",
        "speciality",
        "dni",
        "phone",
        "state",
        "description"
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
            "customRender": "PasswordConfirmControl",
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
        "gender": {
            "type": "string",
            oneOf: [
                {
                    const: 'MALE',
                    title: 'Hombre'
                },
                {
                    const: 'FEMALE',
                    title: 'Mujer'
                },
            ]
        },
        "speciality": {
            "type": "string",
            oneOf: [
                {
                    const: 'CLINICA',
                    title: 'Clínica'
                },
                {
                    const: 'CARDIOLOGIA',
                    title: 'Cardiología'
                },
                {
                    const: 'NEUROLOGIA',
                    title: 'Neurología'
                },
                {
                    const: 'PSIQUIATRIA',
                    title: 'Psiquiatría'
                },
                {
                    const: 'PSICOLOGIA',
                    title: 'Psicología'
                },
                {
                    const: 'NUTRICION',
                    title: 'Nutrición'
                },
                {
                    const: 'DERMATOLOGIA',
                    title: 'Dermatología'
                },
                {
                    const: 'GINECOLOGIA',
                    title: 'Ginecología'
                },
            ]
        },
        "dni": {
            "type": "string",
            "pattern": "^[0-9]{8}$",
            "errorMessage": {
                "pattern": "El DNI debe tener 8 dígitos y debe ser escrito sin puntos"
            }
        },
        "phone": {
            "type": "string",
            "pattern": "^(\\+)?[0-9]{11,20}$",
            "errorMessage": {
                "pattern": 'El formato acepta solamente números y el signo +'
            }
        },
        "state": {
            "type": "object",
            "customRender": "CustomSelectControl",
        },
        "description": {
            "type": "string"
        }
    },
    "errorMessage": {
        "required": "El campo es obligatorio",
    }
};

export const medicoFormUiSchema = {
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
                                    "scope": "#/properties/dni",
                                    "label": "DNI (sin puntos, ni espacios)",
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/gender",
                                    "label": "Género"
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
                                    "scope": "#/properties/state",
                                    "label": "Provincia",
                                    "options": {
                                        "key": "state",
                                        "items": [
                                            { value: 'BUENOS_AIRES', label: 'Buenos Aires' },
                                            { value: 'CATAMARCA', label: 'Catamarca' },
                                            { value: 'CHACO', label: 'Chaco' },
                                            { value: 'CHUBUT', label: 'Chubut' },
                                            { value: 'CORDOBA', label: 'Córdoba' },
                                            { value: 'CORRIENTES', label: 'Corrientes' },
                                            { value: 'ENTRE_RIOS', label: 'Entre Ríos' },
                                            { value: 'FORMOSA', label: 'Formosa' },
                                            { value: 'JUJUY', label: 'Jujuy' },
                                            { value: 'LA_PAMPA', label: 'La Pampa' },
                                            { value: 'LA_RIOJA', label: 'La Rioja' },
                                            { value: 'MENDOZA', label: 'Mendoza' },
                                            { value: 'MISIONES', label: 'Misiones' },
                                            { value: 'NEUQUEN', label: 'Neuquén' },
                                            { value: 'RIO_NEGRO', label: 'Río Negro' },
                                            { value: 'SALTA', label: 'Salta' },
                                            { value: 'SAN_JUAN', label: 'San Juan' },
                                            { value: 'SAN_LUIS', label: 'San Luis' },
                                            { value: 'SANTA_CRUZ', label: 'Santa Cruz' },
                                            { value: 'SANTA_FE', label: 'Santa Fe' },
                                            { value: 'SANTIAGO_DEL_ESTERO', label: 'Santiago del Estero' },
                                            { value: 'TIERRA_DEL_FUEGO', label: 'Tierra del Fuego' },
                                            { value: 'TUCUMAN', label: 'Tucumán' },
                                            { value: 'CIUDAD_AUTONOMA_BUENOS_AIRES', label: 'Ciudad Autónoma de Buenos Aires' }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            "type": "HorizontalLayout",
                            "elements": [
                                {
                                    "type": "Control",
                                    "scope": "#/properties/speciality",
                                    "label": "Especialidad",
                                },
                                {
                                    "type": "Control",
                                    "scope": "#/properties/description",
                                    "label": "Descripcion",
                                }
                            ]
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