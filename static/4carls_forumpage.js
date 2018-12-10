var post_count_per_page = 20;
initialize();

function initialize(){
	load_footer();
	load_posts();
	submit_post_button = document.getElementById('Submit-Post-Button');
	if (submit_post_button) {
		submit_post_button.onclick=create_post;
	}
	username_box = document.getElementById('Username-Box')
	if (username_box) {
		username = sessionStorage.username;
		
		if (username !== undefined){
			username_box.value = username;
		}
	}
	
	setInterval(load_posts, 5000);
}

function getAPIURL() {
	var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + api_port;
	return baseURL;
}

function getSiteURL() {
	var baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;
	return baseURL;
}

function load_posts() {
	base_url = getAPIURL() + "/get_posts?";
	base_url += "first_post_index="+(page_num-1)*post_count_per_page+"&";
	base_url += "post_count="+post_count_per_page+"&";

	fetch(base_url)
	.then((response) => response.json())
	.then(function(posts) {
		posts_div = document.getElementById('Posts-Div');
		posts_string = "";
		for (i=0; i<posts.length; i++){
			posts_string += '<div class="Post-Box">'
			posts_string += '<p class="Post-Header"><span class="Post-ID">Post ID: '+posts[i]['id']+'</span> | '
			posts_string += '<span class="Post-Username">'+posts[i]['poster']+' says: </span></p>'
			posts_string += '<p class="Post-Content">'
			for (j=0; j<posts[i]['contents'].length; j++){
				cur_class = "Post-Content-Line";
				if (posts[i]['contents'][j][0] === ">") {
					cur_class = "Post-Content-Line-Green";
				}
				posts_string += '<span class="'+cur_class+'">'+posts[i]['contents'][j]+'</span><br>'
			}
			posts_string += '</p>'
			posts_string += '</div>'
		}
		if(posts_div){
			posts_div.innerHTML=(posts_string);
		}
	})
}

function create_post() {
	submit_post_box = document.getElementById('Submit-Post-Box')
	username_box = document.getElementById('Username-Box')
	if (submit_post_box && username_box) {
		make_post_url = getAPIURL() + '/put_post?';
		contents_list = submit_post_box.value.split(/[\r\n]/);
		if (contents_list.length>1 || contents_list[0]!==""){
			for (i=0; i<contents_list.length; i++){
				cur_contents = contents_list[i];
				cur_contents = encodeURIComponent(cur_contents)
				make_post_url += "contents="+cur_contents+"&"
			}
			username = username_box.value;
			if (username !== ''){
				make_post_url+="username="+username;
			}
			fetch(make_post_url)
			.then(function(){
				submit_post_box.value="";
				load_posts();
			})
			//console.log(['↵', '\u21b5']);
			//console.log(submit_post_box.value.split('\u21b5'))
			//console.log(submit_post_box.value.split(/[(\r\n)\r\n]/))
			
			save_session_username(username);
		}
	}
}

function save_session_username(username){
	sessionStorage.username = username;
}

function load_footer() {
	page_num_span = document.getElementById('Page-Num-Span');
	switch_page_buttons = document.getElementById('Switch-Page-Buttons');
	if(page_num_span && switch_page_buttons){
		count_url = getAPIURL() + '/count';
		fetch(count_url)
		.then((response) => response.json())
		.then(function(count_dict) {
			post_count = count_dict['post_count'];
			total_pages = Math.floor((post_count-1)/post_count_per_page)+1;
			footer_html = ''
			for (i=1;i<=total_pages;i++) {
				number_link_html = '<a href="'+getSiteURL()+'/forum/'+i+'">'+i+'</a>'
				if (i === page_num){
					number_link_html = '<b>'+i+'</b>'
				}
				footer_html += '['+number_link_html+'] '
			}
			page_num_span.innerHTML=footer_html;
			
			switch_page_html = ''
			if (page_num > 1){
				switch_page_html += '[<a href="'+getSiteURL()+'/forum/'+(page_num-1)+'">Back</a>]';
			}
			if (page_num < total_pages) {
				// console.log(page_num, total_pages);
				switch_page_html += '[<a href="'+getSiteURL()+'/forum/'+(page_num+1)+'">Next</a>]';
			}
			switch_page_buttons.innerHTML=switch_page_html;
		})
	}
}