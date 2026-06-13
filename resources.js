import { modules as defaultModules } from './lessons.js';

export function renderResourceHub(container, state, navigateTo) {
  // Load custom resources
  let customResources = [];
  try {
    const saved = localStorage.getItem('opensigma_custom_resources');
    if (saved) customResources = JSON.parse(saved);
  } catch (err) {
    console.error("Failed to load custom resources:", err);
  }

  // Load sync settings
  const currentVersion = parseFloat(localStorage.getItem('opensigma_curriculum_version') || '1.0');
  const autoSyncEnabled = localStorage.getItem('opensigma_auto_sync_enabled') !== 'false';
  const customSyncUrl = localStorage.getItem('opensigma_custom_sync_url') || '';

  // Pre-packaged assets list
  const packagedResources = [
    {
      title: "Python Data Science Cheat Sheet",
      desc: "Essentials of variables, arithmetic, lists, list comprehensions, and functions.",
      file: "assets/downloads/python_cheatsheet.txt",
      size: "2.7 KB",
      type: "Cheatsheet",
      icon: "file-text"
    },
    {
      title: "SQL Joins & Aggregations Cheat Sheet",
      desc: "Commands, syntax guides, INNER/LEFT joins, grouping, and aggregate functions.",
      file: "assets/downloads/sql_cheatsheet.txt",
      size: "3.4 KB",
      type: "Cheatsheet",
      icon: "database"
    },
    {
      title: "Pandas Data Wrangling Guide",
      desc: "Pandas cheat sheet covering DataFrame manipulation, reading CSVs, and stats.",
      file: "assets/downloads/pandas_cheatsheet.txt",
      size: "2.8 KB",
      type: "Cheatsheet",
      icon: "code"
    },
    {
      title: "Retail Sales CSV Dataset (Sample)",
      desc: "100 rows of retail transactions (Date, Customer ID, Product, Price, Units, Category).",
      file: "assets/downloads/financial_data_sample.csv",
      size: "4.9 KB",
      type: "CSV Dataset",
      icon: "table"
    }
  ];

  // Curated online study materials
  const externalResources = [
    {
      title: "Python Data Science Handbook",
      desc: "Free online textbook by Jake VanderPlas. Covers IPython, NumPy, Pandas, Matplotlib, and Scikit-Learn.",
      url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
      type: "PDF Textbook",
      badgeClass: "badge-purple"
    },
    {
      title: "An Introduction to Statistical Learning",
      desc: "The gold standard textbook for machine learning foundations. Free PDF download link from the authors.",
      url: "https://www.statlearning.com/",
      type: "PDF Textbook",
      badgeClass: "badge-purple"
    },
    {
      title: "Python for Data Science (Full Video Course)",
      desc: "Comprehensive 12-hour video tutorial introducing Python logic, NumPy, and Pandas on YouTube.",
      url: "https://www.youtube.com/watch?v=LHBE6Q9XlzI",
      type: "Video Course",
      badgeClass: "badge-cyan"
    },
    {
      title: "SQL Tutorial for Beginners (Mosh)",
      desc: "Excellent 4-hour introduction covering database structures, joins, groupings, and views on YouTube.",
      url: "https://www.youtube.com/watch?v=HXTUgyrgpzo",
      type: "Video Course",
      badgeClass: "badge-cyan"
    }
  ];

  // Render Layout HTML
  container.innerHTML = `
    <div class="anim-slide-up" style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem;">
          Resource Hub & <span class="text-gradient">Updater</span>
        </h1>
        <p style="color: var(--text-secondary); font-size: 1rem;">
          Manage syllabus updates, download cheat sheets, import course guides, and save custom study links.
        </p>
      </div>

      <div class="resource-layout-grid" style="display: grid; grid-template-columns: 1.25fr 0.75fr; gap: 1.5rem; align-items: start;">
        
        <!-- LEFT COLUMN: Library & Downloads -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Local Cheat Sheets & Files -->
          <div class="glass-panel section-card">
            <h2 class="card-title" style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="download-cloud" style="color: var(--success); width: 20px; height: 20px;"></i>
              Packaged Offline Cheat Sheets & Data
            </h2>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${packagedResources.map(res => `
                <div class="resource-row" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border: 1px solid var(--border-light); border-radius: var(--border-radius-md); background: rgba(255,255,255,0.01);">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div class="resource-icon-box" style="width: 38px; height: 38px; border-radius: var(--border-radius-sm); background: rgba(34, 197, 94, 0.08); display: flex; align-items: center; justify-content: center; color: var(--success);">
                      <i data-lucide="${res.icon}" style="width: 18px; height: 18px;"></i>
                    </div>
                    <div>
                      <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary);">${res.title}</div>
                      <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.3;">${res.desc}</div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">${res.size}</span>
                    <a href="${res.file}" download class="btn btn-secondary" style="padding: 0.4rem 0.75rem; font-size: 0.75rem; display: flex; align-items: center; gap: 0.35rem;">
                      <i data-lucide="download" style="width: 12px; height: 12px;"></i> Get File
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Curated Textbooks & Courses -->
          <div class="glass-panel section-card">
            <h2 class="card-title" style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="book-open" style="color: var(--primary); width: 20px; height: 20px;"></i>
              Curated Web Textbooks & Video Courses
            </h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              ${externalResources.map(res => `
                <a href="${res.url}" target="_blank" class="resource-card" style="text-decoration: none; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                  <div>
                    <div class="resource-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                      <span class="resource-badge ${res.badgeClass}">${res.type}</span>
                      <i data-lucide="external-link" style="width: 14px; height: 14px; color: var(--text-muted);"></i>
                    </div>
                    <div class="resource-title" style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">${res.title}</div>
                    <div class="resource-desc" style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.4;">${res.desc}</div>
                  </div>
                  <div class="resource-footer" style="margin-top: 1rem; font-size: 0.75rem; color: var(--primary); font-weight: 600; display: flex; align-items: center; gap: 0.25rem;">
                    <span>Access Resource</span> <i data-lucide="chevron-right" style="width: 12px; height: 12px;"></i>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>

          <!-- Custom Study Links ("My Resources") -->
          <div class="glass-panel section-card" id="custom-links-card">
            <h2 class="card-title" style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="folder-heart" style="color: var(--secondary); width: 20px; height: 20px;"></i>
              My Added Resources & Links
            </h2>
            <div id="custom-resources-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
              <!-- Dynamic User Links loaded here -->
              ${customResources.length === 0 ? `
                <div style="padding: 2rem; text-align: center; border: 1px dashed var(--border-medium); border-radius: var(--border-radius-md); color: var(--text-muted); font-size: 0.8rem;">
                  No custom resources added yet. Use the form on the right to add external files, Google Drive links, or YouTube videos.
                </div>
              ` : customResources.map((res, index) => `
                <div class="resource-row" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border: 1px solid var(--border-light); border-radius: var(--border-radius-md); background: rgba(255,255,255,0.01);">
                  <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1; min-width: 0;">
                    <div class="resource-icon-box" style="width: 38px; height: 38px; border-radius: var(--border-radius-sm); background: rgba(6, 182, 212, 0.08); display: flex; align-items: center; justify-content: center; color: var(--secondary); flex-shrink: 0;">
                      <i data-lucide="${res.type.includes('Video') ? 'play-circle' : res.type.includes('Dataset') ? 'table' : 'link'}" style="width: 18px; height: 18px;"></i>
                    </div>
                    <div style="min-width: 0;">
                      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.15rem;">
                        <span class="badge badge-cyan" style="font-size: 0.6rem; padding: 0.1rem 0.35rem;">${res.type}</span>
                        <div style="font-weight: 700; font-size: 0.9rem; color: var(--text-primary); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${res.title}</div>
                      </div>
                      <div style="font-size: 0.75rem; color: var(--text-muted); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${res.url}</div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-left: 1rem;">
                    <a href="${res.url}" target="_blank" class="btn btn-secondary" style="padding: 0.4rem 0.75rem; font-size: 0.75rem; display: flex; align-items: center; gap: 0.35rem;">
                      <i data-lucide="external-link" style="width: 12px; height: 12px;"></i> Open
                    </a>
                    <button class="btn btn-danger delete-custom-resource-btn" data-index="${index}" style="padding: 0.4rem; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.3); color: var(--danger);">
                      <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN: Sync Controls & Uploader Form -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Syllabus Sync Settings -->
          <div class="glass-panel section-card">
            <h2 class="card-title" style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="refresh-cw" style="color: var(--secondary); width: 20px; height: 20px;"></i>
              Curriculum Sync & Auto-Update
            </h2>
            
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.4;">
              Sync dynamic course outlines, lessons, and coding challenges from online JSON links or local updates.
            </div>

            <!-- Version Status Dashboard -->
            <div style="padding: 0.75rem; border-radius: var(--border-radius-md); background: rgba(255,255,255,0.02); border: 1px solid var(--border-light); margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Active Syllabus</div>
                <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">Version v${currentVersion.toFixed(1)}</div>
              </div>
              <div id="sync-status-badge">
                <span class="badge badge-green" style="display: flex; align-items: center; gap: 0.25rem;">
                  <span style="width: 6px; height: 6px; border-radius: 50%; background: #22c55e; display: inline-block;"></span> Active
                </span>
              </div>
            </div>

            <!-- Auto Update Switch -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; padding: 0.25rem 0;">
              <div>
                <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-primary);">Background Update Checks</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Auto-checks repo raw files on load</div>
              </div>
              <label class="switch-container" style="position: relative; display: inline-block; width: 44px; height: 22px;">
                <input type="checkbox" id="auto-sync-checkbox" ${autoSyncEnabled ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
                <span class="slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); transition: .3s; border-radius: 34px; border: 1px solid var(--border-medium);"></span>
              </label>
            </div>

            <!-- Custom Syllabus URL Input -->
            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.35rem;">Custom Syllabus Sync Link</label>
              <input type="url" id="sync-url-input" class="form-input" value="${customSyncUrl}" placeholder="https://raw.githubusercontent.com/.../curriculum_update.json" style="width: 100%; font-size: 0.8rem; padding: 0.65rem 1rem; background: rgba(8, 12, 20, 0.4);">
              <p style="font-size: 0.65rem; color: var(--text-muted); margin-top: 0.25rem; line-height: 1.3;">
                Paste a raw JSON link to sync customized courses. Empty defaults to user repository.
              </p>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <button id="sync-now-btn" class="btn btn-primary" style="font-size: 0.8rem; padding: 0.55rem; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i> Sync & Pull Remote
              </button>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; width: 100%;">
                <button id="reset-syllabus-btn" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem; color: var(--warning); border-color: rgba(245, 158, 11, 0.2);">
                  <i data-lucide="rotate-ccw" style="width: 12px; height: 12px;"></i> Reset Default
                </button>
                <label id="upload-syllabus-label" class="btn btn-secondary" style="font-size: 0.75rem; padding: 0.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
                  <i data-lucide="upload-cloud" style="width: 12px; height: 12px;"></i> Import File
                  <input type="file" id="syllabus-file-input" accept=".json" style="display: none;">
                </label>
              </div>
            </div>

            <div id="sync-console-output" style="display: none; margin-top: 1rem; padding: 0.5rem; background: rgba(0,0,0,0.3); border: 1px solid var(--border-light); border-radius: var(--border-radius-sm); font-family: var(--font-mono); font-size: 0.7rem; color: #34d399; max-height: 100px; overflow-y: auto;">
              <!-- Sync feedback logs -->
            </div>
          </div>

          <!-- Add Custom Link Form -->
          <div class="glass-panel section-card">
            <h2 class="card-title" style="margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="plus-circle" style="color: var(--success); width: 20px; height: 20px;"></i>
              Add Custom Resource Link
            </h2>
            
            <form id="add-resource-form" style="display: flex; flex-direction: column; gap: 0.75rem;">
              <div>
                <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">Resource Title</label>
                <input type="text" id="res-title-input" class="form-input" placeholder="e.g. My Shared Drive Folder" required style="width: 100%; font-size: 0.8rem; padding: 0.65rem 1rem; background: rgba(8, 12, 20, 0.4);">
              </div>

              <div>
                <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">Resource Type</label>
                <select id="res-type-input" class="form-select" style="width: 100%; font-size: 0.8rem; padding: 0.65rem 1rem; background: #0d1423; color: var(--text-primary); border: 1px solid var(--border-light); border-radius: var(--border-radius-md); outline: none;">
                  <option value="PDF Document">PDF Document</option>
                  <option value="Cheat Sheet">Cheat Sheet</option>
                  <option value="Video Course">Video Course</option>
                  <option value="Dataset">Dataset</option>
                  <option value="Custom Link">Custom Link</option>
                </select>
              </div>

              <div>
                <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.25rem;">URL / Web Link</label>
                <input type="url" id="res-url-input" class="form-input" placeholder="https://drive.google.com/..." required style="width: 100%; font-size: 0.8rem; padding: 0.65rem 1rem; background: rgba(8, 12, 20, 0.4);">
              </div>

              <button type="submit" class="btn btn-primary" style="font-size: 0.8rem; padding: 0.55rem; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.35rem; margin-top: 0.5rem;">
                <i data-lucide="plus" style="width: 14px; height: 14px;"></i> Save Resource
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  `;

  // Apply custom styling dynamically for checkboxes/switches to match portal theme
  applySwitchStyles();

  // Attach Event Handlers: Add Custom Resource
  const addForm = container.querySelector('#add-resource-form');
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = container.querySelector('#res-title-input').value.trim();
    const type = container.querySelector('#res-type-input').value;
    const url = container.querySelector('#res-url-input').value.trim();

    customResources.unshift({ title, type, url });
    localStorage.setItem('opensigma_custom_resources', JSON.stringify(customResources));
    
    // Reset form
    addForm.reset();
    
    // Rerender page view
    renderResourceHub(container, state, navigateTo);
  });

  // Attach Event Handlers: Delete Custom Resource
  container.querySelectorAll('.delete-custom-resource-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      customResources.splice(idx, 1);
      localStorage.setItem('opensigma_custom_resources', JSON.stringify(customResources));
      
      // Rerender page view
      renderResourceHub(container, state, navigateTo);
    });
  });

  // Background check setting switch handler
  const autoSyncCheckbox = container.querySelector('#auto-sync-checkbox');
  autoSyncCheckbox.addEventListener('change', () => {
    localStorage.setItem('opensigma_auto_sync_enabled', autoSyncCheckbox.checked.toString());
  });

  // URL sync handler
  const syncBtn = container.querySelector('#sync-now-btn');
  const syncUrlInput = container.querySelector('#sync-url-input');
  const syncConsole = container.querySelector('#sync-console-output');

  syncBtn.addEventListener('click', async () => {
    const rawUrl = syncUrlInput.value.trim();
    localStorage.setItem('opensigma_custom_sync_url', rawUrl);

    // Build URL paths
    const username = "shashank702-star";
    const repo = "opensigma-dataquest";
    
    let remoteVersionUrl = `https://raw.githubusercontent.com/${username}/${repo}/main/curriculum_version.json`;
    let remoteDataUrl = `https://raw.githubusercontent.com/${username}/${repo}/main/curriculum_update.json`;

    if (rawUrl) {
      remoteDataUrl = rawUrl;
      // Extract base version metadata url if standard path, else sync directly
      remoteVersionUrl = rawUrl.replace('curriculum_update.json', 'curriculum_version.json');
    }

    syncConsole.style.display = 'block';
    syncConsole.innerHTML = `&gt; Initialising curriculum sync sequence...<br>`;
    syncConsole.innerHTML += `&gt; Targeting URL: ${remoteDataUrl}<br>`;

    try {
      syncBtn.disabled = true;
      syncBtn.innerHTML = `<i class="spinner" style="width:12px;height:12px;border:2px solid transparent;border-top-color:#ffffff;border-radius:50%;animation:spin 0.8s linear infinite;display:inline-block;margin-right:0.25rem;"></i> Syncing...`;

      // Fetch version file first if available, else fetch raw data direct
      let targetVersion = currentVersion + 0.1;
      try {
        const verRes = await fetch(remoteVersionUrl + '?t=' + Date.now());
        if (verRes.ok) {
          const verData = await verRes.json();
          if (verData.version) targetVersion = parseFloat(verData.version);
        }
      } catch (err) {
        syncConsole.innerHTML += `<span style="color:var(--warning);">&gt; Note: Version check bypassed, downloading data file directly.</span><br>`;
      }

      syncConsole.innerHTML += `&gt; Loading curriculum syllabus payload...<br>`;
      const dataRes = await fetch(remoteDataUrl + '?t=' + Date.now());
      if (!dataRes.ok) {
        throw new Error(`Sync download failed: HTTP Status ${dataRes.status}`);
      }

      const remoteModules = await dataRes.json();
      
      // Basic validation check
      if (!Array.isArray(remoteModules) || remoteModules.length === 0 || !remoteModules[0].lessons) {
        throw new Error("Validation Failed: Invalid curriculum JSON format. Must be an array of module nodes.");
      }

      // Save to cache
      localStorage.setItem('opensigma_curriculum_data', JSON.stringify(remoteModules));
      localStorage.setItem('opensigma_curriculum_version', targetVersion.toString());
      localStorage.setItem('opensigma_last_update_check_time', Date.now().toString());
      window.openSigmaModules = remoteModules;

      syncConsole.innerHTML += `<span style="color:var(--success);">&gt; SUCCESS: Syllabus synced successfully! Loaded ${remoteModules.length} paths, ${remoteModules.reduce((s, m) => s + m.lessons.length, 0)} courses.</span><br>`;
      syncConsole.innerHTML += `&gt; Reloading application frame in 1.5 seconds...`;

      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (err) {
      console.error(err);
      syncConsole.innerHTML += `<span style="color:var(--danger);">&gt; ERROR: Sync aborted. ${err.message}</span><br>`;
      syncBtn.disabled = false;
      syncBtn.innerHTML = `<i data-lucide="refresh-cw" style="width:14px;height:14px;"></i> Sync & Pull Remote`;
      if (window.lucide) window.lucide.createIcons();
    }
  });

  // Local File Uploader JSON Syllabus Parser
  const fileInput = container.querySelector('#syllabus-file-input');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    syncConsole.style.display = 'block';
    syncConsole.innerHTML = `&gt; Reading uploaded local file: ${file.name}...<br>`;

    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const fileContent = evt.target.result;
        const parsedData = JSON.parse(fileContent);

        // Validation checks
        if (!Array.isArray(parsedData) || parsedData.length === 0 || !parsedData[0].lessons) {
          throw new Error("Invalid format. Must be a valid JSON array of curriculum modules.");
        }

        const newVer = currentVersion + 0.1;
        localStorage.setItem('opensigma_curriculum_data', JSON.stringify(parsedData));
        localStorage.setItem('opensigma_curriculum_version', newVer.toString());
        localStorage.setItem('opensigma_last_update_check_time', Date.now().toString());
        window.openSigmaModules = parsedData;

        syncConsole.innerHTML += `<span style="color:var(--success);">&gt; SUCCESS: Local file parsed! Loaded v${newVer.toFixed(1)} curriculum (${parsedData.length} paths).</span><br>`;
        syncConsole.innerHTML += `&gt; Reloading application frame in 1.5 seconds...`;

        setTimeout(() => {
          window.location.reload();
        }, 1500);

      } catch (err) {
        syncConsole.innerHTML += `<span style="color:var(--danger);">&gt; ERROR: Parsing failed. ${err.message}</span><br>`;
        fileInput.value = ''; // Reset input
      }
    };
    reader.readAsText(file);
  });

  // Reset Syllabus to default
  const resetBtn = container.querySelector('#reset-syllabus-btn');
  resetBtn.addEventListener('click', () => {
    syncConsole.style.display = 'block';
    syncConsole.innerHTML = `&gt; Clearing curriculum cache indices...<br>`;
    
    localStorage.removeItem('opensigma_curriculum_data');
    localStorage.removeItem('opensigma_curriculum_version');
    localStorage.removeItem('opensigma_custom_sync_url');
    window.openSigmaModules = defaultModules;

    syncConsole.innerHTML += `<span style="color:var(--warning);">&gt; Default baseline restored successfully.</span><br>`;
    syncConsole.innerHTML += `&gt; Reloading application frame in 1.5 seconds...`;

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  });

  // Render icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Switch UI checkbox helper styles injector
function applySwitchStyles() {
  const checkbox = document.getElementById('auto-sync-checkbox');
  if (!checkbox) return;

  const slider = checkbox.nextElementSibling;
  
  // Base slider style
  slider.style.borderRadius = "34px";
  slider.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
  slider.style.border = "1px solid var(--border-light)";
  slider.style.transition = "0.3s";
  slider.style.position = "absolute";
  slider.style.top = "0";
  slider.style.left = "0";
  slider.style.right = "0";
  slider.style.bottom = "0";
  slider.style.cursor = "pointer";

  // Create inner circle knob
  const knobId = 'switch-knob-style';
  if (!document.getElementById(knobId)) {
    const style = document.createElement('style');
    style.id = knobId;
    style.innerHTML = `
      .switch-container input:checked + .slider {
        background-color: var(--secondary-glow) !important;
        border-color: var(--secondary) !important;
        box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
      }
      .switch-container .slider::before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
        left: 3px;
        bottom: 3px;
        background-color: var(--text-secondary);
        transition: .3s;
        border-radius: 50%;
      }
      .switch-container input:checked + .slider::before {
        transform: translateX(22px);
        background-color: var(--secondary);
      }
    `;
    document.head.appendChild(style);
  }
}
