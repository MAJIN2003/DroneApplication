import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const useGeneratePDF = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = () => {
    if (!contentRef.current) return;

    const input = contentRef.current;
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10; // Margen vertical
    const verticalSpace = 10; // Espacio vertical entre imágenes
    const titleSpace = 10; // Espacio adicional para el título
    let yPos = 30; // Dejar espacio para el título principal

    const imagesPromises: Promise<void>[] = [];

    // Añadir título centrado
    const addTitle = (text: string) => {
      pdf.setFontSize(16);
      pdf.text(text, pdfWidth / 2, yPos, { align: "center" });
      yPos += titleSpace; // Ajustar yPos para dejar espacio después del título
    };

    // Función para agregar una nueva página si es necesario
    const addNewPageIfNeeded = (neededHeight: number) => {
      if (yPos + neededHeight + verticalSpace > pdfHeight) {
        // Si el próximo contenido no cabe en la página actual
        pdf.addPage();
        yPos = 20; // Reiniciar yPos para la nueva página
      }
    };

    // Función para agregar imágenes de una sección
    const addImagesForSection = async (className: string) => {
      const sectionElements = input.querySelectorAll(className);
      const sectionArray = Array.from(sectionElements); // Convertir NodeList a Array
      for (const container of sectionArray) {
        const chartCanvas = container.querySelector("div");
        if (chartCanvas) {
          const canvas = await html2canvas(chartCanvas);
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = 130; // Convertir de px a mm
          const imgHeight = canvas.height * 0.264583-20; // Convertir de px a mm

          addNewPageIfNeeded(imgHeight); // Verificar si es necesario agregar una nueva página

          const xPos = (pdfWidth - imgWidth) / 2; // Calcular posición x para centrar la imagen
          pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);
          yPos += imgHeight + verticalSpace; // Ajustar yPos para la próxima imagen
        }
      }
    };

    // Añadir secciones con títulos
    const addSectionWithTitle = async (title: string, className: string) => {
      addNewPageIfNeeded(titleSpace); // Verificar si es necesario agregar una nueva página antes del título
      addTitle(title);
      await addImagesForSection(className);
    };

    // Añadir las secciones de forma secuencial
    const addSections = async () => {
      await addSectionWithTitle("Reporte de los paneles solares", ".paneles");
      await addSectionWithTitle("Reporte de los UAVS", ".chart-container");
      await addSectionWithTitle("Estación de carga AC", ".cargaAC");
      await addSectionWithTitle("Estación de carga DC", ".cargaDC");
      pdf.save("admin_content.pdf");
    };

    addSections();
  };

  return { contentRef, generatePDF };
};

export default useGeneratePDF;
