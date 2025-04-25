
// Convierte "HH:MM:SS" a un objeto Date con la fecha actual o una específica
export const timeStringToDate = (timeString: string): Date => {
    // Obtener la fecha actual si no se proporciona una fecha
    const now = new Date();
    const [day, month, year] = [now.getDate(), now.getMonth() + 1, now.getFullYear()];
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    // Crear la fecha con new Date()
    const newDate = new Date(year, month - 1, day, hours, minutes, seconds);

    return isNaN(newDate.getTime()) ? new Date() : newDate;
};
