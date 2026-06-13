// Lessons database for OpenSigma DataQuest Academy
export const modules = [
  {
    id: "ds-basics",
    title: "Data Science & Analysis Basics",
    description: "Learn what Data Science is, the differences between careers, and the fundamental statistics required.",
    lessons: [
      {
        id: "what-is-ds",
        title: "What is Data Science & Data Analysis?",
        content: `
<h2>What is Data Science & Data Analysis?</h2>
<p>Data is the new oil, but only if it's refined. <strong>Data Science</strong> is the interdisciplinary field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from noisy, structured, and unstructured data.</p>

<h3>The Four Types of Data Analysis</h3>
<p>In data analysis, we generally categorize our work into four stages based on complexity and value:</p>
<ol>
  <li><strong>Descriptive Analysis:</strong> "What happened?" Summarizing historical data (e.g., monthly sales charts).</li>
  <li><strong>Diagnostic Analysis:</strong> "Why did it happen?" Digging deeper to find causes (e.g., analyzing why sales dropped in April).</li>
  <li><strong>Predictive Analysis:</strong> "What is likely to happen?" Forecasting future trends using statistical models or machine learning.</li>
  <li><strong>Prescriptive Analysis:</strong> "How can we make it happen?" Recommending courses of action to capitalize on forecasts.</li>
</ol>

<h3>Data Analyst vs. Data Scientist</h3>
<ul>
  <li><strong>Data Analysts:</strong> Typically focus on Descriptive and Diagnostic analysis. They query databases with SQL, build visualization dashboards, and report findings to business stakeholders.</li>
  <li><strong>Data Scientists:</strong> Focus more on Predictive and Prescriptive analysis. They write advanced Python/R code, build machine learning models, and design experimental tests (like A/B testing).</li>
</ul>

<blockquote>
  <strong>Data Science Lifecycle:</strong> Business Understanding &rarr; Data Collection &rarr; Data Cleaning &rarr; Exploratory Data Analysis (EDA) &rarr; Model Building &rarr; Deployment.
</blockquote>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://www.kaggle.com/learn" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Interactive Site</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Kaggle Learn Portal</div>
    <div class="resource-desc">Free, hands-on, micro-courses covering Python, SQL, and data visualization.</div>
    <div class="resource-footer">
      <span>Open Kaggle</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=ua-CiDNNj30" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Guide</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">What is Data Science? (Socratica)</div>
    <div class="resource-desc">A brief, elegant 5-minute introduction to the field and its core disciplines.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://grow.google/certificates/data-analytics/" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Curriculum Docs</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Google Data Analytics Syllabus</div>
    <div class="resource-desc">Syllabus overview and guides from the famous professional certificate roadmap.</div>
    <div class="resource-footer">
      <span>View Syllabus</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "Which type of data analysis answers the question: 'What is likely to happen in the future?'",
          options: [
            "Descriptive Analysis",
            "Diagnostic Analysis",
            "Predictive Analysis",
            "Prescriptive Analysis"
          ],
          correctIdx: 2,
          explanation: "Predictive analysis uses historical data, statistical algorithms, and machine learning techniques to identify the likelihood of future outcomes."
        },
        exercise: {
          type: "python",
          prompt: "<b>Real-World Scenario: Career Onboarding</b><br>You are setting up the profile database for a new recruit. Define a variable named `role` with the string value 'Data Analyst' to designate their team role, and print the results.",
          initialCode: `# Scenario: HR Portal Onboarding
# Define the onboarding role variable below
role = 

print("System Alert: New user onboarded as:", role)
`,
          solution: "role = 'Data Analyst'",
          testCode: "assert role == 'Data Analyst', 'Role should be equal to the string \"Data Analyst\"'"
        }
      },
      {
        id: "stats-basics",
        title: "Foundations of Statistics",
        content: `
<h2>Foundations of Statistics</h2>
<p>Data science relies heavily on statistics to describe data properties and make decisions.</p>

<h3>Measures of Central Tendency</h3>
<p>These metrics help find the 'center' or typical value of a numerical distribution:</p>
<ul>
  <li><strong>Mean (Average):</strong> The sum of all values divided by the number of values. It is highly sensitive to extreme outliers.</li>
  <li><strong>Median:</strong> The middle value when data is sorted. It is robust and unaffected by outliers.</li>
  <li><strong>Mode:</strong> The most frequently occurring value in the dataset. Useful for categorical variables.</li>
</ul>

<h3>Measures of Dispersion (Spread)</h3>
<p>These describe how spread out the values are:</p>
<ul>
  <li><strong>Range:</strong> The difference between the maximum and minimum values.</li>
  <li><strong>Variance:</strong> The average of the squared differences from the Mean.</li>
  <li><strong>Standard Deviation (&sigma;):</strong> The square root of variance. It represents the average distance of data points from the mean. A small standard deviation means points are clustered close to the mean.</li>
</ul>

<blockquote>
  <strong>Rule of Thumb:</strong> When working with skewed datasets (like incomes, where a few billionaires skew the mean), always look at the <strong>Median</strong> rather than the Mean to get a true sense of the average citizen.
</blockquote>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://www.khanacademy.org/math/statistics-probability" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Math Academy</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Khan Academy Statistics</div>
    <div class="resource-desc">Full comprehensive study courses on probability, distributions, and hypothesis tests.</div>
    <div class="resource-footer">
      <span>Open Khan Academy</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=xxpc-HPKN28" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Course</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Statistics for Data Science (8 Hours)</div>
    <div class="resource-desc">Full university course covering descriptive stats, probability, and testing from freeCodeCamp.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/@statquest" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">YouTube Channel</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">StatQuest with Josh Starmer</div>
    <div class="resource-desc">The ultimate visual explainer channel for statistics and machine learning algorithms.</div>
    <div class="resource-footer">
      <span>Open Channel</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "If a housing dataset contains 100 average homes costing $200,000 and 1 mega-mansion costing $15,000,000, which metric represents the typical home price best?",
          options: [
            "The Mean",
            "The Median",
            "The Standard Deviation",
            "The Range"
          ],
          correctIdx: 1,
          explanation: "The median is robust against extreme outliers. The mega-mansion will skew the mean upwards significantly (making it look like typical houses cost $340,000+), while the median will remain exactly at $200,000."
        },
        exercise: {
          type: "python",
          prompt: "<b>Real-World Scenario: E-Commerce Price Auditing</b><br>You are auditing checkout orders for a storefront. One order contains an extreme outlier purchase ($1,200). Write a Python script to calculate the statistical range (Max price - Min price) of customer purchases to check the pricing distribution variance.",
          initialCode: `# Scenario: Customer transaction prices in USD ($1,200 is an outlier)
order_prices = [15.50, 42.00, 1200.00, 24.99, 89.90, 12.00, 55.00]

# Calculate the pricing range (difference between maximum and minimum price)
num_range = 

print("The pricing range of the cart transactions is: $", num_range)
`,
          solution: "max(order_prices) - min(order_prices)",
          testCode: "assert num_range == 1188.0, 'The range should be the difference between max (1200) and min (12), which is 1188.0.'"
        }
      }
    ]
  },
  {
    id: "python-pandas",
    title: "Python & Pandas Essentials",
    description: "Master the fundamentals of Python programming and data manipulation using Pandas DataFrames.",
    lessons: [
      {
        id: "python-intro",
        title: "Python Basics & Calculations",
        content: `
<h2>Introduction to Python</h2>
<p>Python is the premier programming language for Data Science. Its clean readability and massive ecosystem of packages (Pandas, Numpy, Scikit-Learn) make it the industry standard.</p>

<h3>Lists and Indexing</h3>
<p>Lists are used to store multiple items in a single variable. They are ordered, index-based, and zero-indexed (indexing starts at 0):</p>
<pre><code>prices = [10.5, 20.0, 15.75, 45.90]
# Access first item
first_price = prices[0] # Outputs 10.5
# Access last item
last_price = prices[-1] # Outputs 45.90
</code></pre>

<h3>List Comprehensions</h3>
<p>List comprehensions offer a shorter syntax to create a new list based on the values of an existing list:</p>
<pre><code># Double all prices
doubled_prices = [p * 2 for p in prices]
</code></pre>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://docs.python.org/3/tutorial/" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Documentation</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Official Python Tutorial</div>
    <div class="resource-desc">The official starter tutorial published by the Python Software Foundation.</div>
    <div class="resource-footer">
      <span>Read Tutorial</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=eWRfhZUzrEs" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Guide</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Python for Beginners (Mosh)</div>
    <div class="resource-desc">A highly popular 6-hour video course explaining variables, loops, lists, and OOP.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://perso.limsi.fr/pointal/_media/python:cours:mementopython3-english.pdf" download class="resource-card">
    <div class="resource-header">
      <span class="resource-badge pdf">Download Sheet</span>
      <i data-lucide="download" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Python 3 Quick Reference Cheat Sheet</div>
    <div class="resource-desc">Printable PDF cheat sheet covering indexing, loops, functions, and list syntaxes.</div>
    <div class="resource-footer">
      <span>Download PDF</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "Given a list `data = [10, 20, 30, 40]`, what is the output of `data[1:3]`?",
          options: [
            "[10, 20]",
            "[20, 30]",
            "[20, 30, 40]",
            "[10, 20, 30]"
          ],
          correctIdx: 1,
          explanation: "Slicing `data[1:3]` starts at index 1 (inclusive) and goes up to index 3 (exclusive), returning indices 1 and 2: [20, 30]."
        },
        exercise: {
          type: "python",
          prompt: "<b>Real-World Scenario: Marketing Campaign Targeting</b><br>You are filtering user feedback scores. To target satisfied customers for an email campaign, write a list comprehension that extracts only customer scores that are **70 or greater**. Store these in `passing_scores`.",
          initialCode: `# Customer survey scores (0 to 100)
survey_scores = [55, 82, 90, 68, 74, 48, 95]

# Write a list comprehension to filter values >= 70
passing_scores = 

print("Targeted Satisfied Customers:", passing_scores)
`,
          solution: "[s for s in survey_scores if s >= 70]",
          testCode: "assert set(passing_scores) == {82, 90, 74, 95}, 'The filtered list should only contain [82, 90, 74, 95].'"
        }
      },
      {
        id: "pandas-dataframes",
        title: "Introduction to Pandas DataFrames",
        content: `
<h2>Introduction to Pandas DataFrames</h2>
<p>Pandas is Python's primary library for data structure manipulation. The core object is the <strong>DataFrame</strong>, which represents a tabular, two-dimensional dataset with rows and columns.</p>

<h3>DataFrame Construction & Inspection</h3>
<pre><code>import pandas as pd

# Dict representing tabular data
data = {
    'Fruit': ['Apple', 'Banana', 'Cherry'],
    'Qty': [15, 24, 9],
    'Price': [0.80, 0.45, 1.20]
}
df = pd.DataFrame(data)

# Print first few rows
print(df.head(2))
</code></pre>

<h3>DataFrame Properties</h3>
<ul>
  <li><code>df.shape</code>: Returns a tuple showing (rows, columns).</li>
  <li><code>df.info()</code>: Summarizes column names, non-null values, and data types.</li>
  <li><code>df.describe()</code>: Computes summary statistics for numeric columns.</li>
</ul>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://pandas.pydata.org/docs/getting_started/index.html" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Documentation</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Pandas Getting Started Guide</div>
    <div class="resource-desc">The official introduction documentation containing tutorials on importing and plotting.</div>
    <div class="resource-footer">
      <span>Read Guides</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=vmEHCJofslg" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Guide</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Pandas for Data Analysis (Keith Galli)</div>
    <div class="resource-desc">A comprehensive video tutorial working through a real-world electronics sales database.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf" download class="resource-card">
    <div class="resource-header">
      <span class="resource-badge pdf">Download Sheet</span>
      <i data-lucide="download" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Official Pandas Cheat Sheet PDF</div>
    <div class="resource-desc">A double-sided cheat sheet covering selections, reshaping, grouping, and aggregations.</div>
    <div class="resource-footer">
      <span>Download PDF</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "Which Pandas property is used to get the number of rows and columns in a DataFrame as a tuple?",
          options: [
            "df.size",
            "df.dimensions()",
            "df.shape",
            "df.count()"
          ],
          correctIdx: 2,
          explanation: "`df.shape` is an attribute (not a function) that returns a tuple of (num_rows, num_columns)."
        },
        exercise: {
          type: "python",
          prompt: "<b>Real-World Scenario: Store Transaction Volume Auditing</b><br>You are verifying sales data imports. Use the `.shape` attribute to extract the total number of transaction records (rows) from the `sales_df` DataFrame, and assign it to `row_count`.",
          initialCode: `import pandas as pd

# Scenario: Store Transactions Log
data = {
    'TransactionID': ['TX101', 'TX102', 'TX103', 'TX104', 'TX105', 'TX106', 'TX107'],
    'Revenue': [120.50, 250.00, 80.20, 410.00, 190.15, 95.00, 300.00],
    'Region': ['East', 'West', 'North', 'West', 'East', 'South', 'North']
}
sales_df = pd.DataFrame(data)

# Extract the row count (first item in the shape tuple)
row_count = 

print("Audit Log: Total Transactions Loaded:", row_count)
`,
          solution: "sales_df.shape[0]",
          testCode: "assert row_count == 7, 'Row count is incorrect. It should retrieve the first element of shape (7).'"
        }
      },
      {
        id: "pandas-cleaning",
        title: "Data Cleaning with Pandas",
        content: `
<h2>Data Cleaning & Manipulation</h2>
<p>Raw data is rarely perfect. It often contains missing fields, duplicates, or wrong formats. Data cleaning is the process of detecting and correcting corrupt or inaccurate records.</p>

<h3>Handling Missing Values</h3>
<p>Pandas represents missing data as <code>NaN</code> (Not a Number). Common operations include:</p>
<ul>
  <li><code>df.isnull().sum()</code>: Count the number of missing cells in each column.</li>
  <li><code>df.dropna()</code>: Remove rows containing any missing value.</li>
  <li><code>df.fillna(value)</code>: Replace missing cells with a constant, mean, or median.</li>
</ul>
<pre><code># Replace null ages with the average age
df['Age'] = df['Age'].fillna(df['Age'].mean())
</code></pre>

<h3>Altering Columns</h3>
<pre><code># Rename columns
df = df.rename(columns={'old_name': 'new_name'})

# Drop unwanted columns
df = df.drop(columns=['UnnecessaryColumn'])
</code></pre>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://www.kaggle.com/learn/data-cleaning" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Interactive Site</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Kaggle Data Cleaning Course</div>
    <div class="resource-desc">Interactive notebook tutorials explaining how to parse dates, scale values, and handle nulls.</div>
    <div class="resource-footer">
      <span>Open Course</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=bDhvCp3_lYw" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Guide</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Data Cleaning in Pandas (Alex Analyst)</div>
    <div class="resource-desc">A detailed project-based video explaining string stripping, telephone formats, and dropping rows.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://vita.had.co.nz/papers/tidy-data.pdf" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge pdf">Academic PDF</span>
      <i data-lucide="download" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Tidy Data Paper by Hadley Wickham</div>
    <div class="resource-desc">The famous foundational paper outlining clean dataset structure standards.</div>
    <div class="resource-footer">
      <span>Open Paper</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "Which Pandas method removes all rows that contain at least one missing (NaN) value?",
          options: [
            "df.isnull()",
            "df.dropna()",
            "df.fillna()",
            "df.clean()"
          ],
          correctIdx: 1,
          explanation: "`df.dropna()` deletes rows containing any null values. You can also specify `axis=1` to drop entire columns."
        },
        exercise: {
          type: "python",
          prompt: "<b>Real-World Scenario: Customer Account Profile Cleaning</b><br>You are importing a customer sign-up list, but some profiles have missing scores. Clean this dataset by filling all `NaN` entries in the 'Score' column with the average column score, ensuring your visualizations won't break on null values.",
          initialCode: `import pandas as pd
import numpy as np

# Scenario: Customer Satisfaction Survey list
data = {
    'CustomerName': ['Alice', 'Bob', 'Charlie', 'Diana', 'Evan'],
    'Score': [85.0, np.nan, 90.0, np.nan, 75.0]
}
df = pd.DataFrame(data)

# 1. Calculate the mean score of the columns
mean_val = df['Score'].mean()

# 2. Fill the missing values (NaN) with mean_val
df['Score'] = 

print("--- Cleaned Customer DataFrame ---")
print(df)
`,
          solution: "df['Score'].fillna(mean_val)",
          testCode: "assert df['Score'].isnull().sum() == 0, 'There should be no missing values remaining in the Score column!';"
        }
      }
    ]
  },
  {
    id: "sql-queries",
    title: "SQL Databases & Operations",
    description: "Learn how to query tabular databases using Structured Query Language (SQL) statements.",
    lessons: [
      {
        id: "sql-select",
        title: "SQL SELECT and Filtering",
        content: `
<h2>SQL SELECT and Filtering</h2>
<p>SQL is the interface used to retrieve data stored in Relational Database Management Systems (RDBMS) like SQLite, MySQL, and PostgreSQL.</p>

<h3>SQL Syntax Structure</h3>
<p>A query begins with <code>SELECT</code>, followed by column names, followed by <code>FROM</code>, and optionally filtered by a <code>WHERE</code> condition:</p>
<pre><code>SELECT name, price 
FROM products 
WHERE category = 'Electronics' AND price > 100;
</code></pre>

<h3>SQL Comparisons</h3>
<ul>
  <li><code>=</code>, <code>&lt;&gt;</code> (Not Equal), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></li>
  <li><code>LIKE</code>: Pattern matching (e.g. <code>WHERE name LIKE 'Premium%'</code> matches text starting with 'Premium').</li>
  <li><code>IN</code>: Specify multiple values (e.g. <code>WHERE state IN ('CA', 'NY', 'TX')</code>).</li>
</ul>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://www.w3schools.com/sql/" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Documentation</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">W3Schools SQL Reference</div>
    <div class="resource-desc">A basic, easy-to-read reference guide for SQL command syntaxes and examples.</div>
    <div class="resource-footer">
      <span>Open Reference</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=HXTUgyrgpzo" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Guide</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">SQL Tutorial for Beginners (Mosh)</div>
    <div class="resource-desc">A highly popular 4-hour introduction covering database structures, selects, and filters.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://web.stanford.edu/class/cs145/cheatsheet.pdf" download class="resource-card">
    <div class="resource-header">
      <span class="resource-badge pdf">Download Sheet</span>
      <i data-lucide="download" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Stanford DB Class SQL Cheat Sheet</div>
    <div class="resource-desc">Academic cheat sheet containing summaries of filters, keys, and aggregate schemas.</div>
    <div class="resource-footer">
      <span>Download PDF</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "In SQL, how do you select all products whose name starts with the letter 'W'?",
          options: [
            "SELECT * FROM products WHERE name = 'W*'",
            "SELECT * FROM products WHERE name LIKE 'W%'",
            "SELECT * FROM products WHERE name IN ('W')",
            "SELECT * FROM products WHERE name LIKE '%W'"
          ],
          correctIdx: 1,
          explanation: "The `LIKE` operator combined with the wildcard character `%` matches any sequence of characters. `'W%'` matches anything starting with 'W'."
        },
        exercise: {
          type: "sql",
          prompt: "<b>Real-World Scenario: Inventory Alerts</b><br>You are developing a low-stock alert script for your store database. Write a SQL query that retrieves the name, category, and current stock of all items in the 'products' table where the 'stock' level is **less than 30** items.",
          initialCode: `-- Scenario: Retrieve low inventory records (stock < 30)
-- Schema: products (product_id, name, category, price, stock)
-- Write your query below
SELECT 
`,
          solution: "SELECT name, category, stock FROM products WHERE stock < 30",
          expectedTables: ["products"],
          testQuery: "SELECT name, category, stock FROM products WHERE stock < 30;"
        }
      },
      {
        id: "sql-aggregations",
        title: "SQL Aggregations & Grouping",
        content: `
<h2>SQL Aggregation & Grouping</h2>
<p>Aggregations let you collapse thousands of transaction rows into useful summaries like total revenue, average units sold, or transaction counts.</p>

<h3>Aggregating & Grouping Syntax</h3>
<p>Whenever you select both a regular column and an aggregated column, you must specify that column in the <code>GROUP BY</code> clause:</p>
<pre><code>SELECT category, SUM(stock) AS total_stock
FROM products
GROUP BY category;
</code></pre>

<h3>Filtering Groups with HAVING</h3>
<p>To filter groups based on aggregate results (e.g., only show categories with total stock greater than 50), use <code>HAVING</code> instead of <code>WHERE</code>:</p>
<pre><code>SELECT category, SUM(stock) AS total_stock
FROM products
GROUP BY category
HAVING total_stock > 50;
</code></pre>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://mode.com/sql-tutorial/" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Documentation</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Mode Analytics SQL Tutorials</div>
    <div class="resource-desc">Professional SQL courses focusing specifically on data analysis and business reporting.</div>
    <div class="resource-footer">
      <span>Open Tutorials</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=02j0uNCSNus" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Guide</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">SQL GROUP BY Visual Explainer</div>
    <div class="resource-desc">A clear visual animation video detailing row aggregation and category grouping.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "Which SQL clause is used to filter rows AFTER they have been grouped by an aggregate query?",
          options: [
            "WHERE",
            "FILTER",
            "HAVING",
            "ORDER BY"
          ],
          correctIdx: 2,
          explanation: "`HAVING` is evaluated after groupings are established. `WHERE` is evaluated before rows are grouped."
        },
        exercise: {
          type: "sql",
          prompt: "<b>Real-World Scenario: Category Pricing Report</b><br>You are compiling an audit report for retail departments. Write a SQL query that calculates the **average price** of items in each product category. Group the rows by 'category' and name the average column alias as 'avg_price'.",
          initialCode: `-- Scenario: Average product costs grouped by category
-- Schema: products (product_id, name, category, price, stock)
-- Write your query below
SELECT 
`,
          solution: "SELECT category, AVG(price) AS avg_price FROM products GROUP BY category",
          expectedTables: ["products"],
          testQuery: "SELECT category, AVG(price) AS avg_price FROM products GROUP BY category;"
        }
      },
      {
        id: "sql-joins",
        title: "Relational Joins (JOIN)",
        content: `
<h2>Relational Joins</h2>
<p>Relational databases store data in separate normalized tables (e.g., customers in one table, orders in another). To answer business questions, we use **joins** to combine rows from multiple tables based on a related column.</p>

<h3>Types of Joins</h3>
<ul>
  <li><strong>INNER JOIN:</strong> Returns records that have matching values in both tables.</li>
  <li><strong>LEFT JOIN (or LEFT OUTER JOIN):</strong> Returns all records from the left table, and matched records from the right table. If no match, NULL values are returned for the right table columns.</li>
</ul>

<p>Here is an example joining orders and customers:</p>
<pre><code>SELECT o.order_id, c.first_name, o.order_date
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id;
</code></pre>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://sql-joins.org/" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Interactive Site</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">SQL Joins Venn Diagram Visualizer</div>
    <div class="resource-desc">Interactive diagrams showing Venn logic matching INNER, LEFT, RIGHT, and FULL joins.</div>
    <div class="resource-footer">
      <span>Open Site</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=9yeEl15Xe1g" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Guide</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">SQL Joins Tutorial (Alex Analyst)</div>
    <div class="resource-desc">A deep dive video covering syntax models and operations for join schemas.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "If table A has 10 rows and table B has 0 rows, how many rows will a LEFT JOIN from A to B return?",
          options: [
            "0 rows",
            "10 rows",
            "An error is thrown",
            "5 rows"
          ],
          correctIdx: 1,
          explanation: "A LEFT JOIN returns ALL rows from the left table (A), regardless of whether there are matches in the right table (B). The missing values from B will just appear as NULL."
        },
        exercise: {
          type: "sql",
          prompt: "<b>Real-World Scenario: Customer Purchase History Report</b><br>You are compiling product orders to check user shipping manifests. Write a SQL query that performs an `INNER JOIN` linking the 'orders' table with the 'products' table. Retrieve the order_id, product name (labeled as 'name' in products), and purchase quantity.",
          initialCode: `-- Scenario: Linking orders to product catalog names
-- Tables: orders (order_id, customer_id, product_id, quantity, order_date)
--         products (product_id, name, category, price, stock)
-- Write your query below
SELECT 
`,
          solution: "SELECT o.order_id, p.name, o.quantity FROM orders o INNER JOIN products p ON o.product_id = p.product_id",
          expectedTables: ["orders", "products"],
          testQuery: "SELECT o.order_id, p.name, o.quantity FROM orders o INNER JOIN products p ON o.product_id = p.product_id;"
        }
      }
    ]
  },
  {
    id: "eda-ml",
    title: "Exploratory Analysis & ML Basics",
    description: "Learn how to conduct Exploratory Data Analysis (EDA) and understand core Machine Learning concepts.",
    lessons: [
      {
        id: "eda-process",
        title: "Exploratory Data Analysis (EDA)",
        content: `
<h2>Exploratory Data Analysis (EDA)</h2>
<p>Before coding models, we inspect datasets to understand their internal characteristics, detect anomalies, check assumptions, and uncover relationships. This process is called <strong>Exploratory Data Analysis (EDA)</strong>.</p>

<h3>Common Steps in EDA</h3>
<ol>
  <li><strong>Check dimensions:</strong> How many rows and columns exist? (<code>df.shape</code>).</li>
  <li><strong>Inspect data types:</strong> Are numeric variables formatted as text? (<code>df.info()</code>).</li>
  <li><strong>Check missing values:</strong> Locate missing fields (<code>df.isnull().sum()</code>).</li>
  <li><strong>Analyze distribution:</strong> Look at means, standard deviations, and ranges (<code>df.describe()</code>).</li>
  <li><strong>Correlation Matrix:</strong> Analyze how variables move together (<code>df.corr()</code>).</li>
</ol>

<h3>Understanding Correlation</h3>
<p>Correlation measures the linear relationship between variables, ranging from <strong>-1 to +1</strong>:</p>
<ul>
  <li><code>+1</code>: Perfect positive relationship (both variables increase together).</li>
  <li><code>0</code>: No linear relationship.</li>
  <li><code>-1</code>: Perfect negative relationship (one increases, the other decreases).</li>
</ul>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://www.kaggle.com/code/spscientist/students-performance-in-exams-eda-visualization" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Sample Notebook</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Kaggle Student Grades EDA</div>
    <div class="resource-desc">A highly rated public notebook demonstrating step-by-step EDA and correlation visual mapping.</div>
    <div class="resource-footer">
      <span>Open Notebook</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=H5H4z48u7f8" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Guide</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">EDA Python Course (Beginners)</div>
    <div class="resource-desc">Video tutorial walking through dataset dimensions, correlation matrices, and seaborn plots.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "What does a correlation coefficient of -0.85 between Study Hours and Exam Failure Rate indicate?",
          options: [
            "A weak positive relationship",
            "A strong negative relationship",
            "No linear relationship",
            "An invalid calculation"
          ],
          correctIdx: 1,
          explanation: "-0.85 represents a value very close to -1, which indicates a strong negative linear relationship (as study hours increase, failure rate drops significantly)."
        },
        exercise: {
          type: "python",
          prompt: "<b>Real-World Scenario: Marketing Campaign ROI Analysis</b><br>You are evaluating marketing channel channels. Calculate the correlation matrix for the DataFrame `data_df` to identify the correlation between 'TV_Ads' budgets and resulting 'Total_Sales' revenue. Store it in a variable named `corr_matrix`.",
          initialCode: `import pandas as pd

# Scenario: Store Campaign Budget ($k) vs Unit Sales
data = {
    'TV_Ads': [100, 200, 300, 400],
    'Radio_Ads': [20, 40, 50, 60],
    'Total_Sales': [15, 25, 28, 35]
}
data_df = pd.DataFrame(data)

# Compute the correlation matrix using .corr()
corr_matrix = 

print("--- Correlation Matrix Results ---")
print(corr_matrix)
`,
          solution: "data_df.corr()",
          testCode: "assert corr_matrix.shape == (3, 3), 'Correlation matrix should be a 3x3 DataFrame.';"
        }
      },
      {
        id: "ml-intro",
        title: "Introduction to Machine Learning",
        content: `
<h2>Introduction to Machine Learning</h2>
<p>Machine Learning (ML) is the subfield of Artificial Intelligence (AI) that gives computers the ability to learn without being explicitly programmed. It focuses on building algorithms that analyze historical patterns to make predictions on new data.</p>

<h3>Supervised vs. Unsupervised Learning</h3>
<ul>
  <li><strong>Supervised Learning:</strong> The algorithm is trained on <strong>labeled data</strong> (inputs paired with known correct outputs).
    <ul>
      <li><strong>Regression:</strong> Predicting a continuous numeric value (e.g. predicting a house price).</li>
      <li><strong>Classification:</strong> Predicting a discrete class label (e.g. predicting if an email is spam or not).</li>
    </ul>
  </li>
  <li><strong>Unsupervised Learning:</strong> The algorithm works on <strong>unlabeled data</strong>, searching for hidden groupings or structures.
    <ul>
      <li><strong>Clustering:</strong> Grouping similar rows together (e.g., segmenting customers based on purchase behaviors).</li>
    </ul>
  </li>
</ul>

<h3>Overfitting vs. Underfitting</h3>
<ul>
  <li><strong>Overfitting:</strong> The model learns the training noise too well and performs poorly on unseen test data.</li>
  <li><strong>Underfitting:</strong> The model is too simple to capture the underlying pattern.</li>
</ul>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://scikit-learn.org/stable/getting_started.html" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Documentation</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Scikit-Learn Getting Started</div>
    <div class="resource-desc">Official starter tutorials for Python's primary machine learning library.</div>
    <div class="resource-footer">
      <span>Read Docs</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=GwIo3gToTSM" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Guide</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Machine Learning Course (Beginners)</div>
    <div class="resource-desc">Visual course covering decision trees, regression math models, and model testing splits.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.statlearning.com/" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge pdf">Free Textbook</span>
      <i data-lucide="download" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Introduction to Statistical Learning (ISLR)</div>
    <div class="resource-desc">The gold-standard academic textbook on ML, available as a free legal PDF download.</div>
    <div class="resource-footer">
      <span>Download PDF</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "Predicting whether a medical patient has a disease (Yes/No) based on their blood test results is an example of what type of machine learning task?",
          options: [
            "Regression (Supervised)",
            "Classification (Supervised)",
            "Clustering (Unsupervised)",
            "Dimensionality Reduction"
          ],
          correctIdx: 1,
          explanation: "Since the outcome is a discrete categorical category (Yes/No) and is based on historical labeled entries, it falls under Supervised Classification."
        },
        exercise: {
          type: "python",
          prompt: "<b>Real-World Scenario: E-Commerce Spam Filtering</b><br>You are building a custom classifier to flag spam reviews based on a keyword trigger index score. Complete the function `predict(score)`. If `score >= 0.5`, classify it as spam (return 1), otherwise classify it as safe (return 0).",
          initialCode: `def predict(score):
    # Scenario: Spam classifier threshold (spam if >= 0.5)
    if 
        return 1
    else:
        return 0

# Test predictions
r1 = predict(0.85)
r2 = predict(0.12)
print(f"Review Classifier Results (Spam Tag): {r1}, {r2}")
`,
          solution: "score >= 0.5:",
          testCode: "assert predict(0.5) == 1 and predict(0.49) == 0, 'Prediction function threshold checks are incorrect!'"
        }
      }
    ]
  },
  {
    id: "bi-tools",
    title: "Business Intelligence Tools",
    description: "Learn how to build interactive reports and business dashboards using Microsoft Power BI and Tableau.",
    lessons: [
      {
        id: "powerbi-intro",
        title: "Power BI Essentials",
        content: `
<h2>Power BI Essentials</h2>
<p>Microsoft Power BI is a leading Business Intelligence platform that connects to hundreds of data sources, shapes data using Power Query, and builds interactive dashboards.</p>

<h3>Power BI Core Architecture</h3>
<ol>
  <li><strong>Power BI Desktop:</strong> A free Windows application used to ingest, clean, model, and visualize data.</li>
  <li><strong>Power BI Service:</strong> A cloud-based platform to share reports, configure workspaces, and set automatic data refreshes.</li>
  <li><strong>Power BI Mobile:</strong> Secure apps to view dashboards on iOS/Android devices.</li>
</ol>

<h3>Data Modeling & DAX</h3>
<p>To write formulas and perform calculations on tables in Power BI, we use <strong>DAX (Data Analysis Expressions)</strong>. DAX operates on tables and columns rather than individual cell addresses (unlike Excel formulas):</p>
<pre><code>-- Example DAX Measure for Total Sales
Total Sales = SUM(Sales[SalesAmount])

-- Example DAX for Year-over-Year Sales
YoY Sales Growth = DIVIDE([Total Sales] - CALCULATE([Total Sales], DATEADD('Calendar'[Date], -1, YEAR)), CALCULATE([Total Sales], DATEADD('Calendar'[Date], -1, YEAR)))
</code></pre>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://learn.microsoft.com/en-us/power-bi/" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Documentation</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Microsoft Power BI Learning Path</div>
    <div class="resource-desc">Official step-by-step training paths covering data modeling, transformations, and report publishing.</div>
    <div class="resource-footer">
      <span>Open Guides</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=TmhQCQr_DCA" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Tutorial</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Power BI Full Course (Beginners)</div>
    <div class="resource-desc">A comprehensive video course by freeCodeCamp explaining imports, data views, and DAX calculations.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://query.prod.outlook.com/active-downloads/sample-financial-data.xlsx" download class="resource-card">
    <div class="resource-header">
      <span class="resource-badge pdf">Download Asset</span>
      <i data-lucide="download" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Power BI Financial Excel Dataset</div>
    <div class="resource-desc">Official sample database sheet provided by Microsoft for building your first trial report dashboard.</div>
    <div class="resource-footer">
      <span>Download File</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "What language is used in Power BI Desktop to build calculated columns and measures?",
          options: [
            "SQL",
            "DAX (Data Analysis Expressions)",
            "Python",
            "M Language"
          ],
          correctIdx: 1,
          explanation: "DAX is the formula language used for modeling and computations. M is the query formula language used inside Power Query to transform/clean data before it loads."
        },
        exercise: {
          type: "python",
          prompt: "<b>Real-World Scenario: BI Dashboard Data Feed Generation</b><br>You are generating a dataset to practice data import configurations. Use Python to generate a mock dataset of 100 orders containing 'OrderDate', 'SalesAmount', and 'Region', then write it to a CSV named 'mock_bi_data.csv' so you can import it into Power BI Desktop.",
          initialCode: `import pandas as pd
import numpy as np

# Scenario: Generating mock sales dataset for Power BI ingestion
np.random.seed(42)
dates = pd.date_range(start="2026-01-01", periods=100, freq="D")
sales = np.random.randint(100, 1500, size=100)
regions = np.random.choice(["North", "South", "East", "West"], size=100)

df = pd.DataFrame({
    "OrderDate": dates,
    "SalesAmount": sales,
    "Region": regions
})

# Save the DataFrame to 'mock_bi_data.csv' (exclude index)
`,
          solution: "df.to_csv('mock_bi_data.csv', index=False)",
          testCode: "import os; assert os.path.exists('mock_bi_data.csv'), 'Make sure mock_bi_data.csv is written to the filesystem!';"
        }
      },
      {
        id: "tableau-intro",
        title: "Tableau Essentials",
        content: `
<h2>Tableau Essentials</h2>
<p>Tableau is a popular visualization platform in enterprise environments. It specializes in rapid drag-and-drop report building and can display millions of rows with smooth interactive performance.</p>

<h3>Dimensions vs. Measures</h3>
<p>Tableau automatically structures columns into two classes when importing:</p>
<ul>
  <li><strong>Dimensions (Blue fields):</strong> Qualitative or categorical values (e.g., Customer Names, Product Categories, Dates). They slice and segment your views.</li>
  <li><strong>Measures (Green fields):</strong> Quantitative or numerical values (e.g., Sales, Profit, Temperature). They represent aggregations and heights.</li>
</ul>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://public.tableau.com/en-us/s/resources" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Guides Portal</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Tableau Public Resources Portal</div>
    <div class="resource-desc">Collection of free visual training lessons, community galleries, and downloadable sheets.</div>
    <div class="resource-footer">
      <span>Open Guides</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=aHaOIvR00So" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Tutorial</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Tableau Full Course (6 Hours)</div>
    <div class="resource-desc">Step-by-step video training playlist covering charts, calculated fields, dashboard layouts, and map analytics.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://public.tableau.com/app/resources/sample-data" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge pdf">Sample Datasets</span>
      <i data-lucide="download" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Tableau Sample Databases</div>
    <div class="resource-desc">Direct links to global datasets (Superstore sales, Airbnb bookings, flight delays) provided by Tableau.</div>
    <div class="resource-footer">
      <span>Access Datasets</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "In Tableau, how are discrete categorical columns represented in the data schema pane?",
          options: [
            "Green measures",
            "Blue dimensions",
            "Red variables",
            "Yellow lists"
          ],
          correctIdx: 1,
          explanation: "Blue fields represent discrete categories/dimensions (slicing variables). Green fields represent continuous numbers/measures (aggregated values)."
        },
        exercise: {
          type: "python",
          prompt: "<b>Real-World Scenario: Catalog Mapping Analysis</b><br>You are prepping a product stock index to visualize in Tableau. Write a script that checks the data types of the `products_df` using the `.dtypes` attribute so you can predict which columns Tableau will classify as Dimensions (Blue) and which as Measures (Green).",
          initialCode: `import pandas as pd

# Scenario: Store inventory log
products_data = {
    'ProductID': ['P_101', 'P_102', 'P_103'],
    'Name': ['Premium Laptop', 'Wireless Mouse', 'Mechanical Keyboard'],
    'UnitsInStock': [40, 120, 45],
    'UnitPrice': [1299.99, 25.50, 89.99]
}
products_df = pd.DataFrame(products_data)

# Extract and print products_df.dtypes
types_info = 

print("Schema Datatypes:")
print(types_info)
`,
          solution: "products_df.dtypes",
          testCode: "assert types_info is not None, 'types_info should hold the output of products_df.dtypes.';"
        }
      }
    ]
  },
  {
    id: "adv-sql-ai",
    title: "Advanced SQL & SQL with AI",
    description: "Learn advanced SQL constructs (Window functions, CTEs) and how to write database queries using Artificial Intelligence.",
    lessons: [
      {
        id: "adv-sql-window",
        title: "CTEs & Window Functions",
        content: `
<h2>Advanced SQL Structures</h2>
<p>To solve complex data analysis challenges (such as running totals, moving averages, or finding rankings), standard GROUP BY clauses are insufficient. We use **Common Table Expressions (CTEs)** and **Window Functions**.</p>

<h3>Common Table Expressions (CTEs)</h3>
<p>A CTE behaves like a temporary view query that exists only for the duration of the execution. We define it using the <code>WITH</code> keyword:</p>
<pre><code>WITH category_sales AS (
    SELECT category, SUM(price * stock) AS value
    FROM products
    GROUP BY category
)
SELECT * 
FROM category_sales 
WHERE value > 1000;
</code></pre>

<h3>SQL Window Functions</h3>
<p>Window functions perform calculations across a set of table rows that are related to the current row, without collapsing them. They use the <code>OVER()</code> clause:</p>
<pre><code>-- Calculate cumulative sum of product stock ordered by price
SELECT name, price, stock,
       SUM(stock) OVER (ORDER BY price) AS cumulative_stock
FROM products;
</code></pre>
<p>Common window functions include: <code>ROW_NUMBER()</code>, <code>RANK()</code>, <code>LEAD()</code>, and <code>LAG()</code>.</p>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://sqlbolt.com/" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">Interactive Tutorial</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">SQLBolt Interactive Practice</div>
    <div class="resource-desc">Full online portal to run interactive query practices directly against SQLite structures.</div>
    <div class="resource-footer">
      <span>Open SQLBolt</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://learnsql.com/blog/sql-window-functions-cheat-sheet/" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge pdf">Download Sheet</span>
      <i data-lucide="download" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Window Functions Cheat Sheet</div>
    <div class="resource-desc">A printable, color-coded PDF quick reference detailing partitions, offsets, and row index functions.</div>
    <div class="resource-footer">
      <span>Get Cheat Sheet</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "Which window function assigns a unique sequential integer to each row within a partition, starting at 1?",
          options: [
            "RANK()",
            "DENSE_RANK()",
            "ROW_NUMBER()",
            "LEAD()"
          ],
          correctIdx: 2,
          explanation: "`ROW_NUMBER()` assigns sequential integer numbers starting at 1. `RANK()` also assigns numbers but leaves gaps if there are duplicate ties."
        },
        exercise: {
          type: "sql",
          prompt: "<b>Real-World Scenario: Segmenting High-Volume Warehouses</b><br>You are compiling an inventory stock alert report using CTEs. Write a SQL query utilizing a CTE named 'high_stock_products' that filters products having 'stock' greater than 40. Then, select the 'name' and 'stock' fields from this temporary CTE view.",
          initialCode: `-- Scenario: Querying inventory levels using a CTE
-- Schema: products (product_id, name, category, price, stock)
-- Write your CTE below
WITH high_stock_products AS (

)
SELECT 
`,
          solution: "WITH high_stock_products AS (SELECT name, stock FROM products WHERE stock > 40) SELECT name, stock FROM high_stock_products",
          expectedTables: ["products"],
          testQuery: "WITH high_stock_products AS (SELECT name, stock FROM products WHERE stock > 40) SELECT name, stock FROM high_stock_products;"
        }
      },
      {
        id: "sql-with-ai",
        title: "SQL Generation & Analysis with AI",
        content: `
<h2>SQL with AI & Large Language Models</h2>
<p>Modern data workflows utilize Artificial Intelligence assistants (like ChatGPT, Gemini, or GitHub Copilot) to generate queries from natural language, optimize complex queries, and explain legacy code schemas.</p>

<h3>Writing Effective AI Prompts for SQL</h3>
<p>To get accurate SQL queries from an LLM, follow the **CO-STAR** prompting framework:</p>
<ol>
  <li><strong>Context:</strong> Explain your database engine (e.g., PostgreSQL, BigQuery).</li>
  <li><strong>Objective:</strong> State what you want to extract.</li>
  <li><strong>Schema details:</strong> Provide column names and data types (this is crucial!).</li>
  <li><strong>Constraints:</strong> Specify details like handling nulls or date format rules.</li>
</ol>
<pre><code>-- Example Prompt:
"Act as a PostgreSQL DBA. Write a query that computes the monthly retention rate.
Here is the schema: transactions (id INT, user_id INT, created_at TIMESTAMP).
Exclude mock test users where email contains 'test.com'."
</code></pre>

<h3>Semantic & Vector Search in SQL</h3>
<p>Modern databases (like PostgreSQL with <code>pgvector</code>) allow storing high-dimensional text embeddings in columns. You can then query records based on <strong>semantic meaning</strong> (similarity) rather than keyword matches using standard SQL operators:</p>
<pre><code>-- Querying top 5 products closest to 'ergonomic office tool' using cosine distance
SELECT name, description, 
       1 - (embedding <=> '[0.12, -0.08, 0.44, ...]') AS similarity
FROM items
ORDER BY similarity DESC
LIMIT 5;
</code></pre>

<h3>Recommended Resources & Study Guides</h3>
<div class="resource-grid">
  <a href="https://github.com/vanna-ai/vanna" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge link">AI Library</span>
      <i data-lucide="external-link" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Vanna.ai Python Library</div>
    <div class="resource-desc">Open-source AI-driven SQL agent framework that lets you query your database using natural language.</div>
    <div class="resource-footer">
      <span>View Repository</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>

  <a href="https://www.youtube.com/watch?v=z0A8p9ZgEgo" target="_blank" class="resource-card">
    <div class="resource-header">
      <span class="resource-badge video">Video Guide</span>
      <i data-lucide="play-circle" style="width:14px;height:14px;color:var(--text-muted);"></i>
    </div>
    <div class="resource-title">Vector Databases & SQL Integration</div>
    <div class="resource-desc">Video tutorial explaining how embeddings are stored and queried in SQL databases using pgvector.</div>
    <div class="resource-footer">
      <span>Watch Video</span> <i data-lucide="chevron-right" style="width:12px;height:12px;"></i>
    </div>
  </a>
</div>
        `,
        quiz: {
          question: "What operator does pgvector use in PostgreSQL to compute Cosine Distance between two vector embeddings?",
          options: [
            "<-> (L2 Distance)",
            "<=> (Cosine Distance)",
            "<#> (Negative Inner Product)",
            "~= (Exact Match)"
          ],
          correctIdx: 1,
          explanation: "In pgvector, `<=>` computes Cosine Distance (often used as `1 - (<=>)` to compute Cosine Similarity). `<->` computes Euclidean (L2) distance, and `<#>` computes negative inner product."
        },
        exercise: {
          type: "python",
          prompt: "<b>Real-World Scenario: AI SQL Assistant Classifier</b><br>You are building a micro-service that translates natural language queries into SQL. Write a Python script that takes a user query `nl_query` and checks if it requests financial data (contains the word 'sales' or 'revenue'). If true, output 'SELECT SUM(Revenue) FROM sales;', otherwise output 'SELECT * FROM products;'.",
          initialCode: `# Scenario: Text-to-SQL Routing Engine
def translate_ai(nl_query):
    query_lower = nl_query.lower()
    
    # Check if 'sales' or 'revenue' is in the query text
    if 
        return "SELECT SUM(Revenue) FROM sales;"
    else:
        return "SELECT * FROM products;"

# Run compiler test
sql_query = translate_ai("Retrieve total gross revenue numbers")
print("AI Compiler Output SQL:", sql_query)
`,
          solution: "'sales' in query_lower or 'revenue' in query_lower:",
          testCode: "assert translate_ai('Give me revenue') == 'SELECT SUM(Revenue) FROM sales;', 'Translate classifier did not map revenue query correctly!';"
        }
      }
    ]
  }
];

export const sampleSqlDbData = {
  products: [
    { product_id: 1, name: "Premium Laptop", category: "Electronics", price: 1299.99, stock: 15 },
    { product_id: 2, name: "Wireless Mouse", category: "Electronics", price: 25.50, stock: 120 },
    { product_id: 3, name: "Mechanical Keyboard", category: "Electronics", price: 89.99, stock: 45 },
    { product_id: 4, name: "Ergonomic Office Chair", category: "Furniture", price: 249.00, stock: 10 },
    { product_id: 5, name: "Glass Water Bottle", category: "Home & Kitchen", price: 15.99, stock: 80 },
    { product_id: 6, name: "LED Desk Lamp", category: "Furniture", price: 34.50, stock: 30 },
    { product_id: 7, name: "4K Monitor", category: "Electronics", price: 349.99, stock: 20 },
    { product_id: 8, name: "Bluetooth Speaker", category: "Electronics", price: 59.99, stock: 65 }
  ],
  customers: [
    { customer_id: 101, first_name: "Alice", last_name: "Smith", email: "alice@example.com", state: "CA" },
    { customer_id: 102, first_name: "Bob", last_name: "Johnson", email: "bob@example.com", state: "NY" },
    { customer_id: 103, first_name: "Charlie", last_name: "Brown", email: "charlie@example.com", state: "TX" },
    { customer_id: 104, first_name: "Diana", last_name: "Prince", email: "diana@example.com", state: "CA" },
    { customer_id: 105, first_name: "Evan", last_name: "Wright", email: "evan@example.com", state: "WA" }
  ],
  orders: [
    { order_id: 5001, customer_id: 101, product_id: 1, quantity: 1, order_date: "2026-05-10" },
    { order_id: 5002, customer_id: 102, product_id: 2, quantity: 2, order_date: "2026-05-11" },
    { order_id: 5003, customer_id: 101, product_id: 3, quantity: 1, order_date: "2026-05-12" },
    { order_id: 5004, customer_id: 103, product_id: 4, quantity: 1, order_date: "2026-05-12" },
    { order_id: 5005, customer_id: 104, product_id: 5, quantity: 3, order_date: "2026-05-14" },
    { order_id: 5006, customer_id: 105, product_id: 7, quantity: 1, order_date: "2026-05-15" }
  ]
};
