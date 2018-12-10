import flask
import sys

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
	return flask.render_template('4carls_canvaspage.html')

@app.route('/forum/')
def forumpage_defaults():
	global api_port
	global port
	return flask.render_template('4carls_forumpage.html', page_num=1, api_port=api_port, port=port)

@app.route('/forum/<pagenum>')
def forumpage_pagenum(pagenum):
	global api_port
	global port
	return flask.render_template('4carls_forumpage.html', page_num=pagenum, api_port=api_port, port=port)
	
if __name__ == '__main__':	
	if len(sys.argv) != 4:
		print('Usage: {0} host port api_port'.format(sys.argv[0]), file=sys.stderr)
		exit()
	
	host = sys.argv[1]
	port = sys.argv[2]
	api_port = sys.argv[3]
	
	app.run(host=host, port=int(port), debug=False, threaded=True)
