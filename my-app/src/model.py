import os
import flair
import flask

app = flask.Flask(__name__)
flair_sentiment = flair.models.TextClassifier.load('en-sentiment')

@app.route('/predict', methods=['POST'])
def predict():
    sentence = flask.request.json['sentence']
    s = flair.data.Sentence(sentence)
    flair_sentiment.predict(s)
    total_sentiment = s.labels
    dic = total_sentiment[0].to_dict()
    if dic["value"] == 'NEGATIVE':
        return str(-1* dic["confidence"])
    else:
        return str(dic["confidence"])

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 5000)
