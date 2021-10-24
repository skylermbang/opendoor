from flask import Flask, render_template
from pymongo import MongoClient
from flask_bootstrap import Bootstrap
app = Flask(__name__)
bootstrap = Bootstrap(app)
client = MongoClient('mongodb://test:test@localhost', 27017)

db = client.dbmovietalk
@app.route('/')
def Chinese_version_main():
    return render_template("Chinese_Version_Allinone.html")

@app.route('/aboutUs')
def Chinese_version_about():
    return render_template("Chinese_version_aboutus.html")

if __name__ == '__main__':
    app.run()
