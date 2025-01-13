// Import supabase client
const supabaseUrl = 'https://iwtsviyezonayhsxupsr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3dHN2aXllem9uYXloc3h1cHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1NzkzNDMsImV4cCI6MjA1MjE1NTM0M30.dNXxYUjLXIdd8UnvmYuWhrAiEMCIwAnTawOesdZNInY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Function to fetch data from Supabase
async function fetchData() {
  let { data, error } = await supabase
    .from('PENGUKURAN')
    .select('*');

  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Data fetched:', data);
    displayData(data);
  }
}

// Function to display data in HTML table
function displayData(data) {
  const tableBody = document.getElementById('data-table-body');
  tableBody.innerHTML = '';

  data.forEach((row) => {
    const tableRow = `
      <tr>
        <td>${row.TARIKH}</td>
        <td>${row.NAMA}</td>
        <td>${row.KETINGGIAN}</td>
      </tr>
    `;
    tableBody.innerHTML += tableRow;
  });
}

// Call the fetchData function on page load
fetchData();
