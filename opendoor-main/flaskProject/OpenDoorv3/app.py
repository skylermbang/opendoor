from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from flask_bootstrap import Bootstrap

app = Flask(__name__)
bootstrap = Bootstrap(app)

client=MongoClient('localhost',27017)
db=client.opendoor

## db.opendoor.insert_one({'name':'test','age':21} )
## testing the dbs


@app.route("/")
def index():
    return render_template("allinone.html")

@app.route('/aboutUs') 
def f_infor():
    return render_template('aboutUs.html')

@app.route('/cards', methods=['POST'])
def save_cards():
    rp_receive = request.form['rp_give']
    customer_receive = request.form['customer_give']
    problem_receive = request.form['problem_give']
    solution_receive = request.form['solution_give']
   
    db.opendoor.insert_one({'Roleplay': rp_receive,'Customer': customer_receive, 'Problem': problem_receive, 'Solution': solution_receive})
    print(rp_receive, customer_receive, problem_receive,solution_receive)
    return jsonify({'msg': 'Your cards have been saved'})


@app.route('/answer', methods=['POST'])
def save_cards():
    problem_receive = request.form['problem_give']
   
    db.opendoor.insert_one({'Problem': problem_receive,em})
    print(rp_receive, customer_receive, problem_receive,solution_receive)
    return jsonify({'msg': 'Your cards have been saved'})

if __name__ == '__main__':
    app.run()

