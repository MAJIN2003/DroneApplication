"use client";
import { useAuthStore } from "@/app/(auth)/stores/authStore";
import useGeneratePDF from "@/shared/hooks/useGeneratePDF";
import SeccionPanelSolares from "../components/PanelesSolares/SeccionPanelSolares";
import SeccionUAV from "../components/UAV/SeccionUAV";
import SeccionCargaAC from "../components/CargaAC/SeccionCargaAC";
import SeccionCargaDC from "../components/CargaDC/SeccionCargaDC";

const GestorReportesPage: React.FC = () => {
  const { user } = useAuthStore();

  const { contentRef, generatePDF } = useGeneratePDF();

  return (
    <div className="h-full flex flex-col gap-4" ref={contentRef}>
      {user.role === "admin" && (
        <>
          <div className="bg-sky-900 p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl text-white font-semibold text-center">
              PANELES SOLARES
            </h1>
          </div>
          <SeccionPanelSolares generatePDF={generatePDF} />
        </>
      )}

      <div className="bg-sky-900 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl text-white font-semibold text-center">UAVS</h1>
      </div>
      <SeccionUAV />

      {user.role === "admin" && (
        <>
          <div className="bg-sky-900 p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl text-white font-semibold text-center">
              ESTACIÓN DE CARGA AC
            </h1>
          </div>
          <SeccionCargaAC />
          <div className="bg-sky-900 p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl text-white font-semibold text-center">
              ESTACIÓN DE CARGA DC
            </h1>
          </div>
          <SeccionCargaDC />
        </>
      )}

      {/* <div className="flex flex-row gap-4">
        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg">
          <TablePanelesSolares reports={reports} />
        </div>
        <div className="w-1/3 gap-4 flex flex-col">
          <div className="bg-white p-4 rounded-lg shadow-lg">d</div>
          <div className="bg-white p-4 rounded-lg shadow-lg">d</div>
          <div className="bg-white p-4 rounded-lg shadow-lg">d</div>
        </div>
      </div> */}
    </div>
  );
};

export default GestorReportesPage;
