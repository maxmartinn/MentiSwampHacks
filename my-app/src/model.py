import os
import flair
import flask
from flask_cors import CORS
from flask_mail import Mail, Message
import smtplib

app = flask.Flask(__name__)
CORS(app)
mail= Mail(app)
flair_sentiment = flair.models.TextClassifier.load('en-sentiment')

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'jitheshaditya@gmail.com'
app.config['MAIL_PASSWORD'] = 'lxbsixmkqemywavq'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

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

@app.route('/send', methods=['POST'])
def send():
  # Email server details
  smtp_server = "smtp.gmail.com"
  smtp_port = 587
  username = "jitheshaditya@gmail.com"
  password = "" #deleted for privacy  
  person_in_question = flask.request.json["user"]

  # Email details
  sender = "jitheshaditya@gmail.com"
  recipient = "jitheshaditya@gmail.com"
  subject = "Menty Email"
  body = "Good evening, \n\nWe noticed your friend " + person_in_question + " wasn't feeling the best today. We wanted to inform you if you knew any way that you could cheer them up. \n\nSincerely, \nMenty Team"

  # Prepare the email message
  message = f"Subject: {subject}\n\n{body}"

  # Connect to the email server
  with smtplib.SMTP(smtp_server, smtp_port) as server:
      server.starttls()
      server.login(username, password)
      server.sendmail(sender, flask.request.json["recipient_emails"], message)

  return "Sent"

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 3001)