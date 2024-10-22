from flask import Flask, render_template, session, redirect, url_for, request
from flask_cors import CORS
import os

app = Flask(__name__)

# Secret key for encrypting the session cookies
app.secret_key = os.urandom(24)

# Enable CORS for cross-origin requests
CORS(app, resources={r"/*": {"origins": "127.0.0.1,openpassmen.spptechnologies.in"}})

@app.route('/',methods=["GET"])
def index():    
    return render_template("index.html")

if __name__ == '__main__':
    # app.run(debug=True,ssl_context='adhoc')  # Enables HTTPS for development  and force to obtain self sign SSL
    app.run(debug=True,host='0.0.0.0')
