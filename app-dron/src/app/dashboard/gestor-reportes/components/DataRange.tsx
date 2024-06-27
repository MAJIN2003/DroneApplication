"use client";

import { DateRangePicker, DateValue, RangeValue } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FindReportsRequestDays } from "../interfaces/findReports/paneles-solares.interface";
import { toast } from "react-toastify";

interface DateRangePickerProps {
  date: RangeValue<DateValue> | null;
  setDate: Dispatch<SetStateAction<RangeValue<DateValue> | null>>;
}

const DataRange = ({ date, setDate }: DateRangePickerProps) => {  
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <DateRangePicker
        label="Seleccione el rango de fecha"
        value={date}
        onChange={setDate}
      />
    </div>
  );
};

export default DataRange;
