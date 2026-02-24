# 📚 Student Management System

A modern web-based application to manage student records efficiently.
The system allows users to add, edit, delete, search, and filter student information through a clean and responsive interface.


###✨ Features:

## 📝 Student Management

* ➕ Add new students with validation
* ✏️ Edit existing student details
* 🗑️ Delete students with confirmation
* 👁️ View all students in a card-based layout

## 🔍 Search & Filtering

* 🔎 Real-time search by student name
* 🎓 Filter by branch (CSE, EE, etc.)
* 📘 Filter by course (B.Tech, M.Tech, etc.)
* 📅 Filter by batch year
* ⚡ Multiple filters applied simultaneously

## 📊 Dashboard Statistics

* 📈 Total student count
* 🧮 Branch-wise statistics
* 🔄 Automatically updates when data changes

## 🎨 User Interface

* 📱 Fully responsive design
* 🧾 Card-based student display
* ✨ Smooth hover effects
* 🧩 Clean and intuitive layout


## 🚀 Technologies Used

* **HTML5** — Page structure and semantic elements
* **CSS3** — Styling, layout, Flexbox & Grid
* **JavaScript (ES6)** — Logic, DOM manipulation, interactivity


## 🧠 How It Works

The application stores student data in a JavaScript array of objects:

```js
{
  id: Number,
  name: String,
  email: String,
  mobile: String,
  branch: String,
  course: String,
  batch: String
}
```

## 🔑 Key Functions

* `renderStudents()` — Displays all student cards
* `saveStudent()` — Adds or updates student data
* `searchStudents()` — Filters by name
* `applyFilters()` — Applies multiple filters
* `updateStats()` — Updates dashboard counters


## ▶️ How to Run

1. Clone the repository

```bash
git clone https://github.com/RootSyntax-Dev/student-management-system.git
cd student-management-system
```

2. Open the project

* Double-click **index.html**
  OR
* Run using **Live Server** in VS Code


## 📁 Project Structure

```
student-management-system/
├── index.html      # Main HTML file
├── styles.css      # Styling
└── script.js       # JavaScript logic
```


## 🔮 Future Enhancements

* 🗄️ Backend database integration
* 🔐 Authentication system
* 📤 Export data (CSV / PDF)
* 📑 Pagination for large datasets
* 🎯 Advanced analytics dashboard


## 👨‍💻 Author

**RootSyntax-Dev**

##
⭐ If you found this project helpful, consider giving it a star!
