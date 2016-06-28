$(document).ready(function(){
	//enable listeners
	$('#tag-search').submit(function(){instagram_api($(this));return false;})
	//load default page
	/*PLACE FUNCTION HERE THAT LOADS PICTURES ON PAGE LOAD */

	ajax_call('raptors');

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       
	   
	var tag = $('.btt').val();
	console.log(tag);
	ajax_call(tag);
   }
});


	
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
	$('#image-container').animate({'top':'-=1'},100,function(){
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
	     $('#instagram-pics').append('<li style="background:url('+ image_url +');background-size:cover;background-position:center center">');

	}
	$('#image-container').css('top','0px');
	clearInterval(animation);
	//animation=setInterval(scroll_images, 100);
}

function ajax_call(tag){

	/* 
	complete the AJAX code block below to gather the 20 most recent photos with the tag 
	you searched for

	You can use the following client Id:
	client_id=61f8b631abd34732a3bcd8c73d0d73a9

	*/

	var ACCESS_TOKEN = '61f8b631abd34732a3bcd8c73d0d73a9';

	var url = 'https://api.instagram.com/v1/tags/'+ encodeURI(tag) +'/media/recent?client_id='+ ACCESS_TOKEN;
	
	$.ajax({
		url: url,
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



