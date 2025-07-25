import React from 'react'

const PrintableTimetable = ({ timetable, timeSlots, days }) => {
  const getCellKey = (day, time) => `${day}-${time}`

  const generatePrintableHTML = () => {
    const currentDate = new Date().toLocaleDateString()
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>My Timetable - ${currentDate}</title>
    <style>
        @page {
            margin: 1in;
            size: landscape;
        }
        
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
            color: black;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 20px;
        }
        
        .header h1 {
            margin: 0;
            color: #3b82f6;
            font-size: 2rem;
        }
        
        .header p {
            margin: 10px 0 0 0;
            color: #64748b;
            font-size: 1rem;
        }
        
        .timetable {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .timetable th,
        .timetable td {
            border: 1px solid #e2e8f0;
            padding: 12px 8px;
            text-align: center;
            vertical-align: middle;
        }
        
        .timetable th {
            background: #3b82f6;
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .time-slot {
            background: #f1f5f9;
            font-weight: 600;
            color: #475569;
            width: 100px;
        }
        
        .timetable td {
            background: #fafafa;
            min-height: 50px;
            height: 50px;
            font-size: 0.875rem;
        }
        
        .subject-cell {
            position: relative;
            font-weight: 500;
        }
        
        .empty-cell {
            color: #94a3b8;
            font-style: italic;
        }
        
        .footer {
            margin-top: 30px;
            text-align: center;
            color: #64748b;
            font-size: 0.875rem;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
        }
        
        @media print {
            body {
                padding: 0;
            }
            
            .no-print {
                display: none !important;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📅 My Weekly Timetable</h1>
        <p>Generated on ${currentDate}</p>
    </div>
    
    <table class="timetable">
        <thead>
            <tr>
                <th>Time</th>
                ${days.map(day => `<th>${day}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            ${timeSlots.map(time => `
                <tr>
                    <td class="time-slot">${time}</td>
                    ${days.map(day => {
                        const key = getCellKey(day, time)
                        const subject = timetable[key] || ''
                        return `<td class="subject-cell ${!subject ? 'empty-cell' : ''}">${subject || '—'}</td>`
                    }).join('')}
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    <div class="footer">
        <p>Created with Time Table Maker</p>
        <p>Print this page or save as PDF for offline use</p>
    </div>
</body>
</html>`
  }

  const downloadPrintable = () => {
    const htmlContent = generatePrintableHTML()
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `timetable-${new Date().toISOString().split('T')[0]}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const openPrintPreview = () => {
    const htmlContent = generatePrintableHTML()
    const printWindow = window.open('', '_blank')
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    
    // Auto-trigger print dialog after content loads
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
  }

  return {
    downloadPrintable,
    openPrintPreview
  }
}

export default PrintableTimetable
