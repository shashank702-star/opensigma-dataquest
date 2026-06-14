const sampleDatasets = {
  sales: `Month,Sales,Expenses,Category
January,12000,8000,Hardware
February,,9000,Software
March,18000,,Software
January,12000,8000,Hardware
April,14000,8500,
May,22000,11000,Hardware
June,25000,12000,Software
June,25000,12000,Software
July,,10500,Hardware
August,24000,11500,Software`,

  inventory: `Product ID,Name,Price,Stock
P101, Laptop , 1299.99 , 15
P102, Wireless Mouse , , 120
P103, Mechanical Keyboard , 89.99 , 45
P101, Laptop , 1299.99 , 15
P104, Ergonomic Chair , 249.00 , -5
P105, Water Bottle , 15.99 , 80
P106, Desk Lamp , , -10`
};

export function renderCsvCleaner(container, state, navigateTo) {
  // Cleaner internal state
  let rawData = null;       // Original parsed data { headers: [], data: [] }
  let cleanedData = null;   // Active data { headers: [], data: [] }
  let currentFileName = "sample_sales.csv";
  let actionLogs = [];

  container.innerHTML = `
    <div class="anim-slide-up" style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem;">
          Interactive <span class="text-gradient">CSV Cleaner</span>
        </h1>
        <p style="color: var(--text-secondary); font-size: 1rem;">
          Inspect datasets, filter duplicate rows, fill missing values, format data types, and prepare clean outputs for charts and code scripts.
        </p>
      </div>

      <div class="cleaner-grid" style="display: grid; grid-template-columns: 0.75fr 1.25fr; gap: 1.5rem; align-items: start;">
        
        <!-- LEFT COLUMN: Cleaning Actions Dashboard -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Dataset Loader -->
          <div class="glass-panel section-card">
            <div class="form-group">
              <label class="form-label">Select Messy Dataset</label>
              <select id="cleaner-dataset-select" class="form-select" style="background: rgba(8,12,20,0.4);">
                <option value="sales" selected>Messy Tech Sales (Sample)</option>
                <option value="inventory">Messy Shop Inventory (Sample)</option>
                <option value="custom">-- Upload Custom CSV --</option>
              </select>
            </div>
            
            <!-- Custom CSV Upload zone -->
            <div id="cleaner-upload-zone" class="file-dropzone" style="display: none; margin-top: 1rem; padding: 1.5rem 1rem;">
              <i data-lucide="upload-cloud" class="file-dropzone-icon" style="width:32px; height:32px;"></i>
              <div style="font-size: 0.75rem; font-weight: 600;">Drag & drop CSV or click</div>
              <input type="file" id="cleaner-csv-file" accept=".csv" />
            </div>
          </div>

          <!-- Column Selector Panel -->
          <div class="glass-panel section-card">
            <h3 class="card-title" style="margin-bottom: 0.75rem; font-size: 0.95rem; display: flex; align-items: center; justify-content: space-between;">
              <span>Select Columns to Keep</span>
              <span id="columns-count-label" style="font-size: 0.7rem; color: var(--text-muted);">0 columns</span>
            </h3>
            <div id="cleaner-column-list" style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 150px; overflow-y: auto; padding: 0.25rem 0;">
              <!-- Dynamic checkboxes -->
              <span style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">No dataset loaded</span>
            </div>
            <button id="apply-column-drop-btn" class="btn btn-secondary w-full" style="font-size: 0.75rem; padding: 0.45rem; margin-top: 0.75rem;">
              Drop Unchecked Columns
            </button>
          </div>

          <!-- Cleaning Operations Panel -->
          <div class="glass-panel section-card" style="display: flex; flex-direction: column; gap: 1rem;">
            <h3 class="card-title" style="font-size: 0.95rem; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">
              Data Cleaning Operations
            </h3>

            <!-- Handle Duplicates & Spaces -->
            <div>
              <div style="font-weight: 700; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">Row & Text Integrity</div>
              <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                <button id="op-remove-duplicates" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.5rem; justify-content: flex-start; text-align: left;">
                  <i data-lucide="copy-slash" style="width: 14px; height: 14px; color: var(--secondary);"></i> Remove Duplicate Rows
                </button>
                <button id="op-trim-strings" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.5rem; justify-content: flex-start; text-align: left;">
                  <i data-lucide="align-horizontal-distribute-center" style="width: 14px; height: 14px; color: var(--secondary);"></i> Trim Whitespaces
                </button>
                <button id="op-uppercase-text" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.5rem; justify-content: flex-start; text-align: left;">
                  <i data-lucide="arrow-up-z-a" style="width: 14px; height: 14px; color: var(--secondary);"></i> Convert Strings to UPPERCASE
                </button>
              </div>
            </div>

            <!-- Handle Missing values -->
            <div>
              <div style="font-weight: 700; font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">Handle Missing Values</div>
              <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                <button id="op-drop-nulls" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.5rem; justify-content: flex-start; text-align: left;">
                  <i data-lucide="trash-2" style="width: 14px; height: 14px; color: var(--danger);"></i> Drop Rows with Blank Cells
                </button>
                
                <div style="display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 0.25rem; width: 100%;">
                  <select id="op-fill-column" class="form-select" style="font-size: 0.7rem; padding: 0.4rem; background: rgba(8,12,20,0.4);"></select>
                  <button id="op-fill-mean" class="btn btn-secondary" style="font-size: 0.7rem; padding: 0.4rem; color: var(--success); border-color: rgba(34, 197, 94, 0.25);">
                    Fill Average
                  </button>
                </div>
              </div>
            </div>

            <!-- Reset Actions -->
            <button id="cleaner-reset-btn" class="btn btn-secondary w-full" style="font-size: 0.75rem; padding: 0.5rem; color: var(--warning); border-color: rgba(245, 158, 11, 0.2); margin-top: 0.5rem;">
              <i data-lucide="rotate-ccw" style="width: 12px; height:12px;"></i> Revert to Original Data
            </button>
          </div>

        </div>

        <!-- RIGHT COLUMN: Preview & Export Panel -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Data Table Previewer -->
          <div class="glass-panel section-card" style="display: flex; flex-direction: column; gap: 1rem; min-height: 350px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">
              <div>
                <h3 id="preview-file-label" style="font-size: 1rem; font-weight: 800; color: var(--text-primary);">sample_sales.csv</h3>
                <span id="preview-rows-label" style="font-size: 0.75rem; color: var(--text-muted);">0 rows • 0 columns</span>
              </div>
              <div style="display: flex; gap: 0.35rem;">
                <button id="download-csv-btn" class="btn btn-secondary" style="padding: 0.4rem 0.65rem; font-size: 0.75rem; display: flex; align-items: center; gap: 0.25rem;">
                  <i data-lucide="download" style="width: 12px; height: 12px;"></i> Download CSV
                </button>
              </div>
            </div>

            <!-- Scrollable Table view -->
            <div class="table-responsive" style="max-height: 250px; overflow: auto;">
              <table id="cleaner-data-table" class="data-table">
                <thead>
                  <!-- Populated dynamically -->
                </thead>
                <tbody>
                  <!-- Populated dynamically -->
                </tbody>
              </table>
            </div>
          </div>

          <!-- Dynamic Operations Log & Exports -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            
            <!-- Cleaner Logs Console -->
            <div class="glass-panel section-card" style="padding: 1.25rem;">
              <h4 style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
                Cleaning Logs & History
              </h4>
              <div id="cleaner-logs-container" style="font-family: var(--font-mono); font-size: 0.7rem; color: #34d399; height: 100px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.25rem; padding: 0.5rem; background: rgba(0,0,0,0.3); border: 1px solid var(--border-light); border-radius: var(--border-radius-sm);">
                &gt; Console loaded. Ready for ingestion.
              </div>
            </div>

            <!-- Platform Sandbox Export Center -->
            <div class="glass-panel section-card" style="padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; background: rgba(99, 102, 241, 0.02); border-color: rgba(99, 102, 241, 0.1);">
              <h4 style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary); text-transform: uppercase; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.25rem;">
                <span style="width: 6px; height: 6px; border-radius:50%; background:var(--secondary); display:inline-block;"></span>
                Sandbox Export Hub
              </h4>
              <button id="export-chart-btn" class="btn btn-primary" style="font-size: 0.75rem; padding: 0.45rem; justify-content: center; gap: 0.35rem; width: 100%;">
                <i data-lucide="line-chart" style="width:14px; height:14px;"></i> Export to Chart builder
              </button>
              <button id="export-python-btn" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.45rem; justify-content: center; gap: 0.35rem; width: 100%;">
                <i data-lucide="terminal" style="width:14px; height:14px; color: var(--primary);"></i> Export to Python Console
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  `;

  // UI select bindings
  const datasetSelect = container.querySelector('#cleaner-dataset-select');
  const uploadZone = container.querySelector('#cleaner-upload-zone');
  const fileInput = container.querySelector('#cleaner-csv-file');

  const columnListDiv = container.querySelector('#cleaner-column-list');
  const colCountLabel = container.querySelector('#columns-count-label');
  const applyColumnsBtn = container.querySelector('#apply-column-drop-btn');

  const previewFileLabel = container.querySelector('#preview-file-label');
  const previewRowsLabel = container.querySelector('#preview-rows-label');
  const previewTable = container.querySelector('#cleaner-data-table');
  const logsContainer = container.querySelector('#cleaner-logs-container');
  const fillColSelect = container.querySelector('#op-fill-column');

  // Load initial dataset
  loadDataset(sampleDatasets.sales, "sample_sales.csv");

  // Selection dropdown changes
  datasetSelect.addEventListener('change', () => {
    const val = datasetSelect.value;
    if (val === 'custom') {
      uploadZone.style.display = 'flex';
      rawData = null;
      cleanedData = null;
      renderEmptyTable();
      logAction("Awaiting file upload from local explorer.");
    } else {
      uploadZone.style.display = 'none';
      const fileName = val === 'sales' ? 'sample_sales.csv' : 'sample_inventory.csv';
      loadDataset(sampleDatasets[val], fileName);
    }
  });

  // Local file uploader listener
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      loadDataset(evt.target.result, file.name);
    };
    reader.readAsText(file);
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
          // Preserve empty cells as empty strings for cleaner tool
          row[h] = val;
        } else {
          row[h] = '';
        }
      });
      return row;
    });
    
    return { headers, data };
  }

  // Generate CSV text string from active data
  function generateCSVText(headers, rows) {
    const headerRow = headers.join(',');
    const bodyRows = rows.map(row => {
      return headers.map(h => {
        const cell = row[h] !== null && row[h] !== undefined ? row[h].toString() : '';
        // If cell has comma or quotes, wrap in quotes
        if (cell.includes(',') || cell.includes('"')) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',');
    });
    return [headerRow, ...bodyRows].join('\n');
  }

  // Load dataset into state
  function loadDataset(csvText, name) {
    try {
      const parsed = parseCSV(csvText);
      if (parsed.headers.length === 0) throw new Error("File is empty or invalid.");

      rawData = parsed;
      currentFileName = name;
      actionLogs = [];

      logAction(`Loaded dataset: ${name} (${parsed.data.length} rows)`);
      
      // Perform initial clone
      revertToOriginal();
    } catch (err) {
      alert("CSV Ingestion Error: " + err.message);
    }
  }

  function logAction(msg) {
    actionLogs.push(`&gt; ${msg}`);
    logsContainer.innerHTML = actionLogs.join('<br>');
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }

  function revertToOriginal() {
    if (!rawData) return;
    
    // Deep clone rawData
    cleanedData = {
      headers: [...rawData.headers],
      data: rawData.data.map(row => Object.assign({}, row))
    };

    logAction("Reverted active data to loaded original.");
    syncTableUI();
  }

  function renderEmptyTable() {
    colCountLabel.textContent = "0 columns";
    columnListDiv.innerHTML = `<span style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">No dataset loaded</span>`;
    previewFileLabel.textContent = "No File Loaded";
    previewRowsLabel.textContent = "0 rows • 0 columns";
    previewTable.querySelector('thead').innerHTML = '';
    previewTable.querySelector('tbody').innerHTML = `<tr><td style="text-align: center; color: var(--text-muted); padding: 2rem;">Upload a CSV to start cleaning</td></tr>`;
    fillColSelect.innerHTML = '';
  }

  // Synchronise data grid, headers, checkboxes, and fill selector
  function syncTableUI() {
    if (!cleanedData) return;

    previewFileLabel.textContent = currentFileName;
    previewRowsLabel.textContent = `${cleanedData.data.length} rows • ${cleanedData.headers.length} columns`;
    colCountLabel.textContent = `${cleanedData.headers.length} columns`;

    // Render checkboxes
    columnListDiv.innerHTML = cleanedData.headers.map(h => `
      <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; cursor:pointer;">
        <input type="checkbox" class="col-keep-checkbox" value="${h}" checked style="cursor:pointer;">
        <span>${h}</span>
      </label>
    `).join('');

    // Fill Column Selector options
    fillColSelect.innerHTML = cleanedData.headers.map(h => `<option value="${h}">${h}</option>`).join('');

    // Render Table Header
    const thead = previewTable.querySelector('thead');
    thead.innerHTML = `<tr>${cleanedData.headers.map(h => `<th>${h}</th>`).join('')}</tr>`;

    // Render Table Body (first 10 rows for preview)
    const tbody = previewTable.querySelector('tbody');
    const previewRows = cleanedData.data.slice(0, 10);

    if (cleanedData.data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${cleanedData.headers.length}" style="text-align: center; color: var(--text-muted); font-style: italic; padding: 1.5rem;">Dataset is empty</td></tr>`;
    } else {
      tbody.innerHTML = previewRows.map(row => `
        <tr>
          ${cleanedData.headers.map(h => {
            const val = row[h];
            const isBlank = val === null || val === undefined || val.toString().trim() === '';
            return `<td style="${isBlank ? 'background: rgba(239, 68, 68, 0.04); color: var(--text-muted); font-style: italic;' : ''}">
              ${isBlank ? 'NULL' : val}
            </td>`;
          }).join('')}
        </tr>
      `).join('');
    }
  }

  // --- ACTIONS LOGIC ---

  // Drop Unchecked Columns
  applyColumnsBtn.addEventListener('click', () => {
    if (!cleanedData) return;

    const checkedCols = Array.from(columnListDiv.querySelectorAll('.col-keep-checkbox:checked')).map(cb => cb.value);
    if (checkedCols.length === 0) {
      alert("You must keep at least one column!");
      return;
    }

    const droppedCount = cleanedData.headers.length - checkedCols.length;
    if (droppedCount === 0) {
      logAction("Column drop skipped: no columns unchecked.");
      return;
    }

    // Filter headers and row attributes
    cleanedData.headers = checkedCols;
    cleanedData.data.forEach(row => {
      Object.keys(row).forEach(k => {
        if (!checkedCols.includes(k)) delete row[k];
      });
    });

    logAction(`Dropped ${droppedCount} unchecked columns.`);
    syncTableUI();
  });

  // Revert Action
  container.querySelector('#cleaner-reset-btn').addEventListener('click', revertToOriginal);

  // Remove Duplicate Rows
  container.querySelector('#op-remove-duplicates').addEventListener('click', () => {
    if (!cleanedData) return;

    const originalLen = cleanedData.data.length;
    const seen = new Set();
    const unique = [];

    cleanedData.data.forEach(row => {
      // Create a unique hash key of row values
      const key = cleanedData.headers.map(h => row[h]).join('|||');
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(row);
      }
    });

    cleanedData.data = unique;
    const removed = originalLen - unique.length;

    logAction(`Duplicates removal: removed ${removed} duplicate rows.`);
    syncTableUI();
  });

  // Trim Whitespaces
  container.querySelector('#op-trim-strings').addEventListener('click', () => {
    if (!cleanedData) return;

    let modifiedCount = 0;
    cleanedData.data.forEach(row => {
      cleanedData.headers.forEach(h => {
        if (typeof row[h] === 'string') {
          const original = row[h];
          const trimmed = original.trim();
          if (original !== trimmed) {
            row[h] = trimmed;
            modifiedCount++;
          }
        }
      });
    });

    logAction(`Text trimming: stripped whitespace from ${modifiedCount} cells.`);
    syncTableUI();
  });

  // Convert to UPPERCASE
  container.querySelector('#op-uppercase-text').addEventListener('click', () => {
    if (!cleanedData) return;

    let modifiedCount = 0;
    cleanedData.data.forEach(row => {
      cleanedData.headers.forEach(h => {
        if (typeof row[h] === 'string' && row[h].trim() !== '') {
          const original = row[h];
          const upper = original.toUpperCase();
          if (original !== upper) {
            row[h] = upper;
            modifiedCount++;
          }
        }
      });
    });

    logAction(`Case formatting: converted ${modifiedCount} string cells to UPPERCASE.`);
    syncTableUI();
  });

  // Drop Rows with Blank Cells
  container.querySelector('#op-drop-nulls').addEventListener('click', () => {
    if (!cleanedData) return;

    const originalLen = cleanedData.data.length;
    const filtered = cleanedData.data.filter(row => {
      return cleanedData.headers.every(h => {
        const val = row[h];
        return val !== null && val !== undefined && val.toString().trim() !== '';
      });
    });

    cleanedData.data = filtered;
    const dropped = originalLen - filtered.length;

    logAction(`Null filter: dropped ${dropped} rows containing blank cells.`);
    syncTableUI();
  });

  // Fill Empty Numbers with Mean
  container.querySelector('#op-fill-mean').addEventListener('click', () => {
    if (!cleanedData) return;

    const col = fillColSelect.value;
    // Extract numbers to compute average
    const numbers = cleanedData.data
      .map(row => row[col])
      .filter(val => val !== null && val !== undefined && val.toString().trim() !== '' && !isNaN(Number(val)))
      .map(val => Number(val));

    if (numbers.length === 0) {
      alert(`No valid numerical records found in column "${col}" to calculate mean.`);
      return;
    }

    const mean = numbers.reduce((sum, val) => sum + val, 0) / numbers.length;
    const meanFormatted = parseFloat(mean.toFixed(2));
    
    let filledCount = 0;
    cleanedData.data.forEach(row => {
      const val = row[col];
      if (val === null || val === undefined || val.toString().trim() === '' || isNaN(Number(val))) {
        row[col] = meanFormatted;
        filledCount++;
      }
    });

    logAction(`Null imputing: filled ${filledCount} empty entries in "${col}" with average: ${meanFormatted}`);
    syncTableUI();
  });

  function rowHasValue(val) {
    return val !== null && val !== undefined && val.toString().trim() !== '';
  }

  // --- EXPORTS & DOWNLOAD ---

  // Download Cleaned CSV
  container.querySelector('#download-csv-btn').addEventListener('click', () => {
    if (!cleanedData) return;

    const csvText = generateCSVText(cleanedData.headers, cleanedData.data);
    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `cleaned_${currentFileName}`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    logAction(`CSV Download triggered: cleaned_${currentFileName}`);
  });

  // Export to Chart Builder
  container.querySelector('#export-chart-btn').addEventListener('click', () => {
    if (!cleanedData) return;

    const csvText = generateCSVText(cleanedData.headers, cleanedData.data);
    state.exportedCleanedCsv = csvText;
    
    alert("Cleaned dataset successfully loaded in active memory! Exporting to Chart Builder...");
    navigateTo('visualizer');
  });

  // Export to Python Sandbox
  container.querySelector('#export-python-btn').addEventListener('click', () => {
    if (!cleanedData) return;

    const csvText = generateCSVText(cleanedData.headers, cleanedData.data);
    
    // Construct Python Pandas StringIO loader script
    const pyScript = `# ==================================================
# OPENSIGMA DATAQUEST ACADEMY - PANDAS DATA INGESTION
# ==================================================
import io
import pandas as pd

# Cleaned CSV Dataset String representation (Exported from Cleaner)
csv_data = """${csvText}"""

# Load dataset into Pandas DataFrame client-side via StringIO
df = pd.read_csv(io.StringIO(csv_data))

print("--- DATAFRAME OVERVIEW ---")
print(df.info())

print("\\n--- GENERAL STATISTICAL SUMMARY ---")
print(df.describe(include='all'))

print("\\n--- FIRST 5 ROWS ---")
print(df.head(5))
`;

    state.pythonSandboxPreset = pyScript;
    alert("Python loading script generated! Exporting to Python Pyodide Console...");
    navigateTo('python');
  });

  // Render icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
