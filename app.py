from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# Function to validate a single Facebook token
def validate_token(token):
    url = f"https://graph.facebook.com/v17.0/me?access_token={token}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()  # Token is valid
    else:
        return None  # Invalid token

# Function to validate multiple tokens
def validate_multiple_tokens(tokens):
    results = []
    for token in tokens:
        result = validate_token(token.strip())
        results.append({
            "token": token.strip(),
            "valid": result is not None,
            "details": result if result else None
        })
    return results

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_token', methods=['POST'])
def check_token():
    token = request.form['token']
    result = validate_token(token)
    if result:
        return jsonify({"status": "valid", "data": result})
    else:
        return jsonify({"status": "invalid"})

@app.route('/check_multiple_tokens', methods=['POST'])
def check_multiple_tokens():
    tokens = request.form['tokens'].splitlines()
    results = validate_multiple_tokens(tokens)
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
