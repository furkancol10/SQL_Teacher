// ── SQL Mastery — Interactive Script ─────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── Sidebar Navigation ──────────────────────────────────
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const toggle  = document.getElementById('mobileToggle');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.lesson-section');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }

  toggle.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  overlay.addEventListener('click', closeSidebar);

  // Close sidebar on nav click (mobile)
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // ── Active Section Tracking ─────────────────────────────
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200) {
        current = section.id;
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-section') === current) {
        item.classList.add('active');
      }
    });

    // Mark as completed when scrolled past
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < window.innerHeight * 0.5) {
        markCompleted(section.id);
      }
    });
  }

  // ── Progress Tracking ───────────────────────────────────
  const completedSections = new Set(
    JSON.parse(localStorage.getItem('sql-mastery-progress') || '[]')
  );

  const progressBar  = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const totalSections = sections.length;

  function markCompleted(sectionId) {
    if (!sectionId || completedSections.has(sectionId)) return;
    completedSections.add(sectionId);
    localStorage.setItem('sql-mastery-progress', JSON.stringify([...completedSections]));
    updateProgressUI();
  }

  function updateProgressUI() {
    const count = completedSections.size;
    const pct = Math.round((count / totalSections) * 100);
    progressBar.style.width = pct + '%';
    progressText.textContent = `${count} / ${totalSections}`;

    navItems.forEach(item => {
      const section = item.getAttribute('data-section');
      if (completedSections.has(section)) {
        item.classList.add('completed');
      }
    });
  }

  updateProgressUI();

  // ── Scroll-Reveal Animations ────────────────────────────
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ── Scroll to Top Button ────────────────────────────────
  const scrollTopBtn = document.getElementById('scrollTop');
  const mainContent  = document.querySelector('.main-content');

  function handleScroll() {
    updateActiveNav();

    if (window.scrollY > 600) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── SQL Syntax Highlighting ─────────────────────────────
  const SQL_KEYWORDS = [
    'SELECT','FROM','WHERE','INSERT','INTO','UPDATE','SET','DELETE',
    'CREATE','TABLE','ALTER','DROP','VIEW','INDEX','PROCEDURE',
    'INNER','LEFT','RIGHT','FULL','OUTER','CROSS','JOIN','ON',
    'AND','OR','NOT','IN','BETWEEN','LIKE','IS','NULL','AS',
    'ORDER','BY','GROUP','HAVING','UNION','ALL','INTERSECT','EXCEPT',
    'DISTINCT','TOP','PERCENT','ASC','DESC','CASE','WHEN','THEN',
    'ELSE','END','EXISTS','PRIMARY','KEY','FOREIGN','REFERENCES',
    'CONSTRAINT','DEFAULT','VALUES','IF','GO','EXEC','EXECUTE',
    'DECLARE','BEGIN','RETURN','WHILE','PRINT','USE','WITH',
    'OVER','PARTITION','RECURSIVE','CASCADE','RESTRICT'
  ];

  const SQL_FUNCTIONS = [
    'COUNT','SUM','AVG','MAX','MIN','CAST','CONVERT','ISNULL',
    'COALESCE','NULLIF','ROW_NUMBER','RANK','DENSE_RANK','NTILE',
    'TRIM','LTRIM','RTRIM','UPPER','LOWER','REPLACE','SUBSTRING',
    'CHARINDEX','LEN','PARSENAME','MONTH','YEAR','DAY','GETDATE',
    'DATEADD','DATEDIFF','FORMAT','CONCAT','LEFT','RIGHT',
    'STUFF','STRING_AGG','ABS','CEILING','FLOOR','ROUND','POWER'
  ];

  const SQL_TYPES = [
    'int','tinyint','smallint','bigint','varchar','nvarchar','char',
    'nchar','text','ntext','date','datetime','datetime2','smalldatetime',
    'time','float','decimal','numeric','money','smallmoney','bit',
    'uniqueidentifier','xml','varbinary','binary','image','NOT','NULL'
  ];

  function highlightSQL(text) {
    // Escape HTML
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Comments (-- line comments)
    text = text.replace(/(--[^\n]*)/g, '<span class="syn-cm">$1</span>');

    // Strings (single-quoted)
    text = text.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="syn-str">$1</span>');

    // Numbers
    text = text.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="syn-num">$1</span>');

    // Functions (before keywords so they take priority)
    const fnPattern = new RegExp('\\b(' + SQL_FUNCTIONS.join('|') + ')\\b(?=\\s*\\()', 'gi');
    text = text.replace(fnPattern, (m) => '<span class="syn-fn">' + m.toUpperCase() + '</span>');

    // Keywords
    const kwPattern = new RegExp('\\b(' + SQL_KEYWORDS.join('|') + ')\\b', 'gi');
    text = text.replace(kwPattern, (match) => {
      // Don't highlight inside comments or strings
      return '<span class="syn-kw">' + match.toUpperCase() + '</span>';
    });

    // Operators
    text = text.replace(/([=&lt;&gt;!]+|&lt;&gt;)/g, '<span class="syn-op">$1</span>');

    // @ parameters
    text = text.replace(/(@\w+)/g, '<span class="syn-fn">$1</span>');

    // # temp tables
    text = text.replace(/(#\w+)/g, '<span class="syn-tbl">$1</span>');

    return text;
  }

  // Apply syntax highlighting to all code blocks
  document.querySelectorAll('.code-content pre').forEach(pre => {
    const raw = pre.textContent;
    pre.setAttribute('data-raw', raw);
    pre.innerHTML = highlightSQL(raw);
  });

  // ── Initial scroll check ────────────────────────────────
  handleScroll();
});

// ── Copy Code Function (global) ───────────────────────────
function copyCode(btn) {
  const codeBlock = btn.closest('.code-block');
  const pre = codeBlock.querySelector('pre');
  const text = pre.getAttribute('data-raw') || pre.textContent;

  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = '✅ Copied!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = '📋 Copy';
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    btn.classList.add('copied');
    btn.innerHTML = '✅ Copied!';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = '📋 Copy';
    }, 2000);
  });
}
