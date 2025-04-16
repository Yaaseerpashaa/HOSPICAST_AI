import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { supabase } from '../lib/supabase';

export const exportDashboard = async () => {
  try {
    // Capture all required sections
    const sections = [
      'dashboard-main',
      'patient-stats',
      'forecast-graph',
      'staff-overview',
      'ward-status'
    ];

    const images = await Promise.all(
      sections.map(async (id) => {
        const element = document.getElementById(id);
        if (!element) return null;
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
        });
        return canvas.toDataURL('image/png');
      })
    );

    // Get raw data
    const [patientData, forecastData, staffData, wardData] = await Promise.all([
      supabase.from('patients').select('*'),
      supabase.from('forecasts').select('*'),
      supabase.from('staff').select('*'),
      supabase.from('wards').select('*')
    ]);

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: 'a4'
    });

    // Add dashboard images
    images.forEach((image, index) => {
      if (image) {
        if (index > 0) pdf.addPage();
        pdf.addImage(image, 'PNG', 20, 20, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 40);
      }
    });

    // Add data tables
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.text('Raw Data Reports', 20, 20);

    // Add each dataset
    const datasets = [
      { title: 'Patient Data', data: patientData.data },
      { title: 'Forecast Data', data: forecastData.data },
      { title: 'Staff Data', data: staffData.data },
      { title: 'Ward Status', data: wardData.data }
    ];

    let yPos = 40;
    datasets.forEach(({ title, data }) => {
      pdf.setFontSize(14);
      pdf.text(title, 20, yPos);
      yPos += 20;

      if (data) {
        const headers = Object.keys(data[0] || {});
        pdf.setFontSize(10);
        headers.forEach((header, i) => {
          pdf.text(header, 20 + (i * 80), yPos);
        });

        yPos += 15;
        data.forEach(row => {
          if (yPos > pdf.internal.pageSize.height - 20) {
            pdf.addPage();
            yPos = 40;
          }
          headers.forEach((header, i) => {
            pdf.text(String(row[header]), 20 + (i * 80), yPos);
          });
          yPos += 10;
        });
        yPos += 20;
      }
    });

    // Save the PDF
    pdf.save(`Hospital_Complete_Report_${new Date().toLocaleDateString()}.pdf`);

  } catch (error) {
    console.error('Error generating report:', error);
    throw error;
  }
};