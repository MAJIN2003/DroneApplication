"use client";
import { useEffect, useState } from "react";
import { UAVResponse } from "../../interfaces/findReports/uav.interface";
import { Pagination } from "@nextui-org/react";

interface PropsTable {
  uvs: UAVResponse;
  onPagination: (page: number) => void;
}

const TableUAV = ({ uvs, onPagination }: PropsTable) => {
  const { data: reports, pagination } = uvs;
  const [page, setPage] = useState(pagination.page);

  useEffect(() => {
    onPagination(page);
  }, [page]);

  return (
    <section className="container px-4 mx-auto">
      <div className="flex justify-between gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Control UAV</h2>
      </div>

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
                        Voltaje
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
                        Altitud
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Modo de vuelo
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Velocidad
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Latitud
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Longitud
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200  ">
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {report.voltaje}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {report.corriente}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {report.altitud}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {report.modo_vuelo}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {report.velocidad}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {report.latitud}
                        </td>
                        <td className="py-3.5 px-4 text-sm text-gray-500">
                          {report.longitud}
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

export default TableUAV;
