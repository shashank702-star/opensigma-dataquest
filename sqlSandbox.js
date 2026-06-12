import { sampleSqlDbData } from './lessons.js';

let sqlDbInstance = null;
let SQLjs = null;

// Initial sample SQL Queries
const sqlTemplates = {
  select_all: `SELECT * FROM products;`,
  filter: `SELECT name, category, price 
FROM products 
WHERE category = 'Electronics' AND price < 500;`,
  group_by: `SELECT category, COUNT(*) AS total_items, AVG(price) AS avg_price 
FROM products 
GROUP BY category;`,
  join: `SELECT 
  o.order_id, 
  c.first_name || ' ' || c.last_name AS customer_name, 
  p.name AS product_name, 
  o.quantity, 
  (o.quantity * p.price) AS total_revenue
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN products p ON o.product_id = p.product_id;`
};

export async function getSqlDb() {
  if (sqlDbInstance) return sqlDbInstance;

  // Initialize SQLite in WASM
  SQLjs = await initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`
  });

  const db = new SQLjs.Database();

  // Populate products
  db.run(`CREATE TABLE products (
    product_id INTEGER PRIMARY KEY,
    name TEXT,
    category TEXT,
    price REAL,
    stock INTEGER
  );`);
  
  sampleSqlDbData.products.forEach(p => {
    db.run(`INSERT INTO products VALUES (?, ?, ?, ?, ?);`, [p.product_id, p.name, p.category, p.price, p.stock]);
  });

  // Populate customers
  db.run(`CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    state TEXT
  );`);
  
  sampleSqlDbData.customers.forEach(c => {
    db.run(`INSERT INTO customers VALUES (?, ?, ?, ?, ?);`, [c.customer_id, c.first_name, c.last_name, c.email, c.state]);
  });

  // Populate orders
  db.run(`CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    order_date TEXT
  );`);
  
  sampleSqlDbData.orders.forEach(o => {
    db.run(`INSERT INTO orders VALUES (?, ?, ?, ?, ?);`, [o.order_id, o.customer_id, o.product_id, o.quantity, o.order_date]);
  });

  sqlDbInstance = db;
  return db;
}

export function renderSqlSandbox(container, state, initialQuery = "") {
  container.innerHTML = `
    <div class="workspace-grid anim-slide-up">
      
      <!-- SQL Query Editor Panel -->
      <div class="glass-panel workspace-panel">
        <div class="panel-header">
          <div class="panel-title">
            <i data-lucide="database" style="color: var(--primary);"></i>
            <span>SQL Editor (SQLite)</span>
          </div>
          <div>
            <select id="sql-template-select" class="form-select" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; width: auto;">
              <option value="select_all" selected>Query: Select Products</option>
              <option value="filter">Query: Filter Products</option>
              <option value="group_by">Query: Group & Average</option>
              <option value="join">Query: Relational Join</option>
            </select>
          </div>
        </div>
        
        <div class="panel-content" style="padding: 0; display: flex; flex-direction: column;">
          <div class="code-editor-wrapper" style="border: none; border-radius: 0; flex: 1;">
            <div class="code-editor-header">
              <span>query.sql</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Statements must end with a semicolon ';'</span>
            </div>
            <textarea id="sql-code-area" class="code-editor-area" style="color:#34d399;" spellcheck="false">${initialQuery || sqlTemplates.select_all}</textarea>
          </div>
        </div>
        
        <div class="panel-footer">
          <div style="font-size: 0.75rem; color: var(--text-muted);">
            SQLite Engine Active
          </div>
          <button id="run-sql-btn" class="btn btn-accent" style="font-size: 0.8rem; padding: 0.4rem 1.2rem;">
            <i data-lucide="play" style="width: 14px; height: 14px;"></i> Execute Query
          </button>
        </div>
      </div>
      
      <!-- Database Inspector & Results View -->
      <div class="glass-panel workspace-panel">
        <div class="panel-header">
          <div class="panel-title">
            <i data-lucide="table-2" style="color: var(--secondary);"></i>
            <span>Database Inspector & Results</span>
          </div>
        </div>
        
        <div class="panel-content" style="display: flex; flex-direction: column; gap: 1rem; overflow-y: hidden;">
          <div id="sql-loading-overlay" class="loading-overlay">
            <div class="spinner"></div>
            <p style="font-size: 0.85rem; font-weight: 500;">Initializing database engine...</p>
          </div>

          <!-- Top inspector section -->
          <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 140px; overflow-y: auto; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-light);">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.5px;">
              Table Schemas (Click to expand)
            </span>
            <div id="sql-schema-browser" class="schema-browser">
              <!-- Dynamically rendered tables -->
            </div>
          </div>

          <!-- Bottom results section -->
          <div style="flex: 1; display: flex; flex-direction: column; overflow-y: hidden;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.5px; margin-bottom: 0.5rem;">
              Query Results
            </span>
            <div id="sql-results-container" class="table-responsive" style="flex: 1; background: #020408;">
              <div class="console-content empty" style="min-height: 100px; padding: 1rem;">
                Execute a SQL query to see table rows...
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;

  // UI selectors
  const runBtn = document.getElementById('run-sql-btn');
  const codeArea = document.getElementById('sql-code-area');
  const resultsContainer = document.getElementById('sql-results-container');
  const schemaBrowser = document.getElementById('sql-schema-browser');
  const templateSelect = document.getElementById('sql-template-select');
  const loadingOverlay = document.getElementById('sql-loading-overlay');

  let dbInstance = null;

  // Initialize DB asynchronously
  getSqlDb().then(db => {
    dbInstance = db;
    loadingOverlay.style.display = 'none';
    renderSchemaInspector(db);
  }).catch(err => {
    loadingOverlay.innerHTML = `<p style="color: var(--danger); font-size: 0.85rem;">Failed to load SQL engine: ${err.message}</p>`;
  });

  // Handle template selection
  templateSelect.addEventListener('change', () => {
    codeArea.value = sqlTemplates[templateSelect.value];
  });

  // Run SQL statement
  runBtn.addEventListener('click', () => {
    if (!dbInstance) return;
    const query = codeArea.value.trim();
    if (!query) return;

    try {
      // Execute the query
      const res = dbInstance.exec(query);
      
      if (res.length === 0) {
        resultsContainer.innerHTML = `
          <div class="console-content success" style="padding: 1rem;">
            Query executed successfully. Zero rows returned. (Completed DDL/DML statement)
          </div>
        `;
        // Refresh schema inspector just in case tables were altered
        renderSchemaInspector(dbInstance);
        return;
      }

      // Render table
      const columns = res[0].columns;
      const values = res[0].values;

      let tableHtml = `
        <table class="sql-table">
          <thead>
            <tr>
              ${columns.map(col => `<th>${col}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${values.map(row => `
              <tr>
                ${row.map(val => `<td>${val === null ? '<em>null</em>' : val}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
      resultsContainer.innerHTML = tableHtml;

    } catch (err) {
      resultsContainer.innerHTML = `
        <div class="console-content error" style="padding: 1rem;">
          SQLite Error: ${err.message}
        </div>
      `;
    }
  });

  // Helper to draw schema metadata
  function renderSchemaInspector(db) {
    schemaBrowser.innerHTML = '';
    try {
      const tablesResult = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
      if (tablesResult.length === 0) {
        schemaBrowser.innerHTML = '<span style="font-size:0.75rem; color:var(--text-muted);">No tables exist.</span>';
        return;
      }

      const tableNames = tablesResult[0].values.map(v => v[0]);

      tableNames.forEach(tName => {
        const columnsResult = db.exec(`PRAGMA table_info(${tName});`);
        const columns = columnsResult[0].values.map(colRow => ({
          name: colRow[1],
          type: colRow[2]
        }));

        const tableItem = document.createElement('div');
        tableItem.className = 'schema-table-item';
        tableItem.innerHTML = `
          <div class="schema-table-header" data-table="${tName}">
            <span><i data-lucide="table" style="width:12px;height:12px;display:inline;vertical-align:middle;margin-right:4px;"></i>${tName}</span>
            <span style="font-size: 0.7rem; color:var(--text-muted); font-weight: normal;">${columns.length} columns</span>
          </div>
          <div class="schema-columns-list" id="schema-cols-${tName}">
            ${columns.map(c => `
              <div class="schema-col">
                <span>${c.name}</span>
                <span class="schema-col-type">${c.type}</span>
              </div>
            `).join('')}
          </div>
        `;
        
        schemaBrowser.appendChild(tableItem);

        // Attach expand toggle
        const header = tableItem.querySelector('.schema-table-header');
        const list = tableItem.querySelector('.schema-columns-list');
        header.addEventListener('click', () => {
          list.classList.toggle('expanded');
        });
      });
      
      if (window.lucide) {
        window.lucide.createIcons();
      }
    } catch (err) {
      schemaBrowser.innerHTML = `<span style="color:var(--danger); font-size:0.7rem;">Inspector error: ${err.message}</span>`;
    }
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
