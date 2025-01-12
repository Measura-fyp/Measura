const heights = [
    { timestamp: '2025-01-12 08:00', height: 170 },
    { timestamp: '2025-01-12 09:00', height: 172 },
    // Tambahkan data lain di sini
  ];
  
  // Fungsi untuk memaparkan data dalam jadual
  function getData() {
    const table = document.getElementById('heightsTable');
    heights.forEach(height => {
      let row = table.insertRow();
      row.insertCell(0).innerHTML = height.timestamp;
      row.insertCell(1).innerHTML = height.height;
    });
  }
  
  // Fungsi untuk muat turun data
  function exportToCSV() {
    let csvContent = "Timestamp,Height (cm)\n";
    heights.forEach(height => {
      csvContent += `${height.timestamp},${height.height}\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'heights.csv';
    link.click();
  }
  
  // Panggil fungsi getData untuk memaparkan data apabila halaman dimuat
  getData();
  