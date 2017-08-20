var cfg = {
	transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend'
};

$(document).ready(function()
{
	var page = $('#page');
	var header = $('#header');
	var slick_menu_btn = $('#slick-menu-btn');
	var logo = $('#page #header .logo a img');
	var slick_menu_list = $('#page #slick-menu .menu');
	var sub_header_content = $('#page #sub_header .wrapper .content');

	normalisePage();

	slick_menu_btn.on('click', function()
	{
		//open slick-menu and set margin top
		page.toggleClass('slick-menu-off slick-menu-on');
		slick_menu_list.css({'margin-top': header.outerHeight() + 'px'});
	});

	$(window).on('resize', function()
	{
		//if slick menu is on and the page is resized - larger -> toggle
		if($(this).width() > 768 && page.hasClass('slick-menu-on'))
		{
			page.toggleClass('slick-menu-off slick-menu-on');
		}

		normalisePage();
	});

	document.addEventListener('scroll', function(e)
	{
		if((window.pageYOffset > header.height() && page.hasClass('over-header-off')) ||
		   (window.pageYOffset < header.height() && page.hasClass('over-header-on' )))
		{
			//toggle class - transition height
			page.toggleClass('over-header-off over-header-on');
		}
	});

	//change margin-top of slick menu list after the transition
	logo.on(cfg.transitionEnd, function()
	{
		if(page.hasClass('slick-menu-on'))
		{
			slick_menu_list.css({'margin-top': header.outerHeight() + 'px'});
		}
	});

	sub_header_content.css({'margin-top': header.outerHeight() + 'px'});

	/*var all = $('body *'), i;
	all.css({'opacity': '0'});
	
	for(i = 0; i < all.length; i++)
	{
		(function(index)
		{
			window.setTimeout(function()
			{
				$(all[index]).animate({'opacity': '1'}, 400);
			}, index * 30);
		})(i);
	}*/
});

function normalisePage()
{
	var item = $('.mainWrap');
	item.width('80%');
	item.width(Math.floor(item.width()));
}