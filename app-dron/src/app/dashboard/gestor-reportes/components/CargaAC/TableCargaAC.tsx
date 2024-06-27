"use client";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import { EstacionCargaACResponse } from "../../interfaces/findReports/estacion-carga-ac.interface";

interface PropsTable {
  uvs: EstacionCargaACResponse;
  onPagination: (page: number) => void;
}

const TableCargaAC = ({ uvs, onPagination }: PropsTable) => {
  const { data: reports, pagination } = uvs;
  const [page, setPage] = useState(pagination.page);

  useEffect(() => {
    onPagination(page);
  }, [page]);

  return (
    <section className="container px-4 mx-auto">
      {/* 
      <div className="flex justify-between gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">ESTACION DE CARGA</h2>
      </div> */}

      <div className="flex flex-col mt-6 max-h-[500px]">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              {reports.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Corriente
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Potencia
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200  ">
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {report.fecha_registro}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {report.corrienteAC}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {report.potenciaAC}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="w-full items-center justify-center flex flex-col h-60">
                  <h1 className="mt-3 text-lg text-gray-800 ">
                    No se encontraron registros
                  </h1>
                  <p className="mt-2 text-gray-500 ">
                    Intenta con otro rango de fechas
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {reports.length > 0 && pagination.pages > 1 && (
          <div className="flex w-full justify-center mt-4">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pagination.pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default TableCargaAC;
