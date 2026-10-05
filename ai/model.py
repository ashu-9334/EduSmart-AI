from sklearn.tree import DecisionTreeClassifier

X = [
    [90, 90, 90, 90],
    [85, 80, 85, 80],
    [75, 70, 75, 70],
    [65, 60, 65, 60],
    [50, 45, 50, 45],
    [40, 35, 40, 35]
]

y = [
    "Excellent",
    "Very Good",
    "Good",
    "Average",
    "Needs Improvement",
    "Poor"
]

model = DecisionTreeClassifier()
model.fit(X, y)

def predict_performance(attendance, python, web, plsql):
    result = model.predict([
        [attendance, python, web, plsql]
    ])

    return result[0]