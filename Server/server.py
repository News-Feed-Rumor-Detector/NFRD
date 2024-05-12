import torch
from flask import Flask, request, jsonify
from transformers import AutoTokenizer, RobertaTokenizer, RobertaForSequenceClassification, AdamW
from flask_cors import CORS

# Initialize Flask application
app = Flask(__name__)
CORS(app)

def make_predictions(model, texts):
    # Tokenize the input texts
    tokenizer = AutoTokenizer.from_pretrained('NFRD/nfrd-model')
    inputs = tokenizer(texts, truncation=True, padding=True, return_tensors='pt')

    # Move inputs to the same device as the model
    device = model.device
    inputs = {key: value.to(device) for key, value in inputs.items()}

    # Make predictions
    with torch.no_grad():
        outputs = model(**inputs)

    # Get predicted labels
    logits = outputs.logits
    prediction = torch.argmax(logits, dim=1).tolist()[0]
    softmax = torch.nn.Softmax(dim=1)
    confidence = softmax(logits)[0].tolist()[prediction]
    return prediction, confidence

# Load your PyTorch model
def load_model():
    model = RobertaForSequenceClassification.from_pretrained('NFRD/nfrd-model', num_labels=2)
    return model

model = load_model()


# Define the predict endpoint
@app.route('/', methods=['POST'])
def predict():
    # Get input data from request body
    data = request.json
    if data is None:
        return jsonify({'error': 'No input data provided'}), 400

    # Perform prediction
    try:
        texts = [data['input']]
        prediction, confidence = make_predictions(model, texts)
        return jsonify({'prediction': prediction, 'confidence': confidence}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/health')
def health():
    return "ok", 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)  # Run Flask app