$(document).ready(function()
{
	Web.init();
	Web.Menu.init();
	Web.Contact.init();
	Input.init();
});

var cfg = {
	transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
};

Web = {
	init: function()
	{
		this.page = $('#page');
		this.parts = $('#page .part');
	},

	getTransitionProperty: function(element) 
	{
	  // Note that in some versions of IE9 it is critical that
	  // msTransform appear in this list before MozTransform
	  var properties = [
	    'transition',
	    'WebkitTransition',
	    'msTransition',
	    'MozTransition',
	    'OTransition'
	  ];
	  var p;
	  while (p = properties.shift()) {
	    if (typeof element.style[p] != 'undefined') {
	      return p;
	    }
	  }
	  return false;
	}
};

Web.Menu = {
	init: function()
	{
		var self = this;
		this.header = $('#header');
		this.primary_nav_items = $('#header .right .primary-nav a');
		this.slick_btn = $('#header .right .slick-nav .slick-btn');
		this.slick_menu = $('#slick-menu');
		this.slick_menu_items = $('#slick-menu .content .menu a');

		this.toggleHeader();
		self.toggleNavItemWhenScrolled();

		$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length)
			{
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 500);
				return false;
			}
		}
		});

		this.primary_nav_items.on('click', function()
		{
			self.toggleNavItem($(this));
		});

		this.slick_menu_items.on('click', function()
		{
			self.toggleNavItem($(this));
		});

		this.slick_btn.on('click', function()
		{
			self.toggleSlickMenu();
		});

		this.slick_menu_items.on('click', function()
		{
			self.toggleSlickMenu();
		});

		document.addEventListener('scroll', function()
		{
			self.toggleHeader();
			self.toggleNavItemWhenScrolled();
		});

		//If window was resized and slick menu is still on -> toggle
		window.addEventListener('resize', function()
		{
			if(this.innerWidth > 850 && Web.page.hasClass('slick_menu_on'))
			{
				self.toggleSlickMenu();
			}
		});
	},

	toggleHeader: function()
	{
		if((window.pageYOffset > this.header.height() && this.header.hasClass('scrolled_off')) ||
			   (window.pageYOffset < this.header.height() && this.header.hasClass('scrolled_on')))
		{
			this.header.toggleClass('scrolled_off scrolled_on');
		}
	},

	toggleNavItemWhenScrolled: function()
	{
		for(var i = 0; i < Web.parts.length; i++)
		{
			var partPos = $(Web.parts[i]).offset().top;

			var winPos = window.pageYOffset + this.header.outerHeight();

			if(partPos < winPos)
			{
				this.toggleNavItem($(this.primary_nav_items[i]));
			}

			/*
			var part = $(Web.parts[i]);

			var part_check = Math.floor((window.pageYOffset + this.header.outerHeight()) /
										(part.offset().top + part.outerHeight()));
			
			if(part_check === 0)
			{
				this.toggleNavItem($(this.primary_nav_items[i]));
				return;
			}*/
		}

	},

	toggleNavItem: function(item)
	{
		if(item.hasClass('active')) return;

		var itemIndex = this.primary_nav_items.index(item);
		if(itemIndex === -1) itemIndex = this.slick_menu_items.index(item);

		for(var i = 0; i < this.primary_nav_items.length; i++)
		{
			if(i === itemIndex) continue;

			var item2 = $(this.primary_nav_items[i]);
			if(item2.hasClass('active'))
			{
				item2.toggleClass('active');
				$(this.slick_menu_items[i]).toggleClass('active');
				break;
			}
		}

		$(this.primary_nav_items[itemIndex]).toggleClass('active');
		$(this.slick_menu_items[itemIndex]).toggleClass('active');
	},

	toggleSlickMenu: function()
	{
		Web.page.toggleClass('slick_menu_off slick_menu_on');
		this.animateSlickBtn();
	},

	animateSlickBtn: function()
	{
		var _this = this.slick_btn;
		
		_this.addClass('scale');
		var duration = parseFloat(_this.css(Web.getTransitionProperty(_this[0]) + '-duration')) * 1000;
		window.setTimeout(function()
		{
			_this.children().first().toggleClass('fa-bars fa-times');
			_this.removeClass('scale');
		}, duration);
	}
};

Web.Contact = {
	init: function()
	{
		var sendMail = $('#sendMail'), mailSubject = $('#mailSubject'), mailSenderMail = $('#mailSenderMail'), mailSender = $('#mailSender'), mailText = $('#mailText');
	
		sendMail.click(function(){
			$.post('system/sendMail.php', {'mailSender': mailSender.val(), 'mailSenderMail': mailSenderMail.val(), 'mailSubject': mailSubject.val(), 'message': mailText.val()}, function(response){
			if (response == 'ok') {
				sweetAlert("Žůžo", "Za chvíli se Vám ozveme, mějte příjemný zbytek dne!", "success");
			} else {
				console.log(response);
			}
			});
		});
	}
};

var Input = {
	init: function()
	{
		if(!this.isTouchDevice()) return;

		var cfg = { inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput };

		delete Hammer.defaults.cssProps.userSelect;

		this.hammer = new Hammer.Manager(document.body, cfg);

		this.hammer.add(new Hammer.Pan({direction: Hammer.DIRECTION_HORIZONTAL, threshold: 80}));

		this.hammer.on('panleft', function(e)
		{
			if(Web.page.hasClass('slick_menu_off'))
            {
            	Web.Menu.toggleSlickMenu();
            }
		});

		this.hammer.on('panright', function(e)
		{
			if(Web.page.hasClass('slick_menu_on'))
            {
            	Web.Menu.toggleSlickMenu();
            }
		});
	},

	isTouchDevice: function()
	{
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	}
};