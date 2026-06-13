export function renderLandingPage(container, state, navigateTo) {
  const modules = window.openSigmaModules;

  // Render Guest Landing Page
  container.innerHTML = `
    <div class="anim-slide-up" style="display: flex; flex-direction: column; gap: 4rem; padding-bottom: 4rem;">
      
      <!-- HERO HEADER SECTION -->
      <section class="hero-section glass-panel" style="position: relative; padding: 4rem 2rem; text-align: center; background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 60%); border-color: rgba(99, 102, 241, 0.15); display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
        <div class="badge-glow" style="font-size: 0.75rem; padding: 0.35rem 0.85rem; border-radius: 50px;">
          <i data-lucide="sparkles" style="width: 14px; height:14px; color: var(--secondary);"></i>
          <span>WebAssembly Powered Learning Engine</span>
        </div>
        
        <h1 style="font-size: 3rem; font-weight: 800; line-height: 1.15; max-width: 800px; letter-spacing: -1px; margin-bottom: 0.5rem;">
          Master Data Science & Analysis <span class="text-gradient">Client-Side</span>
        </h1>
        
        <p style="color: var(--text-secondary); font-size: 1.15rem; max-width: 650px; line-height: 1.6; margin-bottom: 1.5rem;">
          Learn Python, relational SQL, and data visualization interactively. Everything runs 100% free inside your browser—no installations, no server lag, and zero cost.
        </p>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button id="hero-start-btn" class="btn btn-primary" style="font-size: 1rem; padding: 0.8rem 2rem; display: flex; align-items: center; gap: 0.5rem; border-radius: var(--border-radius-lg);">
            <span>Start Free Quest</span> <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
          </button>
          <a href="#curriculum-map" class="btn btn-secondary" style="font-size: 1rem; padding: 0.8rem 2rem; border-radius: var(--border-radius-lg);">
            Explore Syllabus
          </a>
        </div>
      </section>

      <!-- VALUE PROPOSITION STATS BAR -->
      <section style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; text-align: center;">
        <div class="glass-panel" style="padding: 1.5rem;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--primary); margin-bottom: 0.25rem;">$0</div>
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.25rem;">100% Free Access</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4;">No registration, paywalls, or credit cards. Just click and code.</div>
        </div>
        <div class="glass-panel" style="padding: 1.5rem;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--secondary); margin-bottom: 0.25rem;">0ms</div>
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.25rem;">Serverless Latency</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4;">WebAssembly compiles Python and SQLite directly on your computer.</div>
        </div>
        <div class="glass-panel" style="padding: 1.5rem;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--success); margin-bottom: 0.25rem;">Offline</div>
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.25rem;">PWA Cache Enabled</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4;">Service workers keep all cheatsheets and sandboxes active offline.</div>
        </div>
      </section>

      <!-- INTERACTIVE PLATFORM FEATURE CARDS -->
      <section style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="text-align: center; margin-bottom: 1rem;">
          <h2 style="font-size: 1.85rem; font-weight: 800;">Integrated Developer Sandboxes</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.25rem;">Code, query, and plot directly in the browser</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
          
          <div class="glass-panel" style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem; border-color: rgba(99, 102, 241, 0.15);">
            <div style="width: 46px; height: 46px; border-radius: var(--border-radius-md); background: rgba(99, 102, 241, 0.08); color: var(--primary); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="terminal" style="width: 24px; height: 24px;"></i>
            </div>
            <h3 style="font-weight: 800; font-size: 1.2rem; color: var(--text-primary);">Python Console</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
              Features a fully-fledged sandboxed console. Execute scripts, compute averages, parse datasets, and load algorithms via client-side Pyodide.
            </p>
          </div>

          <div class="glass-panel" style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem; border-color: rgba(6, 182, 212, 0.15);">
            <div style="width: 46px; height: 46px; border-radius: var(--border-radius-md); background: rgba(6, 182, 212, 0.08); color: var(--secondary); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="database" style="width: 24px; height: 24px;"></i>
            </div>
            <h3 style="font-weight: 800; font-size: 1.2rem; color: var(--text-primary);">Relational SQL Database</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
              Queries tables (sales records, inventory levels, customers). Inspect schemas, run joins, filter ranges, and group orders dynamically using SQL.js.
            </p>
          </div>

          <div class="glass-panel" style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem; border-color: rgba(34, 197, 94, 0.15);">
            <div style="width: 46px; height: 46px; border-radius: var(--border-radius-md); background: rgba(34, 197, 94, 0.08); color: var(--success); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="line-chart" style="width: 24px; height: 24px;"></i>
            </div>
            <h3 style="font-weight: 800; font-size: 1.2rem; color: var(--text-primary);">Data Visualizer</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
              Drag and drop local CSV sheets, view data tables, generate statistical descriptions (Mean, Min, Max), and compile Bar, Line, or Scatter plots dynamically.
            </p>
          </div>

        </div>
      </section>

      <!-- LIVE CODE PREVIEW WORKSPACE SIMULATION -->
      <section class="glass-panel" style="padding: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; background: linear-gradient(135deg, rgba(8, 12, 20, 0.5), rgba(13, 20, 35, 0.3)); border-color: rgba(255,255,255,0.04);">
        <div>
          <h2 style="font-size: 1.75rem; font-weight: 800; margin-bottom: 1rem;">Experience the In-Browser Sandbox</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">
            OpenSigma compiles your code locally on your CPU instead of uploading it to expensive server clusters. Click the example buttons to test-run Python loops or SQL database lookups inside this mock terminal preview.
          </p>
          
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
            <button id="preview-py-btn" class="btn btn-secondary active" style="font-size: 0.75rem; padding: 0.4rem 0.85rem;">Python Example</button>
            <button id="preview-sql-btn" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.4rem 0.85rem;">SQL Example</button>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; border: 1px solid var(--border-light); border-radius: var(--border-radius-md); overflow: hidden; background: #05070c; font-family: var(--font-mono); font-size: 0.8rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <!-- Mock Editor header -->
          <div style="background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border-light); padding: 0.5rem 1rem; display: flex; justify-content: space-between; align-items: center; color: var(--text-muted);">
            <span id="preview-editor-title">main.py</span>
            <button id="preview-run-btn" class="btn btn-primary" style="padding: 0.25rem 0.65rem; font-size: 0.7rem; gap: 0.25rem; box-shadow: none;">
              <i data-lucide="play" style="width: 10px; height:10px;"></i> Run Code
            </button>
          </div>
          <!-- Mock Editor area -->
          <pre id="preview-editor-code" style="padding: 1rem; color: #38bdf8; margin: 0; background: transparent; overflow-x: auto; line-height: 1.45;"># Calculate average value in list
data = [15.2, 42.1, 10.9, 58.4, 27.3]
avg = sum(data) / len(data)
print(f"Data count: {len(data)}")
print(f"Computed Average: {avg:.2f}")</pre>
          <!-- Mock Console Output -->
          <div style="border-top: 1px solid var(--border-light); background: #020408; padding: 0.75rem 1rem;">
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.25rem; text-transform: uppercase;">Console Output</div>
            <div id="preview-console-out" style="color: #34d399; line-height: 1.4;">Click "Run Code" to compile.</div>
          </div>
        </div>
      </section>

      <!-- CURRICULUM SYLLABUS MAP -->
      <section id="curriculum-map" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="text-align: center;">
          <h2 style="font-size: 1.85rem; font-weight: 800;">Academic Curriculum Paths</h2>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.25rem;">Guided syllabus modules syncing automatically in the background</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 900px; margin: 0 auto; width: 100%;">
          ${modules.map(mod => `
            <div class="glass-panel" style="padding: 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: ${mod.id.includes('python') ? 'rgba(139, 92, 246, 0.08)' : mod.id.includes('sql') ? 'rgba(6, 182, 212, 0.08)' : 'rgba(34, 197, 94, 0.08)'}; display: flex; align-items: center; justify-content: center; color: ${mod.id.includes('python') ? 'var(--primary)' : mod.id.includes('sql') ? 'var(--secondary)' : 'var(--success)'}; flex-shrink: 0;">
                  <i data-lucide="${mod.id.includes('python') ? 'code-2' : mod.id.includes('sql') ? 'database-backup' : 'pie-chart'}" style="width: 20px; height: 20px;"></i>
                </div>
                <div>
                  <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.15rem;">${mod.title}</h3>
                  <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.3;">${mod.description}</p>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 1rem; flex-shrink: 0;">
                <span class="badge" style="font-size: 0.7rem; padding: 0.25rem 0.5rem; background: rgba(255,255,255,0.03); border-color: var(--border-medium);">${mod.lessons.length} Lessons</span>
                <button class="btn btn-secondary start-preview-path-btn" data-module="${mod.id}" style="padding: 0.45rem 1rem; font-size: 0.75rem;">Start Path</button>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- GUEST CALL TO ACTION FOOTER -->
      <section class="glass-panel" style="padding: 3rem 2rem; text-align: center; border-color: rgba(6, 182, 212, 0.2); background: radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 60%); display: flex; flex-direction: column; align-items: center; gap: 1rem;">
        <h2 style="font-size: 2rem; font-weight: 800;">Ready to Start Your Quest?</h2>
        <p style="color: var(--text-secondary); font-size: 1rem; max-width: 550px; line-height: 1.5; margin-bottom: 1rem;">
          Enter the Academy now to access full metrics reporting, track lesson history, solve coding challenges, and unlock achievement badges.
        </p>
        <button id="footer-start-btn" class="btn btn-primary" style="font-size: 1rem; padding: 0.8rem 2.5rem; border-radius: var(--border-radius-lg);">
          Launch Dashboard & Code
        </button>
      </section>

    </div>
  `;

  // Attach Event Handlers: Start quest triggers
  const enterAcademy = () => {
    localStorage.setItem('opensigma_onboarded', 'true');
    navigateTo('dashboard');
  };

  document.getElementById('hero-start-btn').addEventListener('click', enterAcademy);
  document.getElementById('footer-start-btn').addEventListener('click', enterAcademy);

  container.querySelectorAll('.start-preview-path-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modId = btn.getAttribute('data-module');
      const mod = modules.find(m => m.id === modId);
      localStorage.setItem('opensigma_onboarded', 'true');
      if (mod && mod.lessons.length > 0) {
        navigateTo(`lesson-${mod.lessons[0].id}`);
      } else {
        navigateTo('dashboard');
      }
    });
  });

  // Example previewer scripts
  const previewPyBtn = document.getElementById('preview-py-btn');
  const previewSqlBtn = document.getElementById('preview-sql-btn');
  const previewEditorTitle = document.getElementById('preview-editor-title');
  const previewEditorCode = document.getElementById('preview-editor-code');
  const previewRunBtn = document.getElementById('preview-run-btn');
  const previewConsoleOut = document.getElementById('preview-console-out');

  let activePreviewMode = 'python';

  const pyCode = `# Calculate average value in list
data = [15.2, 42.1, 10.9, 58.4, 27.3]
avg = sum(data) / len(data)
print(f"Data count: {len(data)}")
print(f"Computed Average: {avg:.2f}")`;

  const sqlCode = `-- SQL Relational Aggregation query
SELECT category, COUNT(*) as items_count, AVG(price) as avg_cost
FROM products
WHERE price > 20.0
GROUP BY category;`;

  previewPyBtn.addEventListener('click', () => {
    activePreviewMode = 'python';
    previewPyBtn.classList.add('active');
    previewSqlBtn.classList.remove('active');
    previewEditorTitle.textContent = 'main.py';
    previewEditorCode.textContent = pyCode;
    previewEditorCode.style.color = '#38bdf8';
    previewConsoleOut.textContent = 'Click "Run Code" to compile.';
    previewConsoleOut.style.color = '#34d399';
  });

  previewSqlBtn.addEventListener('click', () => {
    activePreviewMode = 'sql';
    previewSqlBtn.classList.add('active');
    previewPyBtn.classList.remove('active');
    previewEditorTitle.textContent = 'query.sql';
    previewEditorCode.textContent = sqlCode;
    previewEditorCode.style.color = '#fbbf24';
    previewConsoleOut.textContent = 'Click "Run Code" to compile.';
    previewConsoleOut.style.color = '#cbd5e1';
  });

  previewRunBtn.addEventListener('click', () => {
    previewConsoleOut.innerHTML = `Compiling code in WebAssembly...<br><span style="color:var(--text-muted);">&gt; Initialising client sandboxed runtime</span>`;
    previewRunBtn.disabled = true;

    setTimeout(() => {
      if (activePreviewMode === 'python') {
        previewConsoleOut.innerHTML = `Data count: 5<br>Computed Average: 30.78<br><span style="color:var(--primary); font-size:0.7rem; margin-top:0.25rem; display:block;">✓ Run completed client-side in 32ms</span>`;
      } else {
        previewConsoleOut.innerHTML = `
<table class="sql-table" style="margin-top:0.35rem;">
  <thead>
    <tr><th>category</th><th>items_count</th><th>avg_cost</th></tr>
  </thead>
  <tbody>
    <tr><td>Electronics</td><td>3</td><td>569.99</td></tr>
    <tr><td>Furniture</td><td>2</td><td>141.75</td></tr>
  </tbody>
</table>
<span style="color:var(--secondary); font-size:0.7rem; margin-top:0.25rem; display:block;">✓ Query returned 2 rows client-side in 8ms</span>
        `;
      }
      previewRunBtn.disabled = false;
    }, 800);
  });

  // Render icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
