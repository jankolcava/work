$(document).ready(function()
{
	var links = [
		"design/images/background.jpg",
		"design/images/daperhair.png",
		"design/images/klaga.png",
		"design/images/stipala.png",
		"design/images/society.png",
		"design/images/universum.png",
		"design/images/design_1_screenshot.png"
	];

	var header = $('#header');
	var home_page = $('#home-page');
	var krul_page = $('#krul-page');
	var kolcava_page = $('#kolcava-page');
	var konecny_page = $('#konecny-page');

	var currentPage = home_page;

	setPageSize();


	if(screen.width > 768)
	{
		var all = $('body *'), i;
		all.css({'opacity': '0'});
	
		for (i = 0; i < all.length; i++)
		{
			(function(index)
			{
        		window.setTimeout(function()
        		{ 
        			$(all[index]).animate({'opacity': '1'}, 400);
        		}, index * 30);
    		})(i);
		}
	}

	//Personal pages
	/////////////////////////////////////////
	
	$('#krul-circle').on('click', function(){
		movePageLeft(home_page, krul_page);
	});

	$('#kolcava-circle').on('click', function(){
		movePageLeft(home_page, kolcava_page);
	});

	$('#konecny-circle').on('click', function(){
		movePageLeft(home_page, konecny_page);
	});

	$('.back-button').on('click', function(){
		movePageRight(home_page, currentPage);
	});

	//Header slider
	/////////////////////////////////////////
		
	header.animate({opacity: '0'}, 500, function(){
        $(this).css({'background-image': 'url("http://3kwebdesign.com/' + links[getRandom(0, links.length - 1)] + '")' }).animate({opacity: '1'}, 500);
    });
	
	var mixedLinks = links.slice(1, links.length);
	mixedLinks.mix();
	mixedLinks.unshift(links[0]);

	var link;
	var linkIndex = 1;

	window.setInterval(function()
	{
		if(linkIndex === mixedLinks.length)
    	{
    		linkIndex = 0;
    	}

		link = 'url("http://3kwebdesign.com/' + mixedLinks[linkIndex] + '")';
		
		header.animate({opacity: '0'}, 500, function()
		{
        	$(this).css({'background-image': link}).animate({opacity: '1'}, 500);
    	});

    	linkIndex++;
	}, 15000);


	$(window).on('resize', setPageSize);

	function setPageSize()
	{
		if(home_page.css('display') === 'block')
		{
			krul_page.css('left', home_page.width() + 'px');
			kolcava_page.css('left', home_page.width() + 'px');
			konecny_page.css('left', home_page.width() + 'px');
		}
		else
		{
			home_page.css('left', -home_page.width() + 'px');
		}
	}

	function movePageLeft(page1, page2)
	{
		page2.css('display', 'block');

		function step()
		{
			var page1Pos = Math.max(page1.position().left - 26, -window.innerWidth);
			var page2Pos = Math.max(page2.position().left - 26, 0);

			page1.css('left', page1Pos + 'px');
			page2.css('left', page2Pos + 'px');

			if(page1Pos === -window.innerWidth)
			{
				window.cancelAnimationFrame(timer);
				page1.css('display', 'none');

				currentPage = page2;
			}
			else
			{
				window.requestAnimationFrame(step);
			}
		}

		var timer = window.requestAnimationFrame(step);
	}

	function movePageRight(page1, page2)
	{
		page1.css('display', 'block');

		function step()
		{
			var page1Pos = Math.min(page1.position().left + 26, 0);
			var page2Pos = Math.min(page2.position().left + 26, window.innerWidth);

			page1.css('left', page1Pos + 'px');
			page2.css('left', page2Pos + 'px');

			if(page2Pos === window.innerWidth)
			{
				window.cancelAnimationFrame(timer);
				page2.css('display', 'none');

				currentPage = page1;
			}
			else
			{
				window.requestAnimationFrame(step);
			}
		}

		var timer = window.requestAnimationFrame(step);
	}
});

function getRandom(min, max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}

Array.prototype.mix = function()
{
	var helpArray = this.slice();

	for(var i = 0; i < this.length; i++)
	{
		var index = getRandom(0, helpArray.length - 1);
		this[i] = helpArray[index];

		helpArray.splice(index, 1);
	}
}