# 4Carls

4Carls is a website I designed to practice website backend development.
It consists of a few pages:
 - A homepage with links to the other pages of the sites
 - A forum page, which interacts with a PSQL database (using the psycopg2 package). 
   This page allows site users to post messages, which will show up in order of recency. Has multiple pages of posts,
   and automatically updates every few seconds to find new posts.
 - A blog page where I document some of my updates to the site
 - A "Canvas" page, where users can create a 500x500 colored image and save/load it locally.
   They can also upload the image for others to download.
 - A page that automatically plays an embedded YouTube video
 - Links to my github and some projects I've made
 - A word guessing game, that hides information on the backend so that users can't cheat by inspecting the page code.
 
 Runs alongside an API linked to a PSQL database in which forum post and pictures drawn on the canvas are stored.
