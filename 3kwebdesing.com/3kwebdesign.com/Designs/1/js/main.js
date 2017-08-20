$(document).ready(function(){
	var body = $('body');

	var screenParams = {
		'x': body.width(),
		'y': body.height()
	};

	var percent = 0;

	body.mousemove(function(event){

		if(event.pageX > 0 && event.pageX < screenParams.x){
			percent = 100 * event.pageX / screenParams.x;

			body.animate({'background-position-x': percent + '%'}, 4);
		}

	});

	var logo = $('#wrapper #header .inner .logo');

});