import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
    previousAutoTable: {
      finalY: number;
    };
  }
}

export const exportToPDF = async (
  _admissionsData: any, // Added underscore to indicate intentionally unused parameter
  resources: Array<{
    name: string;
    current: number;
    forecast: number;
    capacity: number;
  }>,
  dashboardInfo: {
    hospitalName: string;
    date: string;
    metrics: any;
    staffing: any;
    wardManagement: any;
  }
) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.width;

  // Header
  pdf.setFontSize(20);
  pdf.text('Hospital Dashboard Report', pageWidth / 2, 15, { align: 'center' });
  pdf.setFontSize(12);
  pdf.text(`${dashboardInfo.hospitalName} - ${dashboardInfo.date}`, pageWidth / 2, 22, { align: 'center' });

  // Key Metrics
  pdf.setFontSize(14);
  pdf.text('Key Metrics', 14, 35);
  const metrics = [
    ['Forecasted Admissions', `${dashboardInfo.metrics.forecasted_admissions.value} (${dashboardInfo.metrics.forecasted_admissions.change})`],
    ['ICU Beds', `${dashboardInfo.metrics.icu_beds.value} (${dashboardInfo.metrics.icu_beds.detail})`],
    ['Staff Needed', `${dashboardInfo.metrics.staff_needed.value} (${dashboardInfo.metrics.staff_needed.detail})`],
    ['Avg. Length of Stay', `${dashboardInfo.metrics.avg_los.value} ${dashboardInfo.metrics.avg_los.unit}`]
  ];
  
  // Update autoTable calls to use correct UserOptions type
  pdf.autoTable({
    startY: 40,
    head: [['Metric', 'Value']],
    body: metrics,
    theme: 'grid',
    margin: { top: 40 }
  } as UserOptions);

  // Resource Utilization
  pdf.text('Resource Utilization', 14, pdf.previousAutoTable.finalY + 15);
  const resourceData = resources.map(resource => [
    resource.name,
    `${resource.current}/${resource.capacity} (${((resource.current/resource.capacity)*100).toFixed(1)}%)`
  ]);
  
  pdf.autoTable({
    startY: pdf.previousAutoTable.finalY + 20,
    head: [['Resource', 'Utilization']],
    body: resourceData,
    theme: 'grid',
    margin: { top: 20 }
  } as UserOptions);

  // Staff Management
  pdf.text('Staff Management', 14, pdf.previousAutoTable.finalY + 15);
  const staffData = [
    ['Current Staff', dashboardInfo.staffing.current],
    ['Staff Needed', dashboardInfo.staffing.needed],
    ['Utilization', dashboardInfo.staffing.utilization]
  ];
  
  pdf.autoTable({
    startY: pdf.previousAutoTable.finalY + 20,
    head: [['Metric', 'Value']],
    body: staffData,
    theme: 'grid'
  });

  // Ward Management
  pdf.text('Ward Management', 14, pdf.previousAutoTable.finalY + 15);
  const wardData = [
    ['Total ICU Beds', dashboardInfo.wardManagement.icuBeds.total],
    ['Occupied ICU Beds', dashboardInfo.wardManagement.icuBeds.occupied],
    ['Available ICU Beds', dashboardInfo.wardManagement.icuBeds.available],
    ['Average Stay Duration', `${dashboardInfo.wardManagement.avgStayDuration} days`]
  ];
  
  pdf.autoTable({
    startY: pdf.previousAutoTable.finalY + 20,
    head: [['Metric', 'Value']],
    body: wardData,
    theme: 'grid'
  });

  // Save the PDF
  pdf.save('hospital-dashboard-report.pdf');
};