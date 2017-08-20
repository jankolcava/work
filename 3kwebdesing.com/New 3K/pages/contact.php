<?php
$selected = isset($_GET['service']) ? $_GET['service'] : 0;

?>
<hr class="mainBorder" />
<h1 class="mainTitle">Kontaktujte nás!</h1>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc luctus dui diam, et faucibus tellus accumsan a. Aenean at odio lectus. Integer tortor dui, iaculis eget efficitur sed, egestas nec odio.
</p>

<div id="contact-icons">
	<div class="icon-wrapper">
		<div class="icon email">
			<div class="fa fa-envelope"></div>
		</div>
		<h2>my@3kwebdesign.com</h2>
	</div>

	<div class="icon-wrapper">
		<div class="icon phone">
			<div class="fa fa-phone"></div>
		</div>
		<h2>+420 001 999 911</h2>
	</div>
</div>

<form id="kontakt-form" method="POST" action="./scripts/submitContact.php">
	<div class="col-flex">
	<div class="col">
		<div class="row">
			<label for="f_name">Jméno</label>
			<input id="f_name" type="text" name="name" value="" />
		</div>

		<div class="row">
			<label for="f_email">E-mail</label>
			<input id="f_email" type="email" name="email" value="" />
		</div>

		<div class="row">
			<label for="telefon">Telefon</label>
			<input id="f_telefon" type="text" name="telefon" value="" />
		</div>
	</div>

	<div class="col">
		<div class="row">
			<label for="f_service">Služba</label>

			<select id="f_service" name="service">
				<option value="0" <?php if($selected == 0) echo('selected'); ?>>
					Kontakt
				</option>

				<option value="1" <?php if($selected == 1) echo('selected'); ?>>
					Statický web
				</option>

				<option value="2" <?php if($selected == 2) echo('selected'); ?>>
					Dynamický web
				</option>

				<option value="3" <?php if($selected == 3) echo('selected'); ?>>
					E-Shop
				</option>
			</select>
		</div>

		<div class="row msg">
			<textarea id="f_message" name="message" placeholder="Vaše zpráva"></textarea>
		</div>
	</div>
	</div>

	<input id="f_send" type="submit" value="Odeslat" class="contactButton" />
</form>
<hr class="mainBorder" />