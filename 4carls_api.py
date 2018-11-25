#!/usr/bin/env python3

import warnings
warnings.filterwarnings("ignore", category=UserWarning)
import os
import flask
import psycopg2
import json
import sys

sys.path.insert(0, os.path.dirname(os.path.realpath(__file__))+'/../Config')
import psql_config

app = flask.Flask(__name__)

def get_connection():
	connection = None
	try:
		connection = psycopg2.connect(database=psql_config.database, 
				user=psql_config.username, 
				password=psql_config.password, 
				host=psql_config.host)
	except Exception as e:
		print(e, file=sys.stderr)
	return connection
			
@app.after_request
def set_headers(response):
	response.headers['Access-Control-Allow-Origin'] = '*'
	return response

@app.route('/')
def default():
	return 'Go to url /get_posts to get a list of all posts! \nOr to /put_post to add a post!'
	
@app.route('/get_posts')
def return_posts():
	first_post_index = flask.request.args.get('first_post_index')
	post_count = flask.request.args.get('post_count')
	
	if first_post_index is None:
		first_post_index = 0;
	
	connection = get_connection()
	post_list = []
	if connection is not None:
		try:
			cursor = connection.cursor()
			query = 'SELECT * FROM posts ORDER BY time DESC LIMIT %s OFFSET %s'
			cursor.execute(query, [post_count, first_post_index])
			for row in cursor:
				post_time = str(row[0]).split('.')[0]
				post_poster = row[1]
				post_id = row[2]
				post_contents = row[3]
				cur_post_dict = {'time':post_time, 'contents':post_contents, 'poster':post_poster, 'id':post_id}
				post_list.append(cur_post_dict)
		except Exception as e:
			print(e, file=sys.stderr)
		connection.close()
	return json.dumps(post_list)
	
@app.route('/put_post')
def create_post():
	return_message = "Post not added, please specify post contents"
	username = flask.request.args.get('username', default='Anon')
	contents = flask.request.args.getlist('contents')
	connection = get_connection()
	if (contents != [] and connection is not None):
		try:
			cursor = connection.cursor()
			query = '''INSERT INTO posts (time, contents, poster)
					VALUES ('now', %s, %s)
				'''
			cursor.execute(query, [contents, username])
			return_message = "Message added!"
		except Exception as e:
			return_message = "Message failed, error occurred."
			print(e, file=sys.stderr)
		
	if connection is not None:
		connection.commit()
		connection.close()
	return return_message
	
@app.route('/count')
def return_post_count():
	connection = get_connection()
	post_count = -1
	if connection is not None:
		try:
			cursor = connection.cursor()
			query = 'SELECT COUNT(*) FROM posts'
			cursor.execute(query)
			post_count = cursor.fetchone()
		except Exception as e:
			print(e, file=sys.stderr)
		connection.close()
	return json.dumps({'post_count':post_count[0]})

	
if __name__ == '__main__':
	if len(sys.argv) != 3:
		print('Usage: {0} host port'.format(sys.argv[0]), file=sys.stderr)
		exit()
	
	host = sys.argv[1]
	port = sys.argv[2]
	app.run(host=host, port=int(port), debug=True)
