$(document).ready(function()
{
	setPageSize();

	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 500);
				return false;
			}
		}
	});

	$('.flexslider').flexslider({
    animation: "slide"
  	});

	$('#carousel').elastislide();

	$('.gallery .gallery-category a').on('click', function()
	{
		loadImages($(this).parent().parent().attr('data-category'));
		setGallerySize();
	});

	$('#galleryBack > a').on('click', function()
	{
		deleteImages();

		$('#gallery-content').css('display', 'none');
		$('#gallery-menu').css('display', 'block');
		setGallerySize();
	});

	$(window).resize(setPageSize);
});

var categories = {
	"dvere": {
		"title": "Dveře",
		"text": "",
		"imgCnt": 13
	},
	"kuchyne": {
		"title": "Kuchyně",
		"text": "Návrh, výroba a montáž kuchyňské linky v podkroví",
		"imgCnt": 7
	},
	"lavice": {
		"title": "Lavice",
		"text": "Lavice na zakázku vyrobena z lamina",
		"imgCnt": 4
	},
	"modrinove_vrata_a_dvere": {
		"title": "Modřínové vrata a dveře",
		"text": "",
		"imgCnt": 13
	},
	"nabytek_na_miru": {
		"title": "Nábytek na míru",
		"text": "Kompletní ložnice + pár kousků do obývacího pokoje",
		"imgCnt": 14
	},
	"obyvaci_pokoj_na_miru": {
		"title": "Obývací pokoj na míru",
		"text": "",
		"imgCnt": 5
	},
	"olsova_masivni_skrin": {
		"title": "Olšová masivní skříň",
		"text": "",
		"imgCnt": 2
	},
	"renovace_dveri": {
		"title": "Renovace dveří",
		"text": "",
		"imgCnt": 9
	},
	"restaurovani_kresla": {
		"title": "Restaurování křesla",
		"text": "",
		"imgCnt": 8
	},
	"restaurovani_skrine": {
		"title": "Restaurování skříně",
		"text": "Skříň, která byla zralá do kamen, se mi podařilo zachránit a výsledek výpadá velice zdařile. Však posuďte sami ;-)",
		"imgCnt": 8
	},
	"restaurovani_stolku": {
		"title": "Restaurování stolku",
		"text": "Oprava konferenční stolku",
		"imgCnt": 4
	},
	"restaurovani_stolu": {
		"title": "Restaurování stolu",
		"text": "Další ukázka renovace nábytku, tentokrát jde o dubový stůl v selském duchu",
		"imgCnt": 7
	},
	"smrkove_dvere": {
		"title": "Smrkové dveře",
		"text": "",
		"imgCnt": 13
	},
	"spaci_patro": {
		"title": "Spací patro",
		"text": "Výroba spacího patro se schodištěm a zábradlím. Vše vyrobeno z masivu - Modřín. Povrchová úprava tenkovrstvou lazurou",
		"imgCnt": 7
	},
	"vstupni_dvere": {
		"title": "Vstupní dveře",
		"text": "Vyrobil jsem a osadil nové dvoukřídlé dveře. Smrkové dveře jsou opatřeny bezpečnostím kováním a elektrickým zámkem",
		"imgCnt": 8
	},
	"zastena": {
		"title": "Zástěna",
		"text": "Na zakázku vyrobena a namontována zástěna technické místnosti",
		"imgCnt": 8
	},
};

function setPageSize()
{
	setWrapperSize();
	setGallerySize();
}

function setGallerySize()
{
	 $('.clanek .gallery').each(function() {

	 	var articleWidth = $(this).parent().width();

		var itemWidth = $(this).find('li').outerWidth(true);

		var itemCount = Math.floor(articleWidth / itemWidth);

		$(this).width(itemCount * itemWidth);
	 });
}

function setWrapperSize()
{
	var wrapper = $('.wrapper');

	if (!Modernizr.mq('(max-width: 700px)')) 
	{
		wrapper.width('80%');
		wrapper.width(Math.floor(wrapper.width()));
    }
    else
    {
    	wrapper.width('100%');
    }
}

function loadImages(path)
{
	$('#gallery-menu').css('display', 'none');
	$('#gallery-content').css('display', 'block');

	var folder = categories[path];
	$('.galleryHeader .galCatTitle').text(folder.title);
	$('.galleryHeader .galCatText').text(folder.text);

	for(var i = 0; i < folder.imgCnt; i++)
	{
		var name = path + (i + 1) + '.jpg';

		var s = '<li><div class="in-image">';
		s+= '<a href="images/' + path + '/large/' + name + '" data-title="'+ folder.title +'" data-lightbox="image-1">';
		s+= '<img src="images/' + path + '/small/' + name + '" />';
		s+= '</a></div></li>';

		$('#gallery-content ul').append(s);
	}
}

function deleteImages()
{
	$('#gallery-content li').remove();
}