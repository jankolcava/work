var cfg = {
	transitionEnd: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
	transition: 'transition WebkitTransition msTransition MozTransition OTransition'
};

$(document).ready(function()
{
	Web.init();
	Web.Menu.init();
	Web.Contact.init();
});

Web = {
	init: function()
	{
		var self = this;
		this.page = $('#page');
		this.header = $('#page #header');
		this.mainWrap = $('#page #mainContent .mainWrap');
		this.sub_header_content = $('#page #sub_header .wrapper .content');

		this.normalisePage();
		this.sub_header_content.css({'margin-top': this.header.outerHeight() + 'px'});

		$(window).on('resize', function()
		{
			//if slick menu is on and the page is resized - larger -> toggle
			if($(this).width() > 768 && self.page.hasClass('slick-menu-on'))
			{
				self.page.toggleClass('slick-menu-off slick-menu-on');
			}

			self.normalisePage();
		});

		document.addEventListener('scroll', function(e)
		{
			//toggle page class - transition height of the header
			if((window.pageYOffset > self.header.height() && self.page.hasClass('over-header-off')) ||
			   (window.pageYOffset < self.header.height() && self.page.hasClass('over-header-on' )))
			{
				self.page.toggleClass('over-header-off over-header-on');
			}
		});
	},

	normalisePage: function()
	{
		this.mainWrap.width('80%');
		this.mainWrap.width(Math.floor(this.mainWrap.width()));
	}
};

Web.Menu = {
	init: function()
	{
		var self = this;
		this.page = $('#page');
		this.header = $('#page #header');
		this.slick_menu_btn = $('#page #header .menu .slick-nav #slick-menu-btn');
		this.slick_menu_list = $('#page #slick-menu .menu');
		this.logo_img = $('#page #header .logo a img');

		//open slick-menu and set margin top
		this.slick_menu_btn.on('click', function()
		{
			self.page.toggleClass('slick-menu-off slick-menu-on');
			self.setSlickMenuPos();
		});

		//change margin-top of slick menu list after the transition
		this.logo_img.on(cfg.transitionEnd, function()
		{
			if(self.page.hasClass('slick-menu-on'))
			{
				self.setSlickMenuPos();
			}
		});
	},

	setSlickMenuPos: function()
	{
		this.slick_menu_list.css({'margin-top': this.header.outerHeight() + 'px'});
	}
};

Web.Contact = {
	init: function()
	{
		var self = this;
		this.contact_form = $('#page #mainContent #kontakt-form');
		this.f_name = $('#page #mainContent #kontakt-form #f_name');
		this.f_email = $('#page #mainContent #kontakt-form #f_email');
		this.f_telefon = $('#page #mainContent #kontakt-form #f_telefon');
		this.f_service = $('#page #mainContent #kontakt-form #f_service');
		this.f_message = $('#page #mainContent #kontakt-form #f_message');

		this.contact_form.submit(function(e)
		{
			e.preventDefault();
			self.validate();
		});
	},

	validate: function()
	{
		var formData = this.contact_form.serialize();

		$.ajax({
			url: './scripts/submitContact.php',
			type: 'POST',
			data: formData,

			success: function(data)
			{
				data = $.parseJSON(data);
				Web.Contact.sendSuccess(data);
			},

			error: function()
			{
				swal('Chyba!', 'Data se nepodařilo odeslat na server', 'error');
			}
		});
	},

	sendSuccess: function(data)
	{
		if(data['text'])
		{
			if(data['send'])
			{
				this.f_name.val('');
				this.f_email.val('');
				this.f_telefon.val('');
				this.f_message.val('');
				this.f_service.find('option:not(:first-child)[selected=selected]').removeAttr('selected');
				this.f_service.find('option:first-child').attr('selected', 'selected');
				
				swal(data['text'], 'Brzy vám odpovíme', 'success');
			}
			else
			{
				swal('Chyba!', data['text'], 'error');
			}
		}
	}
};