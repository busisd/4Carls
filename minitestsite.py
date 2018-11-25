#!/usr/bin/env python3
import sys
import flask

app = flask.Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def get_main_page():
	return "HI"

@app.route('/<country>')
def get_country_page(country):
	return "HELLO"+country+flask.request.args.get('hello')

@app.route('/country')
def get_country_page2():
	return "BYE"

@app.route('/country/')
def get_country_page4():
	return "BYE2"

@app.route('/country/<country>')
def get_country_page3(country):
	return "GOODBYE"+country
	
@app.route('/test')	
def testets():
	return flask.render_template('4carls_frontpage.html', page_num=1, api_port=1203, port=1205)
	
if __name__ == '__main__':
	app.run(host='localhost', port=int(1205), debug=True)
