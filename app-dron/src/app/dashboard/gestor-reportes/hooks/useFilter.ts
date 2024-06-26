import { useEffect, useState } from "react";
import useDrone from "../../drone/hooks/useDrone";
import { TIPO_DRON } from "../../drone/constantes/dronConstantes";

interface FilterProps {
  handlerResetReports: () => void;
}

const useFilter = ({ handlerResetReports }: FilterProps) => {
  const { drones } = useDrone();
  const [optionsDrones, setOptionsDrones] = useState<
    { value: string; label: string }[]
  >([{ value: "", label: "Seleccionar dron..." }]);
  const [filterDrone, setFilterDrone] = useState<string>("");

  useEffect(() => {
    if (drones?.data.length) {
      const options = drones.data.map((dron) => ({
        value: dron.id.toString(),
        label: dron.id + " - " + dron.nombre,
      }));
      setOptionsDrones([
        { value: "", label: "Seleccionar dron..." },
        ...options,
      ]);
    }
  }, [drones]);

  const handleChangeDrone = (value: string) => {
    setFilterDrone(value);
    handlerResetReports();
  };

  const optionsFilterDate = [
    { value: "hoy", label: "Ultimos registros" },
    { value: "diario", label: "Diario" },
    { value: "semanal", label: "Semanal" },
    { value: "mensual", label: "Mensual" },
    { value: "personalizado", label: "Personalizado" },
  ];

  const [filterDate, setFilterDate] = useState<string>("hoy");

  const handleChangeDate = (value: string) => {
    setFilterDate(value);
    handlerResetReports();
  };

  return {
    optionsFilterDate,
    filterDate,
    handleChangeDate,
    optionsDrones,
    filterDrone,
    handleChangeDrone,
  };
};

export default useFilter;
