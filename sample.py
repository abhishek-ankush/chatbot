from flask import Flask,render_template,request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.trainers import ListTrainer


# 
app = Flask(__name__) 
app.static_folder = 'static'
english_bot = ChatBot(
    'Example Bot',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': '<a href="http://geca.ac.in/home.aspx" target="_blank">vist: http://geca.ac.in/home.aspx</a>',
            'maximum_similarity_threshold': 0.10
        }
    ]
)
trainer = ListTrainer(english_bot)
trainer.train("chatterbot.corpus.english")
trainer = ChatterBotCorpusTrainer(english_bot)
trainer.train("data/data.yml")
@app.route("/")
def index():
     return render_template("index.html") #to send context to html

@app.route("/get")
def get_bot_response():
     userText = request.args.get("msg") #get data from input,we write js  to index.html
     return str(english_bot.get_response(userText))


if __name__ == "__main__":
     app.run(debug = True)


