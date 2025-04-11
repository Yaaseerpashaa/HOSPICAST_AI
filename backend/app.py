from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

app = Flask(__name__)
CORS(app)

# Load dataset and model
MODEL_PATH = 'disease_model.pkl'
DATASET_PATH = 'disease_symptom_dataset.csv'

# Load or train model
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
else:
    df = pd.read_csv(DATASET_PATH)
    # Get all symptom columns dynamically
    symptom_cols = [col for col in df.columns if col.startswith('symptom')]
    X = df[symptom_cols]
    y = df['disease']
    
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X, y)
    joblib.dump(model, MODEL_PATH)

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        symptoms = data['symptoms']
        
        # Convert symptoms to model input format
        symptom_cols = [col for col in pd.read_csv(DATASET_PATH).columns 
                       if col.startswith('symptom')]
        input_data = [1 if col in symptoms else 0 for col in symptom_cols]
        
        prediction = model.predict([input_data])[0]
        
        # Get additional doctor info (matching your frontend structure)
        doctors = {
            "Pediatrics": "Dr. Lisa Wong (Pediatrics)",
            "Cardiology": "Dr. Sarah Johnson (Cardiology)",
            # Add other specialties as needed
        }
        
        return jsonify({
            'disease': prediction,
            'doctor': doctors.get(prediction.split('(')[-1].rstrip(')'), "Dr. General"),
            'location': "Floor X, Department Ward, Room YYY",
            'schedule': "9:00 AM - 5:00 PM (Mon-Fri)"
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)