<div align="center">

# SQL Mastery

### An interactive, browser-based SQL learning platform — no installs, no backend, no dependencies.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

</div>

---

## What Is This?

**SQL Mastery** is a single-page web app that walks learners through 13 structured SQL lessons — from writing your first `CREATE TABLE` to building stored procedures and window functions. Everything runs in the browser. No server, no npm install, no sign-up.

---

## Features

- **13 progressive lessons** covering SQL from foundation to advanced
- **Interactive code blocks** with SQL syntax highlighting and one-click copy
- **Progress tracking** — marks lessons complete as you scroll, persists via `localStorage`
- **Visual schema diagrams** — sample tables with PK/FK relationships
- **Mobile-responsive** — collapsible sidebar with hamburger menu
- **Zero dependencies** — plain HTML, CSS, and vanilla JavaScript

---

## Lessons

| # | Topic | What You'll Learn |
|---|-------|-------------------|
| 1 | Creating Tables | `CREATE TABLE`, data types, constraints |
| 2 | Querying Basics | `SELECT`, `FROM`, column aliases |
| 3 | Filtering Data | `WHERE`, `AND`/`OR`, `IN`, `BETWEEN`, `LIKE` |
| 4 | Aggregate Functions | `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` |
| 5 | GROUP BY & HAVING | Grouping results, filtering aggregates |
| 6 | SQL Joins | `INNER`, `LEFT`, `RIGHT`, `FULL OUTER` joins |
| 7 | Unions & Set Operations | `UNION`, `INTERSECT`, `EXCEPT` |
| 8 | CASE Statements | Conditional logic inside queries |
| 9 | Subqueries | Nested queries, correlated subqueries |
| 10 | Window Functions | `ROW_NUMBER`, `RANK`, `LAG`, `LEAD`, partitioning |
| 11 | String Functions | `CONCAT`, `SUBSTRING`, `TRIM`, `REPLACE` |
| 12 | Views & CTEs | Reusable query structures |
| 13 | Stored Procedures | Parameterized, reusable SQL routines |

---

## Getting Started

No build step required. Just open the file:

```bash
# Clone the repo
git clone https://github.com/furkancol10/SQL_Teacher.git

# Open in your browser
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

Or just [download the ZIP](https://github.com/furkancol10/SQL_Teacher/archive/refs/heads/main.zip) and open `index.html`.

---

## Project Structure

```
SQL_Teacher/
├── index.html      # App structure + all lesson content
├── style.css       # Dark theme design system (CSS variables, responsive layout)
├── script.js       # Progress tracking, syntax highlighting, scroll behavior
└── SQL.pdf         # Companion reference guide
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — custom properties, Flexbox, Grid, Intersection Observer animations |
| Logic | Vanilla JavaScript — no frameworks |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts |
| Storage | `localStorage` for progress persistence |

---

## Contributing

Pull requests are welcome. To contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/new-lesson`)
3. Commit your changes
4. Open a pull request

---

<div align="center">

Made with care for SQL learners everywhere.

</div>
