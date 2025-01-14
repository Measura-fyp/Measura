// Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Maklumat Supabase
const SUPABASE_URL = 'https://iwtsviyezonayhsxupsr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3dHN2aXllem9uYXloc3h1cHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1NzkzNDMsImV4cCI6MjA1MjE1NTM0M30.dNXxYUjLXIdd8UnvmYuWhrAiEMCIwAnTawOesdZNInY';

// Cipta Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fungsi untuk mendapatkan data dari Supabase
async function fetchMeasurements() {
    const { data, error } = await supabase
        .from('Pengukuran')
        .select('*');

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    console.log('Data fetched successfully:', data);
    displayMeasurements(data);
}

// Fungsi untuk paparkan data dalam jadual HTML
function displayMeasurements(data) {
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');

        const dateCell = document.createElement('td');
        dateCell.textContent = item.tarikh;

        const nameCell = document.createElement('td');
        nameCell.textContent = item.nama;

        const heightCell = document.createElement('td');
        heightCell.textContent = item.ketinggian;

        row.appendChild(dateCell);
        row.appendChild(nameCell);
        row.appendChild(heightCell);

        tableBody.appendChild(row);
    });
}

// Panggil fungsi untuk mendapatkan data
fetchMeasurements();
<script type="module" src="supabase.js"></script>
<table>
    <thead>
        <tr>
            <th>Tarikh</th>
            <th>Nama</th>
            <th>Ketinggian (cm)</th>
        </tr>
    </thead>
    <tbody id="data-table-body">
        <!-- Data akan dipaparkan di sini -->
    </tbody>
</table>
