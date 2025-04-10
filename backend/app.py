from flask import Flask, request, jsonify
from flask_cors import CORS
from db_config import get_connection  # Import your DB connection function

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests (React can talk to Flask)


# ------------------ GET all users ------------------
@app.route('/users', methods=['GET'])
def get_users():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Registration")
    result = cursor.fetchall()
    conn.close()
    return jsonify(result)


# ------------------ ADD new user ------------------
@app.route('/users', methods=['POST'])
def add_user():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    dob = data.get('dob')
    gender = data.get('gender')
    mobile = data.get('mobile')

    conn = get_connection()
    cursor = conn.cursor()
    query = "INSERT INTO Registration (name, email, dob, gender, mobile) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(query, (name, email, dob, gender, mobile))
    conn.commit()
    conn.close()

    return jsonify({"message": "User added successfully"})


# ------------------ UPDATE existing user ------------------
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    name = data.get('name')
    email = data.get('email')
    dob = data.get('dob')
    gender = data.get('gender')
    mobile = data.get('mobile')

    conn = get_connection()
    cursor = conn.cursor()
    query = "UPDATE Registration SET name=%s, email=%s, dob=%s, gender=%s, mobile=%s WHERE id=%s"
    cursor.execute(query, (name, email, dob, gender, mobile, user_id))
    conn.commit()
    conn.close()

    return jsonify({"message": "User updated successfully"})


# ------------------ DELETE a user ------------------
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    conn = get_connection()
    cursor = conn.cursor()
    query = "DELETE FROM Registration WHERE id=%s"
    cursor.execute(query, (user_id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "User deleted successfully"})


# ------------------ Run the app ------------------
if __name__ == '__main__':
    app.run(debug=True)
