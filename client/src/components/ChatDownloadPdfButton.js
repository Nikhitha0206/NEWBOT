import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ChatDownloadPdfButton = ({ messages }) => {
  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Chat Conversation', 14, 20);

    const rows = messages.map((msg, index) => {
      const sender = msg.role === 'user' ? 'User' : msg.role === 'model' ? 'AI' : msg.role;
      const text = msg.parts && msg.parts.length > 0 ? msg.parts[0].text : '';
      const timestamp = msg.timestamp ? new Date(msg.timestamp).toLocaleString() : '';
      return [sender, text, timestamp];
    });

    doc.autoTable({
      head: [['Sender', 'Message', 'Timestamp']],
      body: rows,
      startY: 30,
      styles: { fontSize: 10, cellWidth: 'wrap' },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 120 },
        2: { cellWidth: 40 },
      },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('chat_conversation.pdf');
  };

  return (
    <button onClick={handleDownloadPdf} title="Download chat as PDF" aria-label="Download chat as PDF">
      Download Chat as PDF
    </button>
  );
};

export default ChatDownloadPdfButton;
