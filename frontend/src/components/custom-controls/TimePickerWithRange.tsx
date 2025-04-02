/* eslint-disable @typescript-eslint/no-explicit-any */
import { ControlProps } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Box, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';

type ErrorField = "start" | "end" | "both"

type ErrorData = {
    isError: boolean
    errorOn: ErrorField
    message: string
}

const TimePickerWithRange = ({ data, label, path, enabled, required, handleChange }: ControlProps) => {
    const startTime = data?.startTime ? data.startTime : null;
    const endTime = data?.endTime ? data?.endTime : null;

    const handleErrorMsg = (): ErrorData => {
        if ((endTime !== null && startTime !== null) && endTime < startTime) {
            return {
                isError: true,
                errorOn: "both",
                message: "Rango Invalido"
            }
        }

        if ((required && (data?.startTime && !data?.endTime))) {
            return {
                isError: true,
                errorOn: 'end',
                message: "Debe seleccionar una hora final"
            }
        }

        if ((required && (!data?.startTime && data?.endTime))) {
            return {
                isError: true,
                errorOn: 'start',
                message: "Debe seleccionar una hora inicial"
            }
        }

        return {
            isError: false,
            errorOn: 'both',
            message: ""
        }
    }
    const dateRangeError: ErrorData = handleErrorMsg();

    const handleStartTimeChange = (value: any) => {
        handleChange(`${path}.startTime`, value.toString());
    }

    const handleEndTimeChange = (value: any) => {
        handleChange(`${path}.endTime`, value.toString());
    }

    return (
        <Box sx={{ display: "flex", gap: "1rem" }}>
            <Box>
                <Typography variant='body1' color='primary' lineHeight="1.3rem">
                    {`${label} - Hora Inicial`}
                </Typography>
                <TimePicker
                    disabled={!enabled}
                    value={startTime}
                    name='startTime'
                    onChange={(value) => handleStartTimeChange(value)}
                    slotProps={{
                        textField: {
                            variant: 'outlined',
                            error: dateRangeError.isError && ["both", "start"].includes(dateRangeError.errorOn),
                            helperText: dateRangeError.isError && ["both", "start"].includes(dateRangeError.errorOn) ? dateRangeError.message : "",
                        },
                    }}
                />
            </Box>
            <Box>
                <Typography variant='body1' color='primary' lineHeight="1.3rem">
                    {`${label} - Hora Final`}
                </Typography>
                <TimePicker
                    disabled={!enabled}
                    value={endTime}
                    name='endTime'
                    onChange={(value) => handleEndTimeChange(value)}
                    slotProps={{
                        textField: {
                            variant: 'outlined',
                            error: dateRangeError.isError && ["both", "end"].includes(dateRangeError.errorOn),
                            helperText: dateRangeError.isError && ["both", "end"].includes(dateRangeError.errorOn) ? dateRangeError.message : "",
                        },
                    }}
                />
            </Box>
        </Box>
    );
}

export default withJsonFormsControlProps(TimePickerWithRange);