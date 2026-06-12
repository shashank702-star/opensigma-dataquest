import { modules } from './lessons.js';
import { renderDashboard } from './dashboard.js';
import { renderPythonSandbox } from './pythonSandbox.js';
import { renderSqlSandbox } from './sqlSandbox.js';
import { renderDataVisualizer } from './dataVisualizer.js';
import { renderLessonViewer } from './lessonViewer.js';

// Global state model
const state = {
  completedLessons: {},
  solvedExercises: {},
  openedVisualizer: false,
  pythonSandboxPreset: "",
  sqlSandboxPreset: ""
};

// Load state from localStorage on init
function loadUserState() {
  try {
    const saved = localStorage.getItem('dataquest_user_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(state, parsed);
    }
  } catch (err) {
    console.error("Failed to load user state:", err);
  }
}

// Save state function accessible globally
window.saveUserState = function() {
  try {
    localStorage.setItem('dataquest_user_state', JSON.stringify({
      completedLessons: state.completedLessons,
      solvedExercises: state.solvedExercises,
      openedVisualizer: state.openedVisualizer
    }));
  } catch (err) {
    console.error("Failed to save user state:", err);
  }
};

// Calculate progress percentage
function getProgressPercent() {
  const totalLessons = modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const completed = Object.keys(state.completedLessons || {}).length;
  return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
}

// Navigate router helper
function navigateTo(route) {
  window.location.hash = '/' + route;
}

// Renders the main outer layout framework
function renderMainFrame() {
  const appContainer = document.getElementById('app');
  const pct = getProgressPercent();

  appContainer.innerHTML = `
    <!-- App Sidebar Navigation -->
    <aside id="sidebar" class="app-sidebar">
      <div class="sidebar-brand">
        <div class="brand-icon">
          <i data-lucide="brain-circuit" style="color: #ffffff; width:22px; height:22px;"></i>
        </div>
        <div class="brand-text" style="font-size: 0.95rem; font-weight: 800;">ZeroCost Data</div>
      </div>
      
      <nav class="sidebar-menu">
        <span class="menu-label">Main Portal</span>
        <a id="nav-dashboard" class="menu-item" data-route="dashboard">
          <span class="menu-item-icon"><i data-lucide="layout-dashboard"></i></span>
          <span>Dashboard</span>
        </a>
        
        <span class="menu-label">Interactive Sandboxes</span>
        <a id="nav-python" class="menu-item" data-route="python">
          <span class="menu-item-icon"><i data-lucide="terminal"></i></span>
          <span>Python Console</span>
        </a>
        <a id="nav-sql" class="menu-item" data-route="sql">
          <span class="menu-item-icon"><i data-lucide="database"></i></span>
          <span>SQL Playground</span>
        </a>
        <a id="nav-visualizer" class="menu-item" data-route="visualizer">
          <span class="menu-item-icon"><i data-lucide="line-chart"></i></span>
          <span>Data Visualizer</span>
        </a>

        <span class="menu-label">Curriculum Courses</span>
        ${modules.map(mod => `
          <a class="menu-item nav-lesson-group" data-route="lesson-${mod.lessons[0].id}">
            <span class="menu-item-icon">
              <i data-lucide="${mod.id.includes('python') ? 'code-2' : mod.id.includes('sql') ? 'database-backup' : 'pie-chart'}"></i>
            </span>
            <span>${mod.title.split(' ')[0]} Path</span>
          </a>
        `).join('')}
      </nav>
      
      <div class="sidebar-footer">
        <div class="progress-widget">
          <div class="progress-header">
            <span>Overall Study Progress</span>
            <span id="sidebar-progress-label">${pct}%</span>
          </div>
          <div class="progress-bar-container">
            <div id="sidebar-progress-fill" class="progress-bar-fill" style="width: ${pct}%"></div>
          </div>
        </div>
        <div style="font-size: 0.7rem; color: var(--text-muted); text-align: center;">
          ZeroCost Data Analytics v1.0 • Client-side
        </div>
      </div>
    </aside>

    <!-- Content Shell -->
    <div class="app-main">
      <header class="app-header">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <button id="sidebar-toggle" class="menu-toggle">
            <i data-lucide="menu"></i>
          </button>
          <div class="header-title">
            <i id="header-icon" data-lucide="layout-dashboard" style="color: var(--primary); width:18px; height:18px;"></i>
            <span id="header-title-text">Dashboard</span>
          </div>
        </div>
        
        <div class="header-actions">
          <div class="badge-glow">
            <i data-lucide="sparkles" style="width: 14px; height:14px;"></i>
            <span>100% Free Learning</span>
          </div>
        </div>
      </header>
      
      <!-- Content View Container -->
      <main id="content-view" class="content-frame"></main>
    </div>
  `;

  // Attach navigation click bindings
  appContainer.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const route = item.getAttribute('data-route');
      navigateTo(route);
      
      // Close sidebar drawer on mobile click
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  // Mobile drawer bindings
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Updates active class states in sidebar links
function updateSidebarActive(activeRoute) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
  });

  // Exact matching for main pages
  if (['dashboard', 'python', 'sql', 'visualizer'].includes(activeRoute)) {
    const target = document.getElementById(`nav-${activeRoute}`);
    if (target) target.classList.add('active');
  } else if (activeRoute.startsWith('lesson-')) {
    // Find lesson ID matching active path modules and highlight module group
    const lesId = activeRoute.replace('lesson-', '');
    let activeMod = null;
    for (const mod of modules) {
      if (mod.lessons.some(l => l.id === lesId)) {
        activeMod = mod;
        break;
      }
    }
    if (activeMod) {
      const items = sidebar.querySelectorAll('.nav-lesson-group');
      items.forEach(el => {
        const routeAttr = el.getAttribute('data-route');
        if (activeMod.lessons.some(l => `lesson-${l.id}` === routeAttr || routeAttr.includes(activeMod.lessons[0].id))) {
          el.classList.add('active');
        }
      });
    }
  }
}

// Main page router
function router() {
  const hash = window.location.hash || '#/dashboard';
  const path = hash.substring(2); // Strip out '#/'
  const viewContainer = document.getElementById('content-view');
  
  if (!viewContainer) {
    // Layout wrapper has not rendered yet (first bootstrap)
    renderMainFrame();
  }

  const freshViewContainer = document.getElementById('content-view');
  const headerIcon = document.getElementById('header-icon');
  const headerTitle = document.getElementById('header-title-text');

  updateSidebarActive(path);

  // Render view
  if (path === 'dashboard') {
    headerIcon.setAttribute('data-lucide', 'layout-dashboard');
    headerIcon.style.color = 'var(--primary)';
    headerTitle.textContent = 'Student Dashboard';
    renderDashboard(freshViewContainer, state, navigateTo);
  } 
  else if (path === 'python') {
    headerIcon.setAttribute('data-lucide', 'terminal');
    headerIcon.style.color = 'var(--primary)';
    headerTitle.textContent = 'Python Console Sandbox';
    
    // Carry over sandbox presets, then clear
    const preset = state.pythonSandboxPreset;
    state.pythonSandboxPreset = "";
    
    renderPythonSandbox(freshViewContainer, state, preset);
  } 
  else if (path === 'sql') {
    headerIcon.setAttribute('data-lucide', 'database');
    headerIcon.style.color = 'var(--secondary)';
    headerTitle.textContent = 'Relational SQL Sandbox';
    
    const preset = state.sqlSandboxPreset;
    state.sqlSandboxPreset = "";
    
    renderSqlSandbox(freshViewContainer, state, preset);
  } 
  else if (path === 'visualizer') {
    headerIcon.setAttribute('data-lucide', 'line-chart');
    headerIcon.style.color = 'var(--success)';
    headerTitle.textContent = 'Data Visualizer Playground';
    renderDataVisualizer(freshViewContainer, state, navigateTo);
  } 
  else if (path.startsWith('lesson-')) {
    const lessonId = path.substring(7);
    headerIcon.setAttribute('data-lucide', 'graduation-cap');
    headerIcon.style.color = 'var(--primary)';
    headerTitle.textContent = 'Academy Lesson Reader';
    renderLessonViewer(freshViewContainer, state, lessonId, navigateTo);
  } 
  else {
    // 404 Fallback - redirect to dashboard (guarantees zero 404 client-side)
    navigateTo('dashboard');
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Initialise Application
document.addEventListener('DOMContentLoaded', () => {
  loadUserState();
  renderMainFrame();
  
  // Set initial routing
  router();
  
  // Listen to hash change routing events
  window.addEventListener('hashchange', router);
});
