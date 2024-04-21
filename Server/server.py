import torch
from flask import Flask, request, jsonify
from transformers import AutoTokenizer, RobertaTokenizer, RobertaForSequenceClassification, AdamW

# Initialize Flask application
app = Flask(__name__)


def make_predictions(model, texts):
    # Tokenize the input texts
    tokenizer = AutoTokenizer.from_pretrained('roberta-base')
    inputs = tokenizer(texts, truncation=True, padding=True, return_tensors='pt')

    # Move inputs to the same device as the model
    device = model.device
    inputs = {key: value.to(device) for key, value in inputs.items()}

    # Make predictions
    with torch.no_grad():
        outputs = model(**inputs)

    # Get predicted labels
    logits = outputs.logits
    predictions = torch.argmax(logits, dim=1).tolist()

    return predictions

# Load your PyTorch model
def load_model(model_path):
    model = RobertaForSequenceClassification.from_pretrained('roberta-base', num_labels=2)
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    return model


# Replace 'model.pth' with the path to your actual model file
model_path = 'model.pth'
model = load_model(model_path)


# Define the predict endpoint
@app.route('/', methods=['GET'])
def predict():
    # Get input data from request body
    data = request.json
    if data is None:
        return jsonify({'error': 'No input data provided'}), 400

    # Perform prediction
    try:
        texts = [data['input']]
        predictions = make_predictions(model, texts)
        return jsonify({'prediction': predictions}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/health')
def health():
    return "ok", 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)  # Run Flask app

