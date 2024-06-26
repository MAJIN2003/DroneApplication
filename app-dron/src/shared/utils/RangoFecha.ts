import moment from "moment";

const obtenerRangoFecha = (fechas: string[]):string => {
    if (fechas.length === 0) {
        return '';
    } else if (fechas.length === 1) {
        // Si hay solo una fecha, retornar esa fecha
        return moment.utc(fechas[0]).format('DD/MM/YYYY');
    } else {
        // Ordenar las fechas en orden ascendente
        const fechasOrdenadas = fechas.map(fecha => moment.utc(fecha)).sort((a, b) => a.valueOf() - b.valueOf());
        
        // Obtener la fecha más temprana y la fecha más reciente
        const fechaInicio = fechasOrdenadas[0].format('DD/MM/YYYY');
        const fechaFin = fechasOrdenadas[fechasOrdenadas.length - 1].format('DD/MM/YYYY');
        
        // Si son del mismo día, mostrar solo ese día
        if (fechaInicio === fechaFin) {
            return fechaInicio;
        } else {
            return `${fechaInicio} - ${fechaFin}`;
        }
    }
}

export default obtenerRangoFecha;