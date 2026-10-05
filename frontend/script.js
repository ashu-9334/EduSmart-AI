const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", async function () {

    const studentName = document.getElementById("studentName").value.trim();
    const rollNo = document.getElementById("rollNo").value.trim();

    const attendance = parseFloat(
        document.getElementById("attendance").value
    );

    const pythonMarks = parseFloat(
        document.getElementById("pythonMarks").value
    );

    const webMarks = parseFloat(
        document.getElementById("webMarks").value
    );

    const plsqlMarks = parseFloat(
        document.getElementById("plsqlMarks").value
    );

    if (!studentName || !rollNo) {
        alert("Please enter student name and roll number.");
        return;
    }

    if (
        Number.isNaN(attendance) ||
        Number.isNaN(pythonMarks) ||
        Number.isNaN(webMarks) ||
        Number.isNaN(plsqlMarks)
    ) {
        alert("Please enter all marks and attendance.");
        return;
    }

    if (
        attendance < 0 || attendance > 100 ||
        pythonMarks < 0 || pythonMarks > 100 ||
        webMarks < 0 || webMarks > 100 ||
        plsqlMarks < 0 || plsqlMarks > 100
    ) {
        alert("Marks and attendance must be between 0 and 100.");
        return;
    }

    const average =
        (pythonMarks + webMarks + plsqlMarks) / 3;

    let grade;

    if (average >= 90) {
        grade = "A+";
    } else if (average >= 80) {
        grade = "A";
    } else if (average >= 70) {
        grade = "B";
    } else if (average >= 60) {
        grade = "C";
    } else if (average >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    document.getElementById("averageResult").textContent =
        average.toFixed(2);

    document.getElementById("gradeResult").textContent =
        grade;

    const saveResponse = await fetch(
    "http://127.0.0.1:5000/add-student",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            student_name: studentName,
            roll_no: rollNo,
            attendance: attendance,
            python_marks: pythonMarks,
            web_marks: webMarks,
            plsql_marks: plsqlMarks
        })
    }
);

const saveData = await saveResponse.json();

if (!saveResponse.ok) {
    alert(saveData.error);
    return;
}
    
        try {

        const response = await fetch(
            `http://127.0.0.1:5000/ai/${rollNo}`
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.error);
            return;
        }

        document.getElementById("aiResult").textContent =
            data.ai_prediction;

        let recommendation;

        if (attendance < 75) {

            recommendation =
                "Your attendance is below 75%. Attend classes regularly to improve your academic performance.";

        } else if (pythonMarks < 60) {

            recommendation =
                "Your Python performance needs improvement. Practice programming problems regularly.";

        } else if (webMarks < 60) {

            recommendation =
                "Your Web Programming performance needs improvement. Practice HTML, CSS and JavaScript.";

        } else if (plsqlMarks < 60) {

            recommendation =
                "Your PL/SQL performance needs improvement. Practice SQL queries, procedures and database concepts.";

        } else if (average >= 85) {

            recommendation =
                "Excellent performance! Keep maintaining your marks and continue improving your technical skills.";

        } else if (average >= 70) {

            recommendation =
                "Good performance! Focus on your weaker subjects and practice regularly to achieve higher marks.";

        } else {

            recommendation =
                "Your overall performance needs improvement. Create a regular study schedule and focus on all subjects.";

        }

        document.getElementById("recommendationText").textContent =
            recommendation;

    } catch (error) {

        alert(
            "Unable to connect with Flask backend. Make sure Flask is running."
        );

        console.error(error);
    }
});

async function loadStudents() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/students"
        );

        const students = await response.json();

        document.getElementById("totalStudents").textContent =
            students.length;

        const validAverages = students
            .map(student => student.average_marks)
            .filter(value => value !== null);

        if (validAverages.length > 0) {

            const total = validAverages.reduce(
                (sum, value) => sum + value,
                0
            );

            const overallAverage = total / validAverages.length;

            document.getElementById("overallAverage").textContent =
                overallAverage.toFixed(2);
        }

        const grades = students
            .map(student => student.grade)
            .filter(grade => grade);

        const gradeOrder = ["A+", "A", "B", "C", "D", "F"];

        let topGrade = "--";

        for (const grade of gradeOrder) {

            if (grades.includes(grade)) {
                topGrade = grade;
                break;
            }
        }

        document.getElementById("topGrade").textContent = topGrade;

        const tableBody =
            document.getElementById("studentTableBody");

        tableBody.innerHTML = "";

        for (const student of students) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.student_name}</td>
                <td>${student.roll_no}</td>
                <td>${student.attendance}%</td>
                <td>${student.average_marks ?? "--"}</td>
                <td>
                    <span class="grade-badge">
                        ${student.grade ?? "--"}
                    </span>
                </td>
                <td>
                    <span class="ai-badge" id="ai-${student.roll_no}">
                        Loading...
                    </span>
                </td>
            `;

            tableBody.appendChild(row);

            try {

                const aiResponse = await fetch(
                    `http://127.0.0.1:5000/ai/${student.roll_no}`
                );

                const aiData = await aiResponse.json();

                document.getElementById(
                    `ai-${student.roll_no}`
                ).textContent = aiData.ai_prediction;

            } catch (error) {

                document.getElementById(
                    `ai-${student.roll_no}`
                ).textContent = "Unavailable";
            }
        }

    } catch (error) {

        console.error(error);

        document.getElementById("studentTableBody").innerHTML = `
            <tr>
                <td colspan="6">
                    Unable to load student records.
                </td>
            </tr>
        `;
    }
}

loadStudents();