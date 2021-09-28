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
    return render_template("index.html")

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


@app.route('/inputs', methods=['POST'])
def save_inputs():
    input_receive0 = request.form['input_give0']
    input_receive1 = request.form['input_give1']
    input_receive2 = request.form['input_give2']
    input_receive3 = request.form['input_give3']
    input_receive4 = request.form['input_give4']
    input_receive5 = request.form['input_give5']
    input_receive6 = request.form['input_give6']
    input_receive7 = request.form['input_give7']



    db.opendoor.insert_one({'Input0': input_receive0,
                            'Input1': input_receive1,
                            'Input2': input_receive2,
                            'Input3': input_receive3,
                            'Input4': input_receive4,
                            'Input5': input_receive5,
                            'Input6': input_receive6,
                            'Input7': input_receive7})

@app.route('/answers', methods=['POST'])
def save_inputs():
    input_receive0 = request.form['input_give0']


    return jsonify({'msg': 'Your answers have been saved'})

if __name__ == '__main__':
    app.run()

