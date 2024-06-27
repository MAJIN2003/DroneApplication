import moment from "moment";

const LabelsFecha = (fechas: string[]): string[] => {
  if (fechas.length === 0) {
    return [];
  }

  const firstDate = moment.utc(fechas[0]);
  const lastDate = moment.utc(fechas[fechas.length - 1]);

  if (firstDate.isSame(lastDate, "day")) {
    return fechas.map((fecha) => moment.utc(fecha).format("HH:mm"));
  }

  if (firstDate.isSame(lastDate, "month")) {
    return fechas.map((fecha) => moment.utc(fecha).format("DD HH:mm"));
  }

  return fechas.map((fecha) => moment.utc(fecha).format("DD/MM HH:mm"));
};

export default LabelsFecha;
