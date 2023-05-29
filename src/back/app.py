from flask import Response, request, Flask
from models import *
from flask_cors import CORS
import joblib

model = joblib.load('./model/saved_new_model.pkl')

vectorizer = joblib.load('./model/vectorizer.pkl')

# new_data = "This is a new review test."

# new_data_vectorized = vectorizer.transform([new_data])

# predictions = model.predict(new_data_vectorized)

app = Flask(__name__)

CORS(app)

@app.route('/estimate', methods=['POST'])
def create_estimate():
    data = request.get_json(force=True)
    review = data['review']
    print(review)
    new_data_vectorized = vectorizer.transform([review])
    predictions = model.predict(new_data_vectorized)
    # for i, prediction in enumerate(predictions):
    print (predictions)
    # print(f"Prediction for review {i+1}: {prediction}")
    resp = str(predictions)
    if resp:
            return Response(status=200, response=resp)
    else:
            return Response(status=300, response='Try later, Cowboy, something is definetely wrong')

if __name__ == 'main':
    app.run(debug=True)

