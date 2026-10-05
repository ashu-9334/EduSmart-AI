# EduSmart AI

## Intelligent Student Management & Performance Analysis System

EduSmart AI is a computer-based student management and performance analysis system that combines **Web Technologies, Python Flask, Oracle Database, PL/SQL, and Artificial Intelligence/Machine Learning**.

The system allows users to enter student academic information, calculate performance, store records in an Oracle database, and generate AI-based performance predictions and recommendations.

---

## 🎯 Objectives

* Manage student academic records.
* Calculate student average marks and grades.
* Validate attendance and marks.
* Store student data securely in an Oracle database.
* Use PL/SQL functions, procedures, and triggers.
* Analyze student performance using AI/ML.
* Provide performance recommendations.

---

## ✨ Features

* Student performance input form
* Attendance and marks validation
* Automatic average calculation
* Automatic grade calculation
* Oracle database storage
* PL/SQL function
* PL/SQL procedures
* PL/SQL trigger
* AI-based performance prediction
* AI recommendation system
* Student records dashboard
* Overall performance statistics

---

## 🛠️ Technologies Used

| Technology      | Purpose                                |
| --------------- | -------------------------------------- |
| HTML5           | Frontend structure                     |
| CSS3            | User interface design                  |
| JavaScript      | Validation, calculations and API calls |
| Python          | Backend and AI integration             |
| Flask           | Web API / Backend                      |
| Oracle Database | Data storage                           |
| PL/SQL          | Database programming                   |
| Scikit-learn    | Machine Learning                       |
| Git & GitHub    | Version control                        |

---

## 🏗️ Project Structure

```text
EduSmart-AI
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   └── app.py
│
├── ai/
│   └── model.py
│
├── database/
│   └── student.sql
│
├── .gitignore
└── README.md
```

---

## 🔄 System Workflow

```text
Student Data
     ↓
HTML Form
     ↓
JavaScript Validation
     ↓
Python Flask Backend
     ↓
Oracle Database
     ↓
PL/SQL Processing
     ↓
AI/ML Prediction
     ↓
Performance Result
     ↓
AI Recommendation
```

---

## 🗄️ Database

The project uses **Oracle Database** to store student performance records.

### Main Table

`student_performance`

The table stores:

* Student ID
* Student Name
* Roll Number
* Attendance
* Python Marks
* Web Programming Marks
* PL/SQL Marks
* Average Marks
* Grade
* AI Recommendation
* Creation Time

---

## ⚙️ PL/SQL Components

The project demonstrates important PL/SQL concepts:

### Function

`calculate_average`

Calculates the average of Python, Web Programming and PL/SQL marks.

### Procedures

`add_student`

Adds a new student and automatically calculates average and grade.

`update_performance`

Updates the student's average marks and grade.

### Trigger

`validate_student_marks`

Validates attendance and marks to ensure values remain between 0 and 100.

---

## 🤖 AI/ML Component

The project uses **Machine Learning with Scikit-learn**.

A Decision Tree Classifier is used to analyze:

* Attendance
* Python marks
* Web Programming marks
* PL/SQL marks

Based on these inputs, the system predicts the student's performance level.

Example prediction categories include:

* Excellent
* Very Good
* Good
* Average
* Needs Improvement
* Poor

---

## 📊 Performance Grading

| Average Marks | Grade |
| ------------: | :---- |
|        90–100 | A+    |
|      80–89.99 | A     |
|      70–79.99 | B     |
|      60–69.99 | C     |
|      50–59.99 | D     |
|      Below 50 | F     |

---

## ▶️ How to Run

### 1. Start Oracle Database

The project uses Oracle Database running through Docker.

```bash
docker start edusmart-oracle
```

Check the container:

```bash
docker ps
```

---

### 2. Start Flask Backend

Open the terminal and go to the backend folder:

```bash
cd ~/Documents/AI-Student-Analyzer/backend
```

Run:

```bash
python3 app.py
```

The backend runs on:

```text
http://127.0.0.1:5000
```

---

### 3. Open Frontend

Open:

```text
frontend/index.html
```

in a web browser.

Make sure the Flask backend and Oracle database are running before using the application.

---

## 🔌 API Endpoints

### Home

```text
GET /
```

Checks whether the Flask backend is running.

### Add Student

```text
POST /add-student
```

Adds a student to the Oracle database.

### Get Students

```text
GET /students
```

Returns student records.

### AI Analysis

```text
GET /ai/<roll_no>
```

Returns the AI-based performance prediction for a student.

---

## 📌 Example

Sample student:

```text
Student Name: Test Student
Roll Number: TEST001
Attendance: 85%
Python Marks: 80
Web Programming Marks: 75
PL/SQL Marks: 82
```

The system calculates:

```text
Average: 79.00
Grade: B
```

and generates an AI-based performance prediction.

---

## 🔮 Future Scope

The project can be further improved by adding:

* Student login and authentication
* Teacher/admin dashboard
* Performance charts and graphs
* More advanced ML models
* Automated email notifications
* Attendance alerts
* Subject-wise recommendations
* PDF report generation
* Cloud database deployment
* Online hosting

---

## 🎓 Academic Project

**Project Name:** EduSmart AI
**Project Type:** Academic / MCA Project
**Domain:** Student Management, Data Analysis & Artificial Intelligence

---

## 👨‍💻 Author

**Ashutosh Kumar**

MCA Student

---

## 📄 License

This project is created for educational and academic purposes.
