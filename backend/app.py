from flask import Flask, request, jsonify
from flask_cors import CORS
from util import get_algorithm_function 

app = Flask(__name__)
CORS(app)

@app.route("/visualize", methods=["POST"])
def visualize():
    data = request.get_json()
    input_data = data.get("inputData")
    algo_type = data.get("type")
    algo = data.get("algo")
    quantum = data.get("quantum", 4)  # Default quantum for Round Robin is 4

    result = get_algorithm_function(algo_type, algo, input_data, quantum)  
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
