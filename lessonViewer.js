import { modules } from './lessons.js';

export function renderLessonViewer(container, state, activeLessonId, navigateTo) {
  // Find current lesson and module
  let currentLesson = null;
  let currentModule = null;
  
  for (const mod of modules) {
    const les = mod.lessons.find(l => l.id === activeLessonId);
    if (les) {
      currentLesson = les;
      currentModule = mod;
      break;
    }
  }

  // Fallback if not found
  if (!currentLesson) {
    container.innerHTML = `
      <div class="glass-panel" style="padding: 2rem; text-align: center;">
        <i data-lucide="alert-triangle" style="width: 48px; height: 48px; color: var(--warning); margin-bottom: 1rem;"></i>
        <h2>Lesson Not Found</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">The requested course module is not available.</p>
        <button class="btn btn-primary" id="err-home-btn">Go to Dashboard</button>
      </div>
    `;
    document.getElementById('err-home-btn')?.addEventListener('click', () => navigateTo('dashboard'));
    return;
  }

  // Render Lesson Grid
  container.innerHTML = `
    <div class="lesson-grid anim-slide-up">
      
      <!-- Left Sidebar: Curriculum Navigator -->
      <div class="glass-panel lesson-sidebar">
        <h3 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.5px; margin-bottom: 1.25rem; padding-left: 0.5rem;">
          Course Contents
        </h3>
        <div class="lesson-nav-list">
          ${modules.map(mod => `
            <div class="lesson-nav-module">
              <span class="module-header">${mod.title}</span>
              ${mod.lessons.map(les => {
                const isActive = les.id === activeLessonId;
                const isCompleted = state.completedLessons && state.completedLessons[les.id];
                return `
                  <div class="lesson-nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" data-lesson-id="${les.id}">
                    <span style="display: flex; align-items: center; gap: 0.5rem; text-align: left;">
                      <i data-lucide="${isCompleted ? 'check-circle-2' : isActive ? 'book-open' : 'circle'}" style="width: 14px; height: 14px; flex-shrink: 0;"></i>
                      <span>${les.title}</span>
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- Right Pane: Lesson Content & Quizzes -->
      <div class="glass-panel lesson-content-pane">
        
        <!-- Header banner -->
        <div class="panel-header" style="flex-shrink: 0;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="badge badge-purple" style="font-size: 0.65rem;">${currentModule.title.split(' ')[0]}</span>
            <span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 500;">
              ${currentModule.lessons.indexOf(currentLesson) + 1} of ${currentModule.lessons.length}
            </span>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <!-- Next / Prev Buttons -->
            <button id="lesson-prev-btn" class="btn btn-secondary" style="padding: 0.3rem 0.65rem; font-size: 0.75rem;">
              <i data-lucide="chevron-left" style="width: 12px; height: 12px;"></i> Prev
            </button>
            <button id="lesson-next-btn" class="btn btn-secondary" style="padding: 0.3rem 0.65rem; font-size: 0.75rem;">
              Next <i data-lucide="chevron-right" style="width: 12px; height: 12px;"></i>
            </button>
          </div>
        </div>
        
        <!-- Text Pane -->
        <div class="panel-content markdown-body" style="padding: 2rem;">
          
          <h1 style="font-size: 1.85rem; font-weight: 800; margin-bottom: 0.5rem;">${currentLesson.title}</h1>
          <hr style="border: 0; border-top: 1px solid var(--border-light); margin-bottom: 1rem;" />
          
          <div>
            ${currentLesson.content}
          </div>

          <!-- Sandbox Integration Box -->
          ${currentLesson.exercise ? `
            <div style="background: rgba(99, 102, 241, 0.03); border: 1px dashed rgba(99, 102, 241, 0.3); border-radius: var(--border-radius-md); padding: 1.5rem; margin-top: 1.5rem;">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <i data-lucide="terminal" style="width:16px;height:16px;color:var(--primary);"></i>
                Coding Challenge / Practice Exercise
              </h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
                ${currentLesson.exercise.prompt}
              </p>
              <button id="launch-sandbox-btn" class="btn btn-primary" style="font-size: 0.8rem; padding: 0.45rem 1rem;">
                Open Sandbox & Load Exercise
              </button>
            </div>
          ` : ''}

          <!-- Quiz Module -->
          <div class="quiz-container">
            <div class="quiz-card">
              <div class="quiz-question">
                <span style="color: var(--secondary); margin-right: 0.5rem;">Concept Quiz:</span>
                ${currentLesson.quiz.question}
              </div>
              <div class="quiz-options">
                ${currentLesson.quiz.options.map((opt, idx) => `
                  <button class="quiz-option" data-idx="${idx}">
                    <span class="option-bullet" style="width:20px;height:20px;border-radius:50%;border:1px solid var(--border-medium);display:flex;align-items:center;justify-content:center;font-size:0.7rem;">
                      ${String.fromCharCode(65 + idx)}
                    </span>
                    <span style="text-align: left; flex:1;">${opt}</span>
                  </button>
                `).join('')}
              </div>
              
              <!-- Quiz feedback card -->
              <div id="quiz-feedback-box" class="quiz-feedback">
                <!-- Text updated dynamically -->
              </div>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  `;

  // Attach event bindings
  const lessonItems = container.querySelectorAll('.lesson-nav-item');
  lessonItems.forEach(item => {
    item.addEventListener('click', () => {
      navigateTo(`lesson-${item.getAttribute('data-lesson-id')}`);
    });
  });

  // Previous & Next navigation
  const flatLessons = modules.flatMap(m => m.lessons);
  const curIdx = flatLessons.findIndex(l => l.id === activeLessonId);
  
  const prevBtn = document.getElementById('lesson-prev-btn');
  const nextBtn = document.getElementById('lesson-next-btn');

  if (curIdx === 0) {
    prevBtn.disabled = true;
    prevBtn.style.opacity = 0.5;
  } else {
    prevBtn.addEventListener('click', () => {
      navigateTo(`lesson-${flatLessons[curIdx - 1].id}`);
    });
  }

  if (curIdx === flatLessons.length - 1) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = 0.5;
  } else {
    nextBtn.addEventListener('click', () => {
      navigateTo(`lesson-${flatLessons[curIdx + 1].id}`);
    });
  }

  // Launch Code Sandbox Button
  const launchBtn = document.getElementById('launch-sandbox-btn');
  if (launchBtn && currentLesson.exercise) {
    launchBtn.addEventListener('click', () => {
      // Set sandbox preset query/code into the global state before navigating
      if (currentLesson.exercise.type === 'python') {
        state.pythonSandboxPreset = currentLesson.exercise.initialCode;
        navigateTo('python');
      } else if (currentLesson.exercise.type === 'sql') {
        state.sqlSandboxPreset = currentLesson.exercise.initialCode;
        navigateTo('sql');
      }
    });
  }

  // Quiz interactive solver
  const quizOptions = container.querySelectorAll('.quiz-option');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const correctIdx = currentLesson.quiz.correctIdx;

  // Check if already completed
  const alreadyCompleted = state.completedLessons && state.completedLessons[activeLessonId];
  if (alreadyCompleted) {
    // Highlight correct option automatically
    const optBtn = container.querySelector(`.quiz-option[data-idx="${correctIdx}"]`);
    if (optBtn) {
      optBtn.classList.add('correct');
      const bullet = optBtn.querySelector('.option-bullet');
      if (bullet) {
        bullet.innerHTML = '✓';
        bullet.style.borderColor = 'var(--success)';
        bullet.style.backgroundColor = 'var(--success)';
        bullet.style.color = '#ffffff';
      }
    }
    feedbackBox.className = 'quiz-feedback show correct';
    feedbackBox.innerHTML = `<strong>Correct!</strong> ${currentLesson.quiz.explanation}`;
  }

  quizOptions.forEach(optBtn => {
    optBtn.addEventListener('click', () => {
      const idx = parseInt(optBtn.getAttribute('data-idx'));
      
      // Reset option selections
      quizOptions.forEach(b => {
        b.className = 'quiz-option';
        const bIdx = parseInt(b.getAttribute('data-idx'));
        b.querySelector('.option-bullet').innerHTML = String.fromCharCode(65 + bIdx);
        b.querySelector('.option-bullet').style = '';
      });

      const bullet = optBtn.querySelector('.option-bullet');

      if (idx === correctIdx) {
        // Correct answer
        optBtn.classList.add('correct');
        bullet.innerHTML = '✓';
        bullet.style.borderColor = 'var(--success)';
        bullet.style.backgroundColor = 'var(--success)';
        bullet.style.color = '#ffffff';
        
        feedbackBox.className = 'quiz-feedback show correct';
        feedbackBox.innerHTML = `<strong>Correct! 🎉</strong> ${currentLesson.quiz.explanation}`;
        
        // Mark lesson completed
        if (!state.completedLessons) state.completedLessons = {};
        state.completedLessons[activeLessonId] = true;
        
        // Mark as solved exercise
        if (!state.solvedExercises) state.solvedExercises = {};
        state.solvedExercises[activeLessonId] = true;
        
        // Save progress
        if (window.saveUserState) window.saveUserState();

        // Update progress bar in sidebar if present
        updateSidebarProgressBar();
      } else {
        // Incorrect answer
        optBtn.classList.add('incorrect');
        bullet.innerHTML = '✗';
        bullet.style.borderColor = 'var(--danger)';
        bullet.style.backgroundColor = 'var(--danger)';
        bullet.style.color = '#ffffff';
        
        feedbackBox.className = 'quiz-feedback show incorrect';
        feedbackBox.innerHTML = `<strong>Incorrect.</strong> Let's review the prompt content and try again! Hint: ${currentLesson.quiz.explanation.split('.')[0]}.`;
      }
    });
  });

  function updateSidebarProgressBar() {
    const total = flatLessons.length;
    const completed = Object.keys(state.completedLessons || {}).length;
    const pct = Math.round((completed / total) * 100);
    
    const fill = document.getElementById('sidebar-progress-fill');
    const label = document.getElementById('sidebar-progress-label');
    if (fill) fill.style.width = pct + '%';
    if (label) label.textContent = pct + '%';

    // Also toggle completed state icons on sidebar
    const navItem = container.querySelector(`.lesson-nav-item[data-lesson-id="${activeLessonId}"]`);
    if (navItem) {
      navItem.classList.add('completed');
      const icon = navItem.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', 'check-circle-2');
        if (window.lucide) window.lucide.createIcons();
      }
    }
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
