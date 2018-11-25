#!/usr/bin/env python3

import warnings
warnings.filterwarnings("ignore", category=UserWarning)

import psycopg2
import sys
sys.path.insert(0, '/mnt/c/Users/DBusisLaptop/Documents/PythonProjects/Config')

from psql_config import host
from psql_config import username
from psql_config import password
from psql_config import database

try:
	connection = psycopg2.connect(database=database, user=username, password=password, host=host)
except Exception as e:
	print(e, file=sys.stderr)
	connection.close()
	exit()

try:
	cursor = connection.cursor()
	user_name = input('Cur user name? ')
	post_content = input('Post: ')
	query = '''INSERT INTO posts (time, contents, poster)
		VALUES ('now', %s, %s)
	'''
	cursor.execute(query, [post_content, user_name])
except Exception as e:
	print(e, file=sys.stderr)
	connection.close()
	exit()


'''
	Code to automatically delete old posts when total post number is greater than 50.
'''
# try:
	# cursor = connection.cursor()
	# row_query = 'SELECT COUNT(*) FROM posts'
	# cursor.execute(row_query)
	# cur_posts = cursor.fetchone()[0]
	# if cur_posts > 50:
		# query = '''DELETE FROM posts
			# WHERE time = any (array(SELECT time FROM posts ORDER BY time LIMIT 1));
		# '''
		# cursor.execute(query)
# except Exception as e:
	# print(e, file=sys.stderr)
	# connection.close()
	# exit()

	
try:
	cursor = connection.cursor()
	query = 'SELECT * FROM posts'
	cursor.execute(query)
except Exception as e:
	print(e, file=sys.stderr)
	connection.close()
	exit()

out_file = open("out_file.txt","w")
for row in cursor:
	out_file.write(str(row)+"\n")
	#str(row[1]).split('.')[0]
out_file.close()
	
connection.commit()
connection.close()