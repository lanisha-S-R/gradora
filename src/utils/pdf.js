import jsPDF from 'jspdf';
import { formatDate, formatNumber } from './formatters';

export function exportSemesterPdf(record, cgpa) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('GRADORA Academic Report', 14, 18);

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');

  let y = 40;
  doc.text(`Semester: ${record.semesterName}`, 14, y);
  y += 8;
  doc.text(`Generated: ${formatDate(record.savedAt)}`, 14, y);
  y += 8;
  doc.text(`SGPA: ${formatNumber(record.sgpa)}`, 14, y);
  y += 8;
  doc.text(`CGPA: ${formatNumber(cgpa)}`, 14, y);
  y += 8;
  doc.text(`Credits Earned: ${formatNumber(record.earnedCredits, 1)}`, 14, y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.text('Subjects', 14, y);
  y += 8;

  const columns = [
    { x: 14, title: 'Code' },
    { x: 42, title: 'Subject' },
    { x: 132, title: 'Credit' },
    { x: 154, title: 'Grade' },
    { x: 178, title: 'Point' },
  ];

  columns.forEach((col) => doc.text(col.title, col.x, y));
  y += 4;
  doc.line(14, y, 196, y);
  y += 8;

  doc.setFont('helvetica', 'normal');

  record.subjects.forEach((subject) => {
    if (y > 275) {
      doc.addPage();
      y = 20;
    }

    doc.text(subject.code, 14, y);
    doc.text(subject.name.slice(0, 45), 42, y);
    doc.text(String(subject.credit), 132, y);
    doc.text(subject.grade, 154, y);
    doc.text(String(subject.point), 178, y);
    y += 8;
  });

  y += 8;
  doc.line(14, y, 196, y);
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Credits: ${formatNumber(record.totalCredits, 1)}`, 14, y);
  y += 8;
  doc.text(`Total Weighted Points: ${formatNumber(record.totalWeightedPoints, 2)}`, 14, y);

  doc.save(`${record.semesterName.replace(/\s+/g, '_')}_report.pdf`);
}
