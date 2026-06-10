import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function downloadCurriculumPDF(curriculum, teacherName, college) {
  const doc = new jsPDF();

  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, 210, 60, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("EduCanvas", 15, 25);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("AI-Powered Curriculum Platform", 15, 33);

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(curriculum.title, 15, 80);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Level: ${curriculum.level}`, 15, 92);
  doc.text(`Weekly Hours: ${curriculum.weeklyHours || "N/A"}`, 15, 100);
  doc.text(`Industry Focus: ${curriculum.industryFocus || "General"}`, 15, 108);
  doc.text(`Teacher: ${teacherName}`, 15, 116);
  doc.text(`College: ${college}`, 15, 124);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 15, 132);

  const semesters = curriculum.semesterData || curriculum.semesters || [];
  semesters.forEach((sem) => {
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246);
    doc.text(`Semester ${sem.semester}`, 15, 20);

    const tableData = sem.courses.map((c) => [
      c.code,
      c.name,
      `${c.credits} Cr`,
      c.topics.join(", "),
    ]);

    autoTable(doc, {
      startY: 28,
      head: [["Code", "Course Name", "Credits", "Topics"]],
      body: tableData,
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      columnStyles: { 3: { cellWidth: 80 } },
    });
  });

  doc.addPage();
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(59, 130, 246);
  doc.text("Capstone Project", 15, 20);
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(curriculum.capstoneProject || "", 180);
  doc.text(lines, 15, 32);

  const filename = `${(curriculum.skill || "curriculum").replace(/\s+/g, "_")}_curriculum.pdf`;
  doc.save(filename);
}
