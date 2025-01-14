const supabaseUrl = "https://iwtsviyezonayhsxupsr.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3dHN2aXllem9uYXloc3h1cHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1NzkzNDMsImV4cCI6MjA1MjE1NTM0M30.dNXxYUjLXIdd8UnvmYuWhrAiEMCIwAnTawOesdZNInY";
const tableBody = document.getElementById('table-body');

// Fungsi untuk tarik data dari Supabase
async function fetchData() {
  const response = await fetch(`${supabaseUrl}/rest/v1/Pengukuran`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`
    }
  });

  const data = await response.json();
  renderTable(data);
}

// Fungsi untuk papar data dalam jadual
function renderTable(data) {
  tableBody.innerHTML = '';
  data.forEach((item, index) => {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${item.tarikh}</td>
        <td>${item.nama}</td>
        <td>${item.ketinggian}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Panggil fungsi fetchData
fetchData();
