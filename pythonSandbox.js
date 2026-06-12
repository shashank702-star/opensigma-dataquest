let pyodideInstance = null;
let isInitializing = false;

// Pre-defined templates for Python
const templates = {
  basic: `# Basic calculations and lists
numbers = [10, 25, 30, 45, 50]
total = sum(numbers)
count = len(numbers)
mean = total / count

print(f"List: {numbers}")
print(f"Total Sum: {total}")
print(f"Mean Average: {mean}")
`,
  pandas: `# Load mock Titanic dataset and query
import pandas as pd

# Load the auto-generated titanic.csv
df = pd.read_csv('titanic.csv')

print("--- Titanic DataFrame (First 5 Rows) ---")
print(df)
print("\\n--- DataFrame Summary Statistics ---")
print(df.describe())

print("\\n--- Filter: Passengers in 1st Class (Pclass = 1) ---")
first_class = df[df['Pclass'] == 1]
print(first_class[['Name', 'Age', 'Fare']])
`,
  numpy: `# NumPy operations
import numpy as np

# Create a 2D matrix
matrix = np.array([[1, 2], [3, 4]])
print("Original Matrix:\\n", matrix)

# Multiply by scalar
doubled = matrix * 2
print("\\nDoubled Matrix:\\n", doubled)

# Matrix multiplication (Dot product)
dot_product = np.dot(matrix, matrix)
print("\\nDot Product of Matrix with itself:\\n", dot_product)
`
};

export async function initPyodide(onOutput, onError, onStatusChange) {
  if (pyodideInstance) return pyodideInstance;
  if (isInitializing) return null;
  
  isInitializing = true;
  onStatusChange("Downloading Python WASM runtime (~10MB)...");
  
  try {
    const pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
    });
    
    onStatusChange("Loading Pandas & NumPy libraries...");
    await pyodide.loadPackage(["numpy", "pandas"]);
    
    // Redirect print outputs
    pyodide.setStdout({
      batched: (text) => {
        onOutput(text);
      }
    });
    
    pyodide.setStderr({
      batched: (text) => {
        onError(text);
      }
    });
    
    // Setup file system inside Pyodide with sample CSV data
    pyodide.runPython(`
import pandas as pd
import numpy as np

titanic_data = {
    'PassengerId': [1, 2, 3, 4, 5, 6, 7, 8],
    'Survived': [0, 1, 1, 1, 0, 0, 0, 1],
    'Pclass': [3, 1, 3, 1, 3, 3, 1, 3],
    'Name': [
        'Braund, Mr. Owen Harris', 
        'Cumings, Mrs. John Bradley', 
        'Heikkinen, Miss. Laina', 
        'Futrelle, Mrs. Jacques Heath', 
        'Allen, Mr. William Henry',
        'Moran, Mr. James',
        'McCarthy, Mr. Timothy J',
        'Johnson, Mrs. Oscar W'
    ],
    'Sex': ['male', 'female', 'female', 'female', 'male', 'male', 'male', 'female'],
    'Age': [22, 38, 26, 35, 35, 29, 54, 27],
    'Fare': [7.25, 71.28, 7.925, 53.10, 8.05, 8.46, 51.86, 11.13]
}
df = pd.DataFrame(titanic_data)
df.to_csv('titanic.csv', index=False)
    `);
    
    pyodideInstance = pyodide;
    isInitializing = false;
    onStatusChange("Ready");
    return pyodide;
  } catch (err) {
    isInitializing = false;
    onStatusChange("Failed");
    onError("Initialization failed: " + err.message);
    throw err;
  }
}

export function renderPythonSandbox(container, state, initialCode = "") {
  container.innerHTML = `
    <div class="workspace-grid anim-slide-up">
      
      <!-- Code Editor Panel -->
      <div class="glass-panel workspace-panel">
        <div class="panel-header">
          <div class="panel-title">
            <i data-lucide="terminal" style="color: var(--primary);"></i>
            <span>Python Script Editor</span>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <select id="py-template-select" class="form-select" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; width: auto;">
              <option value="basic">Template: Basic Calculation</option>
              <option value="pandas" selected>Template: Pandas CSV Query</option>
              <option value="numpy">Template: NumPy Matrix</option>
            </select>
          </div>
        </div>
        
        <div class="panel-content" style="padding: 0; display: flex; flex-direction: column;">
          <div class="code-editor-wrapper" style="border: none; border-radius: 0; flex: 1;">
            <div class="code-editor-header">
              <span>script.py</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Tab key inserts 4 spaces</span>
            </div>
            <textarea id="python-code-area" class="code-editor-area" spellcheck="false">${initialCode || templates.pandas}</textarea>
          </div>
        </div>
        
        <div class="panel-footer">
          <button id="clear-console-btn" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
            <i data-lucide="trash" style="width: 14px; height: 14px;"></i> Clear Console
          </button>
          <button id="run-python-btn" class="btn btn-primary" style="font-size: 0.8rem; padding: 0.4rem 1.2rem;">
            <i data-lucide="play" style="width: 14px; height: 14px;"></i> Run Script
          </button>
        </div>
      </div>
      
      <!-- Console and Instructions Panel -->
      <div class="glass-panel workspace-panel">
        <div class="panel-header">
          <div class="panel-title">
            <i data-lucide="terminal-square" style="color: var(--secondary);"></i>
            <span>Output Console</span>
          </div>
        </div>
        
        <div class="panel-content" style="display: flex; flex-direction: column; gap: 1rem;">
          <div id="py-loading-overlay" class="loading-overlay" style="display: none;">
            <div class="spinner"></div>
            <p id="py-loading-status" style="font-size: 0.85rem; font-weight: 500;"></p>
          </div>

          <div class="console-wrapper" style="flex: 1;">
            <div class="console-header">
              <span>sys.stdout</span>
              <button id="copy-output-btn" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer;">
                <i data-lucide="copy" style="width:12px;height:12px;"></i>
              </button>
            </div>
            <div id="python-console" class="console-content empty">Console output will appear here after clicking "Run Script"...</div>
          </div>
          
          <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; padding: 0.85rem; background: rgba(255,255,255,0.01); border: 1px solid var(--border-light); border-radius: var(--border-radius-md);">
            <strong style="color: var(--text-primary); display: block; margin-bottom: 0.25rem;">🔬 In-Browser Python Sandbox Info:</strong>
            This console loads the full Python 3.11 engine in WebAssembly. Operations are executed 100% locally.
            You can import <code>pandas</code>, <code>numpy</code>, or read the preloaded <code>titanic.csv</code> dataset.
          </div>
        </div>
      </div>

    </div>
  `;

  // UI elements
  const codeArea = document.getElementById('python-code-area');
  const runBtn = document.getElementById('run-python-btn');
  const clearConsoleBtn = document.getElementById('clear-console-btn');
  const pyConsole = document.getElementById('python-console');
  const templateSelect = document.getElementById('py-template-select');
  const loadingOverlay = document.getElementById('py-loading-overlay');
  const loadingStatus = document.getElementById('py-loading-status');
  const copyBtn = document.getElementById('copy-output-btn');

  // Handle Tab key in textarea
  codeArea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeArea.selectionStart;
      const end = codeArea.selectionEnd;
      codeArea.value = codeArea.value.substring(0, start) + "    " + codeArea.value.substring(end);
      codeArea.selectionStart = codeArea.selectionEnd = start + 4;
    }
  });

  // Handle Template Changes
  templateSelect.addEventListener('change', () => {
    codeArea.value = templates[templateSelect.value];
  });

  // Clear Console
  clearConsoleBtn.addEventListener('click', () => {
    pyConsole.textContent = 'Console output will appear here after clicking "Run Script"...';
    pyConsole.className = 'console-content empty';
  });

  // Copy output
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(pyConsole.textContent);
  });

  // Run script
  runBtn.addEventListener('click', async () => {
    pyConsole.textContent = "";
    pyConsole.className = "console-content";
    
    loadingOverlay.style.display = "flex";
    runBtn.disabled = true;
    
    try {
      const pyodide = await initPyodide(
        (text) => {
          pyConsole.textContent += text + "\n";
        },
        (err) => {
          pyConsole.textContent += err + "\n";
          pyConsole.classList.add("error");
        },
        (status) => {
          loadingStatus.textContent = status;
        }
      );
      
      loadingOverlay.style.display = "none";
      
      const code = codeArea.value;
      await pyodide.runPythonAsync(code);
      
      if (pyConsole.textContent.trim() === "") {
        pyConsole.textContent = "[Script finished executing successfully with no output]";
        pyConsole.classList.add("success");
      }
    } catch (err) {
      loadingOverlay.style.display = "none";
      pyConsole.textContent += "\nRuntime Error: " + err.message;
      pyConsole.classList.add("error");
    } finally {
      runBtn.disabled = false;
    }
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
