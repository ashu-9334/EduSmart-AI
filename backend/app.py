from flask import Flask, jsonify, request
import oracledb
import sys

sys.path.append("../ai")

from model import predict_performance

app = Flask(__name__)


def get_connection():
    return oracledb.connect(
        user="edusmart",
        password="EduSmart123",
        dsn="localhost:1521/FREEPDB1"
    )


@app.route("/")
def home():
    return jsonify({
        "message": "EduSmart AI Backend is Running"
    })

@app.route("/add-student", methods=["POST"])
def add_student():

    data = request.get_json()

    connection = get_connection()
    cursor = connection.cursor()

    try:

        cursor.callproc("add_student", [
            data["student_name"],
            data["roll_no"],
            data["attendance"],
            data["python_marks"],
            data["web_marks"],
            data["plsql_marks"]
        ])

        connection.commit()

        return jsonify({
            "message": "Student saved successfully"
        })

    except oracledb.IntegrityError:
        connection.rollback()

        return jsonify({
            "error": "Roll number already exists"
        }), 409

    finally:
        cursor.close()
        connection.close()


@app.route("/students")
def students():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT student_id, student_name, roll_no,
               attendance, python_marks, web_marks,
               plsql_marks, average_marks, grade
        FROM student_performance
    """)

    rows = cursor.fetchall()

    cursor.close()
    connection.close()

    data = []

    for row in rows:
        data.append({
            "student_id": row[0],
            "student_name": row[1],
            "roll_no": row[2],
            "attendance": row[3],
            "python_marks": row[4],
            "web_marks": row[5],
            "plsql_marks": row[6],
            "average_marks": row[7],
            "grade": row[8]
        })

    return jsonify(data)


    return jsonify({
        "message": "Student added successfully"
    })

@app.route("/ai/<roll_no>")
def ai_analysis(roll_no):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT attendance, python_marks, web_marks, plsql_marks
        FROM student_performance
        WHERE roll_no = :roll_no
    """, {"roll_no": roll_no})

    row = cursor.fetchone()

    cursor.close()
    connection.close()

    if row is None:
        return jsonify({
            "error": "Student not found"
        }), 404

    attendance, python_marks, web_marks, plsql_marks = row

    prediction = predict_performance(
        attendance,
        python_marks,
        web_marks,
        plsql_marks
    )

    return jsonify({
        "roll_no": roll_no,
        "ai_prediction": prediction
    })


if __name__ == "__main__":
    app.run(debug=True)