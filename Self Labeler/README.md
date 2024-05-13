# Self Labeler Component Documentation

## Purpose

The self-labeler component is designed to automatically label new data obtained from a news-please scrapper. It retrieves data from a database, processes it, and then uses a pre-trained model to predict labels for the data. This enables the efficient categorization of news articles or similar text-based content without manual intervention.

## Usage

This component is integrated into a larger system where it is called to process and label new data stored in a database. The process involves several steps:

1. **Connecting to the Supabase database** to retrieve the data.
2. **Preprocessing the text data**.
3. **Loading a pre-trained model**.
4. **Making predictions on the text data** using the loaded model.
5. **Storing the labelled data** for further analysis or use.

## Code Walkthrough

### Connecting to Supabase:
- The `UserSecretsClient()` is instantiated to manage user secrets.
- The Supabase URL and API key are retrieved securely using `get_secret()` method from the user secrets.

### Querying the Database:
- A query URL is constructed to retrieve data from the Supabase database. The query selects the "maintext" field from the "currentversions" table, limiting the results to 1000 entries.
- A GET request is made to the query URL with appropriate headers containing the API key.
- The response is parsed as JSON data.

### Processing Text Data:
- The "maintext" field from each row in the retrieved data is extracted into a list named `main_texts`.
- Additional preprocessing steps, if any, can be applied here.

### Loading the Model:
- The path to the pre-trained model file is provided.
- The `load_model()` function is called to load the model from the specified path.

### Self-labeling Process:
- A loop iterates over each text in the `main_texts`.
- The loaded model is used to make predictions on each text using the `make_predictions()` function.
- The original text and its corresponding prediction(s) are stored in a dictionary and appended to the `self_labeled_batch` list.

## Output

The output of the self-labeler component is a batch of labeled data, where each entry contains the original text along with its predicted label(s).

## Further Integration

The labelled data can be further processed, analyzed, or stored as needed within the larger system. For example, it can be used for training and improving the model, or for generating insights about the content of the news articles.

## Security Considerations

- The Supabase API key is securely accessed using the `get_secret()` method, ensuring that sensitive information is not exposed in the code.
- Additional security measures, such as encryption or token-based authentication, can be implemented depending on the specific requirements and constraints of the system.
