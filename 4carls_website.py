import flask
import sys
from flask import send_file
from flask import jsonify, request

app = flask.Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def frontpage():
	return flask.render_template('4carls_frontpage.html')
	
@app.route('/secretpage')
def secretpage():
	return flask.render_template('4carls_secretpage.html')

@app.route('/blog')
def blogpage():
	return flask.render_template('4carls_blog.html')

@app.route('/canvas')
def canvaspage():
	global api_port
	global port
	return flask.render_template('4carls_canvaspage.html', api_port=api_port, port=port)
	
@app.route('/canvas/put', methods=['PUT'])
def canvaspage_put():
	print(request.get_json()['pixel_col_0_row_0'])
	return jsonify("Canvas uploaded!")

@app.route('/forum/')
def forumpage_defaults():
	return forumpage_pagenum(1)

@app.route('/forum/<pagenum>')
def forumpage_pagenum(pagenum):
	global api_port
	global port
	return flask.render_template('4carls_forumpage.html', page_num=pagenum, api_port=api_port, port=port)

@app.route('/downloads/<filename>')
def download_file(filename):
	return send_file("downloads/"+filename, as_attachment=True)

@app.route('/wordguess')
def wordguess():
	global api_port
	global port
	return flask.render_template('4carls_wordguess.html', port=port)

@app.route('/wordguess/makeguess', methods=['POST'])
def wordguess_makeguess():
	word_one = request.form.get('First-Word')
	word_two = request.form.get('Second-Word')
	word_three = request.form.get('Third-Word')
	final_string = ""
	guesses = [word_one, word_two, word_three]
	correct = ["you've", "been", "gnomed"]
	if guesses[0].lower() == correct[0] and guesses[1].lower() == correct[1] and guesses[2].lower() == correct[2]:
		return jsonify("All correct!")
	
	for i in range(0,3):
		final_string+=wordmatch(guesses[i], correct[i])
		final_string+="\n"
		
	return jsonify(final_string)
	
def wordmatch(guess, real):
	guess = guess.lower()
	if len(guess) > len(real):
		return guess+" is too long!"
	elif len(guess) < len(real):
		return guess+" is too short!"
	elif guess != real:
		same_count = 0
		for i in range(0, len(real)):
			if(guess[i]==real[i]):
				same_count += 1
		return guess+" has "+str(same_count)+" letters in common with the real word!"
	else:
		return guess+" is correct!"
	
if __name__ == '__main__':	
	if len(sys.argv) != 4:
		print('Usage: {0} host port api_port'.format(sys.argv[0]), file=sys.stderr)
		exit()
	
	host = sys.argv[1]
	port = sys.argv[2]
	api_port = sys.argv[3]
	
	app.run(host=host, port=int(port), debug=False, threaded=True)
