const sampleDatasets = {
  sales: `Month,Sales,Expenses,Customers
January,12000,8000,150
February,15000,9000,180
March,18000,9500,210
April,14000,8500,165
May,22000,11000,250
June,25000,12000,290
July,21000,10500,240
August,24000,11500,275`,
  titanic: `Class,Survivals,Avg_Age,Avg_Fare
1st Class,136,38,84.15
2nd Class,87,29,20.66
3rd Class,119,25,13.67`,
  grades: `StudyHours,ExamScore,AttendanceRate
2,55,75
5,72,85
8,88,95
1,45,60
10,98,98
4,68,80
7,84,90
3,60,70`
};

export function renderDataVisualizer(container, state, navigateTo) {
  // Mark visualizer as opened in user state
  if (!state.openedVisualizer) {
    state.openedVisualizer = true;
    if (window.saveUserState) window.saveUserState();
  }

  container.innerHTML = `
    <div class="anim-slide-up">
      <div style="margin-bottom: 1.5rem;">
        <h1 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 0.25rem;">
          Interactive Data Visualizer
        </h1>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">
          Load a dataset, select axes, and instantly build charts client-side.
        </p>
      </div>

      <div class="viz-controls">
        
        <!-- Left Panel: Dataset and axes controls -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          
          <!-- Dataset selector -->
          <div class="glass-panel" style="padding: 1.25rem;">
            <div class="form-group">
              <label class="form-label">Select Dataset</label>
              <select id="viz-dataset-select" class="form-select">
                <option value="sales" selected>Tech Sales Trends (Sample)</option>
                <option value="titanic">Titanic Class Survivals (Sample)</option>
                <option value="grades">Study Hours vs Exam Scores (Sample)</option>
                <option value="custom">-- Upload Custom CSV --</option>
              </select>
            </div>
            
            <!-- Custom CSV Drag & Drop Upload (hidden initially) -->
            <div id="viz-upload-zone" class="file-dropzone" style="display: none; margin-top: 1rem;">
              <i data-lucide="upload-cloud" class="file-dropzone-icon"></i>
              <div style="font-size: 0.8rem; font-weight: 600;">Drag & drop CSV here or click</div>
              <div style="font-size: 0.7rem; color: var(--text-muted);">Max size 2MB</div>
              <input type="file" id="viz-csv-file" accept=".csv" />
            </div>
            <div id="file-status" style="font-size: 0.75rem; color: var(--success); margin-top: 0.5rem; display:none;"></div>
          </div>
          
          <!-- Chart configurations -->
          <div class="glass-panel" style="padding: 1.25rem;">
            <h3 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.5px; margin-bottom: 1rem;">
              Chart Configurations
            </h3>
            
            <div class="form-group">
              <label class="form-label">Chart Type</label>
              <select id="viz-chart-type" class="form-select">
                <option value="bar" selected>Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="scatter">Scatter Plot</option>
                <option value="area">Area Chart</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">X-Axis Column</label>
              <select id="viz-x-select" class="form-select">
                <!-- Populated dynamically -->
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Y-Axis Column (Numerical)</label>
              <select id="viz-y-select" class="form-select">
                <!-- Populated dynamically -->
              </select>
            </div>
            
            <button id="viz-generate-btn" class="btn btn-primary w-full" style="margin-top: 0.5rem;">
              <i data-lucide="line-chart" style="width:16px;height:16px;"></i> Draw Chart
            </button>
          </div>
        </div>
        
        <!-- Right Panel: Chart Canvas & Statistics summary -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          
          <!-- Canvas Panel -->
          <div class="glass-panel" style="padding: 1.5rem; display: flex; flex-direction: column; min-height: 400px;">
            <div class="chart-container" style="flex: 1;">
              <canvas id="viz-chart-canvas"></canvas>
              <div id="viz-placeholder" class="chart-placeholder">
                <i data-lucide="pie-chart" style="width: 48px; height: 48px; color: var(--text-muted);"></i>
                <span>Select fields and click "Draw Chart" to visualize.</span>
              </div>
            </div>
          </div>
          
          <!-- Statistical summary panel -->
          <div class="glass-panel" style="padding: 1.25rem;">
            <h3 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.5px; margin-bottom: 0.75rem;">
              Statistical Insights (Y-Axis Column)
            </h3>
            <div class="table-responsive">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody id="viz-stats-body">
                  <tr><td colspan="2" style="text-align: center; color:var(--text-muted); font-style:italic;">No data loaded</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;

  // UI bindings
  const datasetSelect = document.getElementById('viz-dataset-select');
  const uploadZone = document.getElementById('viz-upload-zone');
  const fileInput = document.getElementById('viz-csv-file');
  const fileStatus = document.getElementById('file-status');
  
  const chartTypeSelect = document.getElementById('viz-chart-type');
  const xSelect = document.getElementById('viz-x-select');
  const ySelect = document.getElementById('viz-y-select');
  const generateBtn = document.getElementById('viz-generate-btn');
  
  const chartCanvas = document.getElementById('viz-chart-canvas');
  const chartPlaceholder = document.getElementById('viz-placeholder');
  const statsBody = document.getElementById('viz-stats-body');

  let currentParsedData = null; // { headers: [], data: [] }
  let chartInstance = null;

  // Initial load
  loadData(sampleDatasets.sales);

  // Selector listener
  datasetSelect.addEventListener('change', () => {
    const val = datasetSelect.value;
    if (val === 'custom') {
      uploadZone.style.display = 'flex';
      fileStatus.style.display = 'none';
      currentParsedData = null;
      xSelect.innerHTML = '';
      ySelect.innerHTML = '';
      clearChart();
    } else {
      uploadZone.style.display = 'none';
      fileStatus.style.display = 'none';
      loadData(sampleDatasets[val]);
    }
  });

  // File Upload listener
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    fileStatus.textContent = `File loaded: ${file.name} (${Math.round(file.size / 1024)} KB)`;
    fileStatus.style.display = 'block';

    const reader = new FileReader();
    reader.onload = function(evt) {
      loadData(evt.target.result);
    };
    reader.readAsText(file);
  });

  // Generate Chart Action
  generateBtn.addEventListener('click', () => {
    drawChart();
  });

  // Simple CSV parser
  function parseCSV(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length === 0) return { headers: [], data: [] };
    
    const parseLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };
    
    const headers = parseLine(lines[0]);
    const data = lines.slice(1).map(line => {
      const values = parseLine(line);
      const row = {};
      headers.forEach((h, idx) => {
        let val = values[idx];
        if (val !== undefined) {
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.substring(1, val.length - 1);
          }
          const num = Number(val);
          row[h] = isNaN(num) || val === '' ? val : num;
        } else {
          row[h] = null;
        }
      });
      return row;
    });
    
    return { headers, data };
  }

  // Load dataset representation
  function loadData(csvText) {
    try {
      const parsed = parseCSV(csvText);
      if (parsed.headers.length === 0) throw new Error("Empty CSV file.");
      
      currentParsedData = parsed;

      // Populate axis selects
      xSelect.innerHTML = parsed.headers.map(h => `<option value="${h}">${h}</option>`).join('');
      
      // Filter numerical columns for Y axis
      const numericCols = parsed.headers.filter(h => {
        return parsed.data.some(row => typeof row[h] === 'number');
      });
      
      const targetYCols = numericCols.length > 0 ? numericCols : parsed.headers;
      ySelect.innerHTML = targetYCols.map(h => `<option value="${h}">${h}</option>`).join('');
      
      // Auto-select columns
      if (xSelect.options.length > 0) xSelect.selectedIndex = 0;
      if (ySelect.options.length > 0) {
        if (ySelect.options.length > 1 && xSelect.options[0].value === ySelect.options[0].value) {
          ySelect.selectedIndex = 1;
        } else {
          ySelect.selectedIndex = 0;
        }
      }

      // Draw initial default chart
      drawChart();
    } catch (err) {
      alert("Error loading data: " + err.message);
    }
  }

  function clearChart() {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
    chartCanvas.style.display = 'none';
    chartPlaceholder.style.display = 'flex';
    statsBody.innerHTML = `<tr><td colspan="2" style="text-align: center; color:var(--text-muted); font-style:italic;">No data loaded</td></tr>`;
  }

  // Render visual chart
  function drawChart() {
    if (!currentParsedData) {
      alert("Please select or upload a dataset first!");
      return;
    }

    const xCol = xSelect.value;
    const yCol = ySelect.value;
    const chartType = chartTypeSelect.value;

    if (!xCol || !yCol) {
      alert("Please select X and Y columns.");
      return;
    }

    // Hide placeholder, show canvas
    chartPlaceholder.style.display = 'none';
    chartCanvas.style.display = 'block';

    // Aggregate values
    const labels = currentParsedData.data.map(r => r[xCol]);
    const values = currentParsedData.data.map(r => r[yCol]);

    // Descriptive stats
    calculateDescriptiveStats(values, yCol);

    if (chartInstance) {
      chartInstance.destroy();
    }

    // Configure dataset colors based on chart types
    let backgroundColors = 'rgba(99, 102, 241, 0.4)';
    let borderColors = 'rgba(99, 102, 241, 1)';
    
    if (chartType === 'line' || chartType === 'area') {
      backgroundColors = 'rgba(6, 182, 212, 0.15)';
      borderColors = 'rgba(6, 182, 212, 1)';
    }

    const config = {
      type: chartType === 'area' ? 'line' : chartType,
      data: {
        labels: labels,
        datasets: [{
          label: yCol,
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 2,
          fill: chartType === 'area',
          tension: 0.35,
          pointBackgroundColor: borderColors,
          pointBorderColor: '#ffffff',
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#f8fafc',
              font: { family: 'Outfit', size: 12 }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8', font: { family: 'Outfit' } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8', font: { family: 'Outfit' } }
          }
        }
      }
    };

    chartInstance = new Chart(chartCanvas, config);
  }

  // Calculate descriptive stats
  function calculateDescriptiveStats(arr, colName) {
    const numValues = arr.filter(v => typeof v === 'number' && !isNaN(v));
    if (numValues.length === 0) {
      statsBody.innerHTML = `<tr><td colspan="2" style="text-align: center; color:var(--text-muted);">Selected Y column does not contain numerical entries.</td></tr>`;
      return;
    }

    const count = numValues.length;
    const min = Math.min(...numValues);
    const max = Math.max(...numValues);
    const sum = numValues.reduce((a, b) => a + b, 0);
    const mean = Number((sum / count).toFixed(2));
    
    // Median
    const sorted = [...numValues].sort((a, b) => a - b);
    const midIdx = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[midIdx] : Number(((sorted[midIdx - 1] + sorted[midIdx]) / 2).toFixed(2));
    
    // Standard deviation
    const squareDiffs = numValues.map(v => Math.pow(v - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / count;
    const stdDev = Number(Math.sqrt(avgSquareDiff).toFixed(2));

    statsBody.innerHTML = `
      <tr>
        <td>Record Count (N)</td>
        <td style="font-weight: 600; color: var(--text-primary);">${count} rows</td>
      </tr>
      <tr>
        <td>Sum total</td>
        <td style="font-weight: 600; color: var(--text-primary);">${sum.toLocaleString()}</td>
      </tr>
      <tr>
        <td>Arithmetic Mean (&mu;)</td>
        <td style="font-weight: 600; color: var(--primary);">${mean.toLocaleString()}</td>
      </tr>
      <tr>
        <td>Median (50th percentile)</td>
        <td style="font-weight: 600; color: var(--secondary);">${median.toLocaleString()}</td>
      </tr>
      <tr>
        <td>Standard Deviation (&sigma;)</td>
        <td style="font-weight: 600; color: var(--text-secondary);">${stdDev}</td>
      </tr>
      <tr>
        <td>Min / Max Bounds</td>
        <td style="font-weight: 600; color: var(--text-secondary);">${min.toLocaleString()} to ${max.toLocaleString()}</td>
      </tr>
    `;
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
