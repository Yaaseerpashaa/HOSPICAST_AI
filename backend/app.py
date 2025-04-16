from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)

# Load your dataset
# Replace this with your actual dataset path
df = pd.read_csv('disease_symptom_dataset.csv')

# Prepare your model
# This is a simplified example - you should adapt it to your actual dataset structure
X = df[['symptom1', 'symptom2', 'symptom3']]  # Add all symptom columns
y = df['disease']

model = RandomForestClassifier()
model.fit(X, y)

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    symptoms = data['symptoms']
    
    # Process symptoms and make prediction
    # This is a simplified example - you'll need to adapt it to your actual model
    prediction = model.predict([symptoms])[0]
    
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)