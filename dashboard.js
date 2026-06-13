export function renderDashboard(container, state, navigateTo) {
  const modules = window.openSigmaModules;

  // Compute metrics
  const totalLessons = modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const completedLessons = Object.keys(state.completedLessons || {}).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  
  const exercisesSolved = Object.keys(state.solvedExercises || {}).length;
  
  // Count achievements
  const achievements = [
    {
      id: 'first-code',
      title: 'Hello Python',
      desc: 'Completed your first Python coding challenge.',
      icon: '🐍',
      unlocked: state.solvedExercises && Object.keys(state.solvedExercises).some(k => k.includes('python'))
    },
    {
      id: 'sql-wizard',
      title: 'Query Master',
      desc: 'Completed your first SQL query execution challenge.',
      icon: '💾',
      unlocked: state.solvedExercises && Object.keys(state.solvedExercises).some(k => k.includes('sql'))
    },
    {
      id: 'viz-creator',
      title: 'Visual Artist',
      desc: 'Loaded the Data Visualizer sandbox.',
      icon: '📊',
      unlocked: state.openedVisualizer || false
    },
    {
      id: 'data-alchemist',
      title: 'Data Alchemist',
      desc: 'Completed all lessons in the curriculum!',
      icon: '🏆',
      unlocked: completedLessons === totalLessons && totalLessons > 0
    }
  ];
  
  const unlockedCount = achievements.filter(a => a.unlocked).length;
 
  // Render main layout
  container.innerHTML = `
    <div class="anim-slide-up">
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem;">
          Welcome Back, <span class="text-gradient">Data Scout</span>
        </h1>
        <p style="color: var(--text-secondary); font-size: 1rem;">
          Track your progress, run sandboxed calculations, and build charts interactively.
        </p>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="dashboard-grid">
        <div class="glass-panel stat-card glass-panel-glow-indigo">
          <div class="stat-icon purple">
            <i data-lucide="graduation-cap"></i>
          </div>
          <div class="stat-info">
            <span class="stat-value">${progressPercent}%</span>
            <span class="stat-label">Academy Completion</span>
          </div>
        </div>

        <div class="glass-panel stat-card">
          <div class="stat-icon cyan">
            <i data-lucide="terminal"></i>
          </div>
          <div class="stat-info">
            <span class="stat-value">${completedLessons} / ${totalLessons}</span>
            <span class="stat-label">Lessons Finished</span>
          </div>
        </div>

        <div class="glass-panel stat-card">
          <div class="stat-icon green">
            <i data-lucide="award"></i>
          </div>
          <div class="stat-info">
            <span class="stat-value">${unlockedCount} / ${achievements.length}</span>
            <span class="stat-label">Badges Unlocked</span>
          </div>
        </div>
      </div>

      <!-- Content Split Section -->
      <div class="dashboard-sections">
        
        <!-- Left Side: Curriculum Learning Paths -->
        <div class="glass-panel section-card">
          <div class="card-title">
            <span>Learning Paths</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">Guided Curriculum</span>
          </div>
          
          <div class="path-list">
            ${modules.map(mod => {
              const modCompleted = mod.lessons.filter(l => state.completedLessons && state.completedLessons[l.id]).length;
              const modTotal = mod.lessons.length;
              const modPercent = Math.round((modCompleted / modTotal) * 100);
              
              return `
                <div class="path-card">
                  <div class="path-meta">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                      <span class="badge ${mod.id.includes('python') ? 'badge-purple' : mod.id.includes('sql') ? 'badge-cyan' : 'badge-green'}">
                        ${mod.id.split('-')[0]}
                      </span>
                      <h3 class="path-title">${mod.title}</h3>
                    </div>
                    <p class="path-desc">${mod.description}</p>
                    
                    <div style="display: flex; align-items: center; gap: 1rem; width: 100%;">
                      <div class="progress-bar-container" style="flex: 1; max-width: 200px;">
                        <div class="progress-bar-fill" style="width: ${modPercent}%"></div>
                      </div>
                      <span style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 600;">
                        ${modCompleted}/${modTotal} Lessons
                      </span>
                    </div>
                  </div>
                  
                  <button class="btn btn-secondary start-path-btn" data-module="${mod.id}" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
                    ${modPercent === 100 ? 'Review' : modPercent > 0 ? 'Resume' : 'Start'}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Right Side: Achievements & Sandboxes Panel -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- Achievements Card -->
          <div class="glass-panel section-card">
            <h3 class="card-title" style="margin-bottom: 1rem;">Badges & Trophies</h3>
            <div class="achievement-list">
              ${achievements.map(ach => `
                <div class="achievement-item ${ach.unlocked ? 'unlocked' : ''}">
                  <div class="achievement-badge">
                    ${ach.icon}
                  </div>
                  <div class="achievement-info">
                    <span class="achievement-title">${ach.title}</span>
                    <span class="achievement-desc">${ach.desc}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Quick Access Sandboxes & Resources -->
          <div class="glass-panel section-card" style="background: rgba(99, 102, 241, 0.02); border-color: rgba(99, 102, 241, 0.1);">
            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--secondary); box-shadow: 0 0 8px var(--secondary);"></span>
              Quick Access Tools
            </h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1rem;">
              Launch sandboxes, download cheat sheets, or manage syllabus updates.
            </p>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <button class="btn btn-primary w-full quick-sandbox-btn" data-target="python" style="font-size: 0.8rem; padding: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
                <i data-lucide="terminal" style="width: 16px; height: 16px;"></i> Python Playground
              </button>
              <button class="btn btn-secondary w-full quick-sandbox-btn" data-target="sql" style="font-size: 0.8rem; padding: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem;">
                <i data-lucide="database" style="width: 16px; height: 16px;"></i> SQL Playground
              </button>
              <button class="btn btn-secondary w-full quick-sandbox-btn" data-target="resources" style="font-size: 0.8rem; padding: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem; border-color: rgba(6, 182, 212, 0.2); color: var(--secondary);">
                <i data-lucide="library" style="width: 16px; height: 16px;"></i> Resource Library & Updater
              </button>
              <button id="dashboard-reset-btn" class="btn btn-secondary w-full" style="font-size: 0.8rem; padding: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.35rem; border-color: rgba(245, 158, 11, 0.15); color: var(--warning);">
                <i data-lucide="rotate-ccw" style="width: 16px; height: 16px;"></i> Reset Progress & Tour
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  container.querySelectorAll('.start-path-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modId = btn.getAttribute('data-module');
      const mod = modules.find(m => m.id === modId);
      if (mod && mod.lessons.length > 0) {
        navigateTo(`lesson-${mod.lessons[0].id}`);
      }
    });
  });

  container.querySelectorAll('.quick-sandbox-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      navigateTo(target);
    });
  });

  const resetBtn = container.querySelector('#dashboard-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const confirmReset = confirm("Are you sure you want to reset all your learning progress, completed exercises, and badges, and return to the Guest Landing Page?");
      if (confirmReset) {
        localStorage.removeItem('dataquest_user_state');
        localStorage.removeItem('opensigma_onboarded');
        
        // Wipe local memory
        state.completedLessons = {};
        state.solvedExercises = {};
        state.openedVisualizer = false;
        
        // Reload site to apply landing state
        window.location.reload();
      }
    });
  }

  // Re-create icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}
