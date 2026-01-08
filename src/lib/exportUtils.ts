import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { InventoryItem, statusLabels, formatCurrency, formatDate } from "@/data/inventoryData";

export const exportToExcel = (data: InventoryItem[], filename: string = "inventario") => {
  // Prepare data for Excel
  const excelData = data.map((item) => ({
    "Patrimônio": item.patrimonio,
    "Descrição": item.descricao,
    "Status": statusLabels[item.status],
    "Localização": item.localizacao,
    "Valor (R$)": item.valor,
    "Responsável": item.responsavel || "-",
    "Pendências": item.pendencias ? "Sim" : "Não",
    "Data Aquisição": formatDate(item.dataAquisicao),
    "Secretaria": item.secretaria,
  }));

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const columnWidths = [
    { wch: 15 }, // Patrimônio
    { wch: 35 }, // Descrição
    { wch: 18 }, // Status
    { wch: 20 }, // Localização
    { wch: 15 }, // Valor
    { wch: 20 }, // Responsável
    { wch: 12 }, // Pendências
    { wch: 15 }, // Data Aquisição
    { wch: 15 }, // Secretaria
  ];
  worksheet["!cols"] = columnWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inventário");

  // Generate filename with date
  const date = new Date().toISOString().split("T")[0];
  const fullFilename = `${filename}_${date}.xlsx`;

  // Save file
  XLSX.writeFile(workbook, fullFilename);
};

export const exportToPDF = (data: InventoryItem[], filename: string = "inventario") => {
  // Create PDF document
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Add title
  doc.setFontSize(18);
  doc.setTextColor(88, 28, 135); // Purple color
  doc.text("Sistema de Gestão de Patrimônio", 14, 20);

  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text("Relatório de Inventário - Secretaria de Educação", 14, 28);

  // Add generation date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  doc.text(`Gerado em: ${currentDate}`, 14, 35);

  // Prepare table data
  const tableData = data.map((item) => [
    item.patrimonio,
    item.descricao,
    statusLabels[item.status],
    item.localizacao,
    formatCurrency(item.valor),
    item.responsavel || "-",
    item.pendencias ? "Sim" : "Não",
    formatDate(item.dataAquisicao),
  ]);

  // Add table
  autoTable(doc, {
    startY: 42,
    head: [
      [
        "Patrimônio",
        "Descrição",
        "Status",
        "Localização",
        "Valor",
        "Responsável",
        "Pendências",
        "Data Aquisição",
      ],
    ],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: [139, 92, 246], // Primary purple
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      textColor: [60, 60, 60],
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [245, 243, 255], // Light purple
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 25 },
      1: { cellWidth: 50 },
      2: { halign: "center", cellWidth: 30 },
      3: { cellWidth: 30 },
      4: { halign: "right", cellWidth: 25 },
      5: { cellWidth: 30 },
      6: { halign: "center", cellWidth: 20 },
      7: { halign: "center", cellWidth: 25 },
    },
    margin: { left: 14, right: 14 },
  });

  // Add summary section
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  const totalValue = data.reduce((sum, item) => sum + item.valor, 0);
  const activeItems = data.filter((item) => item.status === "ativo").length;
  const pendingItems = data.filter((item) => item.pendencias).length;

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text("Resumo:", 14, finalY);
  
  doc.setFontSize(10);
  doc.text(`• Total de Itens: ${data.length}`, 14, finalY + 7);
  doc.text(`• Valor Total: ${formatCurrency(totalValue)}`, 14, finalY + 14);
  doc.text(`• Itens Ativos: ${activeItems}`, 14, finalY + 21);
  doc.text(`• Itens com Pendências: ${pendingItems}`, 14, finalY + 28);

  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Página ${i} de ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );
  }

  // Generate filename with date
  const date = new Date().toISOString().split("T")[0];
  const fullFilename = `${filename}_${date}.pdf`;

  // Save file
  doc.save(fullFilename);
};
