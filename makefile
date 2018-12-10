local:
	python3 ./4carls_api.py localhost 1203 &
	python3 ./4carls_website.py localhost 1204 1203 &
	
nonlocal:
	python3 ./4carls_api.py 0.0.0.0 1203 &
	python3 ./4carls_website.py 0.0.0.0 1204 1203 &
	
killsite:
	pkill -f 4carls
		
remake:	killsite local

