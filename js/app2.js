$(document).ready(function(){
	//enable listeners
	$('#tag-search').submit(function(){instagram_api($(this));return false;})
	//load default page
	/*PLACE FUNCTION HERE THAT LOADS PICTURES ON PAGE LOAD */
	ajax_call('toronto');
	
});

//global variable
var animation ='';

function instagram_api(frm){
	var search = frm.find('input[name="tag_search"]').val();
	console.log(search);
	/* PLACE FUNCTION HERE */
	ajax_call(search);
}
var scroll_images=function(){
	$('#image-container').animate({'top':'-=1'},1,function(){
	});
}
function images_response(data){
	console.log(data);
	images = data.data;
	$('#instagram-pics').html('');
	for(image in images){
		console.log(images[image].images.standard_resolution.url);
		/* 
			WRITE THE FUNCTION THAT TAKES THE IMAGE URL AND ADDS THEM TO
			list with the id instagram-pics. You will need to know the following things:

			1. To add html to an element with jquery use this syntax $('#instagram-pics').append('html tag goes in here');
			2. To make sure all images fit in the squares available to them, use these css properties
			   background:url('image url')
			   background-size:cover
			   background-position:center center
	     */
	    var image_url = images[image].images.standard_resolution.url
		$('#instagram-pics').append('<li class="blur" style="background:url('+image_url+');background-size:cover; background-position:center center">');
		
	}
	$('#image-container').css('top','0px');
	clearInterval(animation);
	animation=setInterval(scroll_images,100);
}

function ajax_call(tag){

	$.ajax({
		url:'https://api.instagram.com/v1/tags/'+encodeURI(tag)+'/media/recent?client_id=61f8b631abd34732a3bcd8c73d0d73a9',
		type:'GET',
		dataType:'jsonp',
		success:function(data){
			images_response(data);
			
		},
		error:function(data){
			console.log(data);
		}
	});

}

