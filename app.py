from flask import Flask,render_template,request,redirect
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.trainers import ListTrainer

from flask_mysqldb import MySQL
# import datetime
# now = datetime.datetime.now()

#
# from bson import ObjectId # For ObjectId to work
# from pymongo import MongoClient
import os

# client = MongoClient("mongodb://127.0.0.1:27017") #host uri
# db = client.myquerydb #Select the database
# email_id = db.mail #Select the collection name

app = Flask(__name__) 
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'MyDB'

mysql = MySQL(app)

app.static_folder = 'static'
english_bot = ChatBot(
    'Example Bot',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    
    logic_adapters=[
        
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'We are unable to process your query for more information on GECA please visit: <a href="http://geca.ac.in/home.aspx" target="_blank"> http://geca.ac.in/home.aspx for more information.</a>',
            'maximum_similarity_threshold': 0.90
        }
        
        # 'chatterbot.logic.TimeLogicAdapter'

    ]

)
trainer = ListTrainer(english_bot)
trainer.train("chatterbot.corpus.english")
trainer = ChatterBotCorpusTrainer(english_bot)
trainer.train("data/data.yml")
@app.route("/")
def index():
    # cur = mysql.connection.cursor()
    # cur.execute("SELECT * FROM MyUsers ")
    # data = cur.fetchall()
    # render_template('template.html', data=data)
    return render_template("index.html") #to send context to html

@app.route("/get")
def get_bot_response():
     userText = request.args.get("msg") #get data from input,we write js  to index.html
     return str(english_bot.get_response(userText))

@app.route("/action", methods=['POST'])
def action ():
    #Adding a Task
    query=request.values.get("query")
    email=request.values.get("email")
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO MyUsers(query, email) VALUES (%s, %s)", (query, email))
    # email_id.insert({ "query":query, "email":email})
    # return redirect("/")
    mysql.connection.commit()
    cur.close()
    # return 'success'
    return redirect('/')

@app.route('/admin',methods=['GET', 'POST'])  
def admin():  
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid Credentials. Please try again.'
        else:
            cur = mysql.connection.cursor()
            cur.execute("SELECT * FROM MyUsers ")
            data = cur.fetchall()
            return render_template('db.html', data=data)
            # return redirect(url_for('home'))
    return render_template('admin.html', error=error)

if __name__ == "__main__":
     app.run(debug = True)


